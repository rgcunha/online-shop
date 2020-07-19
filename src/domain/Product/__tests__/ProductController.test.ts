import { container } from "../../../Container";
import { injectable } from "inversify";
import TYPES from "../../../constant/types";
import ProductController from "../ProductController";
import { IProductResolver } from "../ProductResolver";
import ProductSearchDTO from "../ProductSearchDto";
import { productSearchDto } from "../../../../test/mocks/productSearchDto";

@injectable()
class MockResolver implements IProductResolver {
  search(): Promise<ProductSearchDTO> {
    return Promise.resolve(productSearchDto);
  }
}

describe("ProductController", () => {
  let controller: ProductController;
  let spySearch: jest.SpyInstance;

  beforeAll(() => {
    const resolver = new MockResolver();

    container.snapshot();
    container.rebind<IProductResolver>(TYPES.ProductResolver).toConstantValue(resolver);

    spySearch = jest.spyOn(resolver, "search");
    controller = container.get<ProductController>(TYPES.ProductController);
  });

  afterAll(() => {
    container.restore();
  });

  describe("list()", () => {
    let dto: ProductSearchDTO;

    beforeAll(async () => {
      dto = await controller.search();
    });

    it("calls ProductResolver.search()", () => {
      expect(spySearch).toHaveBeenCalledTimes(1);
    });

    it("returns ProductSearchDto", () => {
      expect(dto).toEqual(productSearchDto);
    });
  });
});
