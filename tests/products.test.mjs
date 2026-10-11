import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/lib/products.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const loadedModule = { exports: {} };
vm.runInNewContext(source, {
  module: loadedModule, exports: loadedModule.exports,
  require: () => ({}),
});
const { productTaxonomyId, mapProductToStoreView } = loadedModule.exports;
const product = {
  _id: "product-id", creatorId: "creator-id", name: "Template", price: 0,
  currency: "USD", images: ["https://example.com/product.png"], status: "active",
};

test("populated taxonomy renders names while edit selections use IDs", () => {
  const category = { _id: "category-id", name: "Design" };
  const subcategory = { _id: "subcategory-id", name: "Templates" };
  const view = mapProductToStoreView({ ...product, category, subcategory });
  assert.equal(view.category, "Design");
  assert.equal(view.subcategory, "Templates");
  assert.equal(view.priceLabel, "$0");
  assert.equal(productTaxonomyId(category), "category-id");
  assert.equal(productTaxonomyId(subcategory), "subcategory-id");
});

test("raw and missing references are safe and do not display database IDs", () => {
  assert.equal(productTaxonomyId("category-id"), "category-id");
  for (const reference of [null, undefined]) {
    assert.equal(productTaxonomyId(reference), "");
  }
  for (const category of ["category-id", null, undefined]) {
    assert.equal(mapProductToStoreView({ ...product, category }).category, undefined);
  }
});
