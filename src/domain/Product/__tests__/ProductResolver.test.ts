import { container } from "../../../Container";
import TYPES from "../../../constant/types";
import ProductSearchDTO from "../ProductSearchDto";
import { IProductResolver } from "../ProductResolver";
import Product from "../Product";
import { productSearchDto } from "../../../../test/mocks/productSearchDto";
import ProductFactory from "../../../../test/factories/Product";

describe("ProductResolver", () => {
  const product = ProductFactory.build();
  const products = [product, product];
  let resolver: IProductResolver;

  beforeAll(() => {
    Product.find = jest.fn().mockResolvedValue(products);
    resolver = container.get<IProductResolver>(TYPES.ProductResolver);
  });

  describe("search()", () => {
    let dto: ProductSearchDTO;

    beforeAll(async () => {
      dto = await resolver.search();
    });

    it("calls Product.find()", () => {
      expect(Product.find).toHaveBeenCalledTimes(1);
    });

    it("returns ProductSearchDto", () => {
      expect(dto).toEqual(productSearchDto);
    });
  });
});
