import ProductDTO from "./ProductDto";

export default interface ProductSearchDTO {
  count: Number;
  results: ProductDTO[];
};