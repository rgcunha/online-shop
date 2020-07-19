import ProductSearchDTO from "../../src/domain/Product/ProductSearchDto";
import { productDto } from "./productDto";

export const productSearchDto: ProductSearchDTO = {
  count: 2,
  results: [
    productDto,
    productDto,
  ]
};