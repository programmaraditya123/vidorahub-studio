"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  X,
  Upload,
  ImagePlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductCategoriesQuery,
  useGetProductSubcategoriesQuery,
} from "@/store/api/creatorApi";
import { productTaxonomyId, uploadProductImage, type ApiProduct } from "@/lib/products";
import {
  PRODUCT_CURRENCIES,
  MAX_PRODUCT_IMAGES,
  MAX_PRODUCT_DESCRIPTION,
  imagesFromUrls,
  type ProductFieldErrors,
  type ProductImageItem,
} from "../productFormConstants";
import styles from "../AddProductModal/AddProductModal.module.scss";
import TaxonomyDropdown from "./TaxonomyDropdown";

type ProductFormModalProps = {
  mode: "create" | "edit";
  product?: ApiProduct;
  close: () => void;
};

function initFormState(product?: ApiProduct) {
  const hasStock =
    product?.stock !== undefined && product?.stock !== null;

  return {
    name: product?.name ?? "",
    description: product?.description ?? "",
    category: productTaxonomyId(product?.category),
    subcategory: productTaxonomyId(product?.subcategory),
    brand: product?.brand ?? "",
    price: product?.price != null ? String(product.price) : "",
    currency: product?.currency ?? "USD",
    stock: hasStock ? String(product!.stock) : "",
    unlimitedStock: !hasStock,
    images: product?.images?.length
      ? imagesFromUrls(product.images)
      : ([] as ProductImageItem[]),
  };
}

export default function ProductFormModal({
  mode,
  product,
  close,
}: ProductFormModalProps) {
  const isEdit = mode === "edit";
  const initial = initFormState(product);

  const [name, setName] = useState(initial.name);
  const [description, setDescription] = useState(initial.description);
  const [category, setCategory] = useState(initial.category);
  const [subcategory, setSubcategory] = useState(initial.subcategory);
  const [brand, setBrand] = useState(initial.brand);
  const [price, setPrice] = useState(initial.price);
  const [currency, setCurrency] = useState(initial.currency);
  const [stock, setStock] = useState(initial.stock);
  const [unlimitedStock, setUnlimitedStock] = useState(initial.unlimitedStock);
  const [images, setImages] = useState<ProductImageItem[]>(initial.images);
  const [dragActive, setDragActive] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ProductFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoriesQuery = useGetProductCategoriesQuery();
  const subcategoriesQuery = useGetProductSubcategoriesQuery(category, { skip: !category });
  const categories = categoriesQuery.currentData?.data ?? [];
  // currentData prevents options from a previously selected category being shown.
  const subcategories = subcategoriesQuery.currentData?.data ?? [];
  const taxonomyLoading = categoriesQuery.isFetching || (!!category && subcategoriesQuery.isFetching);
  const taxonomyFailed = categoriesQuery.isError || (!!category && subcategoriesQuery.isError);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const isSaving = isAdding || isUpdating;
  const isBusy = isSubmitting || isSaving || images.some((img) => img.uploading);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isBusy) close();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, isBusy]);

  const imagesRef = useRef(images);
  imagesRef.current = images;

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => {
        if (img.file) URL.revokeObjectURL(img.preview);
      });
    };
  }, []);

  const addFiles = useCallback((files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) return;

    setFieldErrors((prev) => ({ ...prev, images: undefined }));
    setFormError("");

    setImages((prev) => {
      const remaining = MAX_PRODUCT_IMAGES - prev.length;
      const toAdd = list.slice(0, remaining).map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
      }));

      return [...prev, ...toAdd];
    });
  }, []);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.file) URL.revokeObjectURL(target.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const uploadAllImages = async (): Promise<string[]> => {
    const urls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const item = images[i];
      if (item.url) {
        urls.push(item.url);
        continue;
      }

      if (!item.file) continue;

      setImages((prev) =>
        prev.map((img) =>
          img.id === item.id
            ? { ...img, uploading: true, error: undefined }
            : img,
        ),
      );

      try {
        const url = await uploadProductImage(item.file);
        urls.push(url);
        setImages((prev) =>
          prev.map((img) =>
            img.id === item.id ? { ...img, url, uploading: false } : img,
          ),
        );
      } catch {
        setImages((prev) =>
          prev.map((img) =>
            img.id === item.id
              ? { ...img, uploading: false, error: "Upload failed" }
              : img,
          ),
        );
        throw new Error(
          `Failed to upload image ${i + 1}. Check your connection and try again.`,
        );
      }
    }

    return urls;
  };

  const validate = (): boolean => {
    const errors: ProductFieldErrors = {};

    if (!name.trim()) errors.name = "Product name is required";

    const priceNum = Number(price);
    if (!price.trim() || !Number.isFinite(priceNum) || priceNum < 0) {
      errors.price = "Enter a valid non-negative price";
    }

    if (!categories.some((item) => item._id === category)) errors.category = "Select an active category";
    if (!subcategories.some((item) => item._id === subcategory)) errors.subcategory = "Select a subcategory for this category";
    if (!unlimitedStock && (!stock.trim() || !Number.isSafeInteger(Number(stock)) || Number(stock) < 0)) {
      errors.stock = "Enter a non-negative whole number";
    }

    if (!currency) errors.currency = "Currency is required";
    if (images.length === 0) errors.images = "Add at least one product image";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildPayload = (imageUrls: string[]) => {
    const priceNum = Number(price);
    const stockNum =
      !unlimitedStock && stock.trim() !== ""
        ? Number(stock)
        : null;

    return {
      name: name.trim(),
      description: description.trim(),
      category,
      subcategory,
      price: priceNum,
      stock: stockNum,
      images: imageUrls,
      brand: brand.trim(),
      currency,
    };
  };

  const handleSubmit = async () => {
    if (isBusy || taxonomyLoading || taxonomyFailed) return;
    setFormError("");
    setSuccessMessage("");

    if (!validate()) return;

    if (isEdit && !product?._id) {
      setFormError("Product not found");
      return;
    }

    setIsSubmitting(true);
    try {
      const imageUrls = await uploadAllImages();

      if (imageUrls.length === 0) {
        setFieldErrors({ images: "At least one image is required" });
        return;
      }

      const payload = buildPayload(imageUrls);

      if (isEdit) {
        await updateProduct({ productId: product!._id, body: payload }).unwrap();
        setSuccessMessage("Product updated successfully");
      } else {
        await addProduct(payload).unwrap();
        setSuccessMessage("Product created successfully");
      }

      setTimeout(() => close(), 600);
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message ||
        `Failed to ${isEdit ? "update" : "create"} product. Please try again.`;
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleId = isEdit ? "edit-product-title" : "add-product-title";

  return (
    <div
      className={styles.overlay}
      onClick={() => !isBusy && close()}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h3 id={titleId}>{isEdit ? "Edit product" : "Add product"}</h3>
            <p>
              {isEdit
                ? "Update listing details, images, and pricing."
                : "List a digital product, template, or service in your store."}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className={styles.close}
            aria-label="Close"
            disabled={isBusy}
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          <fieldset className={styles.form} disabled={isBusy || !!successMessage} style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
            <div
              className={`${styles.field} ${fieldErrors.images ? styles.fieldError : ""}`}
            >
              <label>Product images *</label>
              <div
                className={`${styles.dropzone} ${dragActive ? styles.dragActive : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (images.length < MAX_PRODUCT_IMAGES) {
                    addFiles(e.dataTransfer.files);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload product images"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
                <div className={styles.dropIcon}>
                  <Upload size={20} />
                </div>
                <p className={styles.dropTitle}>
                  Drag images here or click to browse
                </p>
                <p className={styles.dropSub}>
                  PNG, JPG, WebP · up to {MAX_PRODUCT_IMAGES} images
                </p>
              </div>

              {fieldErrors.images && (
                <span className={styles.hint} style={{ color: "#dc2626" }}>
                  {fieldErrors.images}
                </span>
              )}

              {images.length > 0 && (
                <div className={styles.imageGrid}>
                  {images.map((img) => (
                    <div key={img.id} className={styles.imageThumb}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.preview} alt="" />
                      {img.uploading && (
                        <span className={styles.uploadingBadge}>Uploading…</span>
                      )}
                      {img.error && (
                        <span className={styles.uploadingBadge}>{img.error}</span>
                      )}
                      <button
                        type="button"
                        className={styles.removeImage}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(img.id);
                        }}
                        aria-label="Remove image"
                        disabled={img.uploading}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {images.length < MAX_PRODUCT_IMAGES && (
                    <button
                      type="button"
                      className={styles.imageThumb}
                      style={{
                        border: "2px dashed #d8b4fe",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7c3aed",
                        background: "#faf5ff",
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Add more images"
                    >
                      <ImagePlus size={22} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div
              className={`${styles.field} ${fieldErrors.name ? styles.fieldError : ""}`}
            >
              <label htmlFor="product-name">Product name *</label>
              <input
                id="product-name"
                value={name}
                placeholder="e.g. Creator preset pack"
                onChange={(e) => {
                  setName(e.target.value);
                  setFieldErrors((p) => ({ ...p, name: undefined }));
                }}
                maxLength={120}
              />
              {fieldErrors.name && (
                <span className={styles.hint} style={{ color: "#dc2626" }}>
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="product-description">Description</label>
              <textarea
                id="product-description"
                value={description}
                placeholder="What buyers get, file formats, license terms…"
                onChange={(e) =>
                  setDescription(
                    e.target.value.slice(0, MAX_PRODUCT_DESCRIPTION),
                  )
                }
                maxLength={MAX_PRODUCT_DESCRIPTION}
              />
              <span className={styles.charCount}>
                {description.length}/{MAX_PRODUCT_DESCRIPTION}
              </span>
            </div>

            <div className={styles.row2}>
              <div className={`${styles.field} ${fieldErrors.category ? styles.fieldError : ""}`}>
                <label htmlFor="product-category">Category *</label>
                <TaxonomyDropdown
                  id="product-category"
                  kind="category"
                  value={category}
                  options={categories}
                  placeholder="Select category"
                  emptyMessage="No active categories available."
                  loading={categoriesQuery.isFetching}
                  disabled={isBusy || !!successMessage || categoriesQuery.isError}
                  invalid={!!fieldErrors.category}
                  onChange={(value) => {
                    setCategory(value);
                    setSubcategory("");
                    setFieldErrors((p) => ({ ...p, category: undefined, subcategory: undefined }));
                  }}
                />
                {fieldErrors.category && <span className={styles.hint} role="alert">{fieldErrors.category}</span>}
                {!categoriesQuery.isFetching && !categoriesQuery.isError && categories.length === 0 && (
                  <span className={styles.hint}>No active categories available.</span>
                )}
              </div>

              <div className={`${styles.field} ${fieldErrors.subcategory ? styles.fieldError : ""}`}>
                <label htmlFor="product-subcategory">Subcategory *</label>
                <TaxonomyDropdown
                  id="product-subcategory"
                  kind="subcategory"
                  value={subcategory}
                  options={subcategories}
                  placeholder={category ? "Select subcategory" : "Choose a category first"}
                  emptyMessage="No active subcategories available."
                  loading={!!category && subcategoriesQuery.isFetching}
                  disabled={isBusy || !!successMessage || !category || subcategoriesQuery.isError}
                  invalid={!!fieldErrors.subcategory}
                  onChange={(value) => {
                    setSubcategory(value);
                    setFieldErrors((p) => ({ ...p, subcategory: undefined }));
                  }}
                />
                {fieldErrors.subcategory && <span className={styles.hint} role="alert">{fieldErrors.subcategory}</span>}
                {category && !subcategoriesQuery.isFetching && !subcategoriesQuery.isError && subcategories.length === 0 && (
                  <span className={styles.hint}>No active subcategories available for this category.</span>
                )}
              </div>
            </div>

            {taxonomyFailed && (
              <div className={`${styles.alert} ${styles.alertError}`} role="alert">
                <span>Could not load categories or subcategories.</span>
                <button type="button" onClick={() => {
                  if (categoriesQuery.isError) void categoriesQuery.refetch();
                  if (category && subcategoriesQuery.isError) void subcategoriesQuery.refetch();
                }}>Try again</button>
              </div>
            )}

            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="product-brand">Brand (optional)</label>
                <input
                  id="product-brand"
                  value={brand}
                  placeholder="Your brand or label"
                  onChange={(e) => setBrand(e.target.value)}
                  maxLength={80}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Price *</label>
              <div className={styles.priceRow}>
                <div className={fieldErrors.price ? styles.fieldError : undefined}>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={price}
                    placeholder="24.00"
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setFieldErrors((p) => ({ ...p, price: undefined }));
                    }}
                    aria-invalid={!!fieldErrors.price}
                  />
                  {fieldErrors.price && (
                    <span className={styles.hint} style={{ color: "#dc2626" }}>
                      {fieldErrors.price}
                    </span>
                  )}
                </div>
                <div
                  className={
                    fieldErrors.currency ? styles.fieldError : undefined
                  }
                >
                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      setFieldErrors((p) => ({ ...p, currency: undefined }));
                    }}
                    aria-label="Currency"
                  >
                    {PRODUCT_CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="product-stock">Stock</label>
              <label className={styles.stockToggle}>
                <input
                  type="checkbox"
                  checked={unlimitedStock}
                  onChange={(e) => setUnlimitedStock(e.target.checked)}
                />
                <span>Unlimited (digital / no inventory limit)</span>
              </label>
              {!unlimitedStock && (
                <input
                  id="product-stock"
                  type="number"
                  min="0"
                  step="1"
                  value={stock}
                  placeholder="Quantity available"
                  aria-invalid={!!fieldErrors.stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              )}
              {fieldErrors.stock && <span className={styles.hint} role="alert">{fieldErrors.stock}</span>}
            </div>

            {formError && (
              <div className={`${styles.alert} ${styles.alertError}`}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>{formError}</span>
              </div>
            )}

            {successMessage && (
              <div className={`${styles.alert} ${styles.alertSuccess}`}>
                <CheckCircle2
                  size={16}
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                <span>{successMessage}</span>
              </div>
            )}
          </fieldset>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerNote}>
            {isEdit
              ? "Changes apply to your live store listing."
              : "Products go live as active right after creation."}
          </span>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={close}
              disabled={isBusy}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.save}
              onClick={handleSubmit}
              disabled={isBusy || taxonomyLoading || taxonomyFailed || !!successMessage}
            >
              {isBusy && <span className={styles.spinner} aria-hidden />}
              {isSaving
                ? isEdit
                  ? "Saving…"
                  : "Creating…"
                : images.some((i) => i.uploading)
                  ? "Uploading images…"
                  : isEdit
                    ? "Save changes"
                    : "Publish product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
