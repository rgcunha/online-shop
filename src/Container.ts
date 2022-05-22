import { Container } from "inversify";
import { ILogger, Logger } from "./services/Logger";
import { Authenticator } from "./services/Authenticator";
import TYPES from "./constant/types";
import { ErrorResolver } from "./middlewares/error/ErrorResolver";
import { ErrorController } from "./middlewares/error/ErrorController";
import ProductController from "./domain/Product/ProductController";
import ProductResolver, { IProductResolver } from "./domain/Product/ProductResolver";
import CustomerController from "./domain/Customer/CustomerController";
import CustomerResolver, { ICustomerResolver } from "./domain/Customer/CustomerResolver";
import UserController from "./domain/User/UserController";
import UserResolver, { IUserResolver } from "./domain/User/UserResolver";
import OrderController from "./domain/Order/OrderController";

const container = new Container();

container.bind<ILogger>(TYPES.Logger).to(Logger);
container.bind<Authenticator>(TYPES.Authenticator).to(Authenticator).inSingletonScope();
container.bind<ErrorResolver>(TYPES.ErrorResolver).to(ErrorResolver);
container.bind<ErrorController>(TYPES.ErrorController).toConstantValue(ErrorController);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);
container.bind<IProductResolver>(TYPES.ProductResolver).to(ProductResolver);
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);
container.bind<ICustomerResolver>(TYPES.CustomerResolver).to(CustomerResolver);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IUserResolver>(TYPES.UserResolver).to(UserResolver);
container.bind<OrderController>(TYPES.OrderController).to(OrderController).inSingletonScope();

export { container };
