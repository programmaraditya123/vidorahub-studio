"use client";

import ProductFormModal from "../ProductFormModal/ProductFormModal";

type AddProductModalProps = {
  close: () => void;
};

export default function AddProductModal({ close }: AddProductModalProps) {
  return <ProductFormModal mode="create" close={close} />;
}
