import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../../constant/types";
import CustomerResolver from "./CustomerResolver";
import CustomerDTO from "./CustomerDto";

@controller("/api/me")
export default class CustomerController {
  constructor(@inject(TYPES.CustomerResolver) private customerResolver: CustomerResolver) {}

  @httpGet("/")
  public async get(): Promise<CustomerDTO> {
    const dto = await this.customerResolver.get();
    return dto;
  }
}
