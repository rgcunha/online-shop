const TYPES = {
  Logger: Symbol.for("Logger"),
  Authenticator: Symbol.for("Authenticator"),
  ErrorResolver: Symbol.for("ErrorResolver"),
  ErrorController: Symbol.for("ErrorController"),
  ProductResolver: Symbol.for("ProductResolver"),
  ProductController: Symbol.for("ProductController"),
  CustomerResolver: Symbol.for("CustomerResolver"),
  CustomerController: Symbol.for("CustomerController"),
  UserResolver: Symbol.for("UserResolver"),
  UserController: Symbol.for("UserController"),
  OrderController: Symbol.for("OrderController"),
};

export default TYPES;
