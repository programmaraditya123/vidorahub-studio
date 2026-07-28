import assert from "node:assert/strict";
import test from "node:test";

const objectId = "69974bc1f19a0c7fe0a42de0";

function slugify(input) {
  const value = String(input || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return value || "profile";
}

function extractObjectId(slugOrId) {
  const value = String(slugOrId || "").trim();
  if (/^[a-f\d]{24}$/i.test(value)) return value;
  return value.match(/([a-f\d]{24})$/i)?.[1] || null;
}

test("slugifies names for SEO URLs", () => {
  assert.equal(slugify("Aditya Saini!!!"), "aditya-saini");
  assert.equal(slugify("Food & Travel Creator"), "food-and-travel-creator");
  assert.equal(slugify(""), "profile");
});

test("extracts ObjectId from canonical and legacy URLs", () => {
  assert.equal(extractObjectId(objectId), objectId);
  assert.equal(extractObjectId(`aditya-saini-${objectId}`), objectId);
  assert.equal(extractObjectId("not-a-profile"), null);
});
