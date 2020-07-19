import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../../constant/types";
import ProductResolver from "./ProductResolver";
import ProductSearchDTO from "./ProductSearchDto";

@controller("/api/products")
export default class ProductsController {
  constructor(@inject(TYPES.ProductResolver) private productResolver: ProductResolver) {}

  @httpGet("/")
  public async search(): Promise<ProductSearchDTO> {
    const dto = await this.productResolver.search();
    return dto;
  }
}
