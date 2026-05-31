"use client";

import { useCallback, useMemo, useState } from "react";
import shared from "../profileShared.module.scss";
import styles from "./StoreSection.module.scss";
import {
  Package,
  ShoppingBag,
  Plus,
  RefreshCw,
  Copy,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";
import AddProductModal from "./AddProductModal/AddProductModal";
import EditProductModal from "./EditProductModal/EditProductModal";
import DeleteProductModal from "./DeleteProductModal/DeleteProductModal";
import { mapProductToStoreView, type ApiProduct } from "@/lib/products";
import { buildStorefrontUrl, getCreatorIdFromStorage } from "@/lib/storefront";
import { useGetProductsQuery } from "@/store/api/creatorApi";

function ProductListSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.skeletonCard} aria-hidden>
          <div className={styles.skeletonThumb} />
          <div className={styles.skeletonLines}>
            <div className={styles.skeletonLine} />
            <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
          </div>
        </div>
      ))}
    </>
  );
}

export default function StoreSection() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<ApiProduct | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  const activeApiProducts = useMemo(
    () =>
      (data?.products ?? []).filter(
        (p) => p.status?.toLowerCase() !== "inactive",
      ),
    [data?.products],
  );

  const products = useMemo(
    () => activeApiProducts.map(mapProductToStoreView),
    [activeApiProducts],
  );

  const productMap = useMemo(() => {
    const map = new Map<string, ApiProduct>();
    activeApiProducts.forEach((p) => map.set(p._id, p));
    return map;
  }, [activeApiProducts]);

  const productCount = products.length;

  const creatorId =
    getCreatorIdFromStorage() ?? data?.products?.[0]?.creatorId ?? null;

  const handleCopyLink = useCallback(async () => {
    if (!creatorId) {
      setCopyState("error");
      return;
    }

    const url = buildStorefrontUrl(creatorId);

    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
    }
  }, [creatorId]);

  const copyLabel =
    copyState === "copied"
      ? "Copied!"
      : copyState === "error"
        ? "Copy failed"
        : "Copy link";

  return (
    <div className={shared.section}>
      <header className={shared.header}>
        <div className={styles.headerRow}>
          <div>
            <h1>Store</h1>
            <p>Sell digital products, templates, and services to your audience.</p>
          </div>
          <button
            type="button"
            className={shared.btnPrimary}
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            Add product
          </button>
        </div>
      </header>

      <div className={styles.storeBanner}>
        <ShoppingBag size={28} />
        <div>
          <strong>Storefront preview</strong>
          <p>
            {creatorId
              ? "Share your public store link with followers."
              : "Sign in to copy your store link."}
          </p>
        </div>
        <button
          type="button"
          className={`${shared.btnSecondary} ${copyState === "copied" ? styles.copySuccess : ""} ${copyState === "error" ? styles.copyError : ""}`}
          onClick={handleCopyLink}
          disabled={!creatorId}
          title={
            creatorId
              ? buildStorefrontUrl(creatorId)
              : "Creator ID not available"
          }
        >
          {copyState === "copied" ? (
            <Check size={14} />
          ) : (
            <Copy size={14} />
          )}
          {copyLabel}
        </button>
      </div>

      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>
          Your products
          {!isLoading && productCount > 0 && (
            <span className={styles.count}>({productCount})</span>
          )}
        </h2>
        {!isLoading && (
          <button
            type="button"
            className={styles.refreshBtn}
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Refresh products"
          >
            <RefreshCw size={14} className={isFetching ? styles.spin : undefined} />
          </button>
        )}
      </div>

      <div className={styles.productList}>
        {isLoading ? (
          <ProductListSkeleton />
        ) : isError ? (
          <div className={styles.errorState}>
            <p>
              {(error as { message?: string })?.message ||
                "Could not load your products."}
            </p>
            <button
              type="button"
              className={shared.btnSecondary}
              onClick={() => refetch()}
            >
              Try again
            </button>
          </div>
        ) : products.length === 0 ? (
          <p className={shared.empty}>
            No products yet. Add your first item to open your store.
          </p>
        ) : (
          products.map((product) => {
            const raw = productMap.get(product.id);

            return (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productIcon}>
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.imageUrl}
                      alt=""
                      className={styles.productThumb}
                    />
                  ) : (
                    <Package size={22} />
                  )}
                </div>
                <div className={styles.productInfo}>
                  <strong>{product.name}</strong>
                  {product.category && (
                    <span className={styles.category}>{product.category}</span>
                  )}
                  <span className={styles.price}>{product.priceLabel}</span>
                </div>
                <span
                  className={`${shared.badge} ${
                    product.statusKind === "active"
                      ? shared.badgeSuccess
                      : product.statusKind === "draft"
                        ? shared.badgeWarning
                        : shared.badgePending
                  }`}
                >
                  {product.statusLabel}
                </span>
                <span className={styles.sales}>
                  {product.sales} {product.sales === 1 ? "sale" : "sales"}
                </span>
                <div className={styles.productActions}>
                  <button
                    type="button"
                    className={shared.btnSecondary}
                    onClick={() => raw && setEditingProduct(raw)}
                    disabled={!raw}
                    aria-label={`Edit ${product.name}`}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() => raw && setDeletingProduct(raw)}
                    disabled={!raw}
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showAddModal && (
        <AddProductModal close={() => setShowAddModal(false)} />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          close={() => setEditingProduct(null)}
        />
      )}

      {deletingProduct && (
        <DeleteProductModal
          productId={deletingProduct._id}
          productName={deletingProduct.name}
          close={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
}
