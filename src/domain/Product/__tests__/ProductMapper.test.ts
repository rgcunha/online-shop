import ProductMapper from "../ProductMapper";
import { productDto } from "../../../../test/mocks/productDto";
import Product from "../../../../test/factories/Product";
import ProductDTO from "../ProductDto";

describe("ProductMapper", () => {
  describe("toDto()", () => {
    let dto: ProductDTO;
    const product = Product.build();

    it("returns expected dto", () => {
      dto = ProductMapper.toDto(product);

      expect(dto).toEqual(productDto);
    });
  });
});
