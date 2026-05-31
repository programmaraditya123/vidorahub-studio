"use client";

import type { ApiProduct } from "@/lib/products";
import ProductFormModal from "../ProductFormModal/ProductFormModal";

type EditProductModalProps = {
  product: ApiProduct;
  close: () => void;
};

export default function EditProductModal({
  product,
  close,
}: EditProductModalProps) {
  return (
    <ProductFormModal mode="edit" product={product} close={close} />
  );
}
