import { Container } from "inversify";
import { ILogger, Logger } from "./services/Logger";
import TYPES from "./constant/types";
import { ErrorResolver } from "./middlewares/error/ErrorResolver";
import { ErrorController } from "./middlewares/error/ErrorController";
import ProductController from "./domain/Product/ProductController";
import ProductResolver, { IProductResolver } from "./domain/Product/ProductResolver";
import CustomerController from "./domain/Customer/CustomerController";
import CustomerResolver, { ICustomerResolver } from "./domain/Customer/CustomerResolver";

const container = new Container();

container.bind<ILogger>(TYPES.Logger).to(Logger);
container.bind<ErrorResolver>(TYPES.ErrorResolver).to(ErrorResolver);
container.bind<ErrorController>(TYPES.ErrorController).toConstantValue(ErrorController);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);
container.bind<IProductResolver>(TYPES.ProductResolver).to(ProductResolver);
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);
container.bind<ICustomerResolver>(TYPES.CustomerResolver).to(CustomerResolver);

export { container };
