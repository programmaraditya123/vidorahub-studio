# Store API integration

The `/profile/store` screen uses `src/lib/stores.ts` and the authenticated
`http3` client. It calls:

| Method | Path | Use |
| --- | --- | --- |
| GET | `/api/store/status` | Choose Create store or Update store |
| GET | `/api/store/store_details` | Load the update form |
| POST | `/api/store/create` | Create a store |
| POST | `/api/store/update` | Save store settings |

POST requests use the supplied `CreateStoreRequest` shape, including the
spelling `subCatgories`. The details response uses MongoDB's `subCategory`;
the client maps it back to the request spelling. New stores start with zero
ratings/reviews, and updates preserve the loaded values. The UI does not let
store owners edit these counters.

## Backend fixes required

The supplied Python source is not present in this repository. Apply these
fixes in the FastAPI service before end-to-end use:

1. Remove `body: CreateStoreRequest` from **both GET endpoints**. Browsers
   cannot reliably send a body with GET. The current signatures return 422
   for the client's normal GET requests; adding query parameters cannot
   satisfy a required Pydantic request body.
2. Supply an owner-only filter and a separate `{"$set": ...}` update to
   `find_one_and_update`. The supplied implementation uses the edited values
   in the filter and omits the required update argument.
3. Serialize `_id` and `ownerId` to strings before returning store details.
   Returning the raw MongoDB document can fail JSON serialization.
4. Report a missing store truthfully. The supplied update endpoint returns
   `success: True, message: "store already created"` when no store exists.
   The frontend treats that result as a failed update.

Keep your existing request model, router, imports, and auth dependency, and
replace the GET and update handlers with:

```python
from fastapi import HTTPException


@router.get("/status")
async def store_status(user: Annotated[dict, Depends(require_sign_in)]):
    store = await stores_collections.find_one(
        {"ownerId": ObjectId(user["_id"])}, {"_id": 1}
    )
    return {
        "success": store is not None,
        "exists": store is not None,
        "message": "store already created" if store else "No store found",
    }


@router.get("/store_details")
async def get_store_details(user: Annotated[dict, Depends(require_sign_in)]):
    store = await stores_collections.find_one(
        {"ownerId": ObjectId(user["_id"])}
    )
    if store is None:
        return {"success": False, "message": "No store found"}
    store["_id"] = str(store["_id"])
    store["ownerId"] = str(store["ownerId"])
    return {
        "success": True,
        "message": "Store details fetched successfully",
        "store": store,
    }


@router.post("/update")
async def update_store(
    body: CreateStoreRequest,
    user: Annotated[dict, Depends(require_sign_in)],
):
    values = body.model_dump()  # Pydantic v2; use body.dict() on v1.
    values["subCategory"] = values.pop("subCatgories")
    # Reviews and ratings are server-owned, even though the legacy model
    # requires the client to include them in the request.
    values.pop("rating")
    values.pop("review_count")
    result = await stores_collections.update_one(
        {"ownerId": ObjectId(user["_id"])},
        {"$set": values},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="No store found")
    return {"success": True, "message": "Store updated successfully"}
```

Creation should enforce one store per owner with a unique `ownerId` index
and handle duplicate-key errors; checking first alone does not prevent two
concurrent creates. The frontend handles the provided `store already created`
response by loading the existing store instead of claiming a new one was saved.

The client never interprets an authentication failure, validation error,
timeout, or malformed response as permission to create a new store. It shows
an error and retry control. Mutation failures retain entered form values and
never automatically retry a POST.
