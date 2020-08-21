import dotenv from "dotenv";
dotenv.config();

import Connection from '../src/db/Connection';
import { products, customers, orders } from '../src/db/seeds';
import Product, { IProduct } from '../src/domain/Product/Product';
import Customer, { ICustomer } from "../src/domain/Customer/Customer";
import Order, { IOrder } from "../src/domain/Order/Order";

async function createProducts() {
  await Product.deleteMany({});
  const documents: IProduct[] = await Promise.all(products.map(async (product) => {
    const document: IProduct = new Product(product);
    await document.save();
    return document;
  }));
  
  console.log(`${documents.length} product(s) added`);
}

async function createCustomers() {
  await Customer.deleteMany({});
  const documents: ICustomer[] = await Promise.all(customers.map(async (customer) => {
    const document: ICustomer = new Customer(customer);
    await document.save();
    return document;
  }));
  
  console.log(`${documents.length} customer(s) added`);
}

async function createOrders() {
  await Order.deleteMany({});
  const documents: IOrder[] = await Promise.all(orders.map(async (order) => {
    const document: IOrder = new Order(order);
    await document.save();
    return document;
  }));
  
  console.log(`${documents.length} order(s) added`);
}

async function populateDatabase() {
  await Connection.connect();
  await createProducts();
  await createCustomers();
  await createOrders();
  await Connection.disconnect();
};

populateDatabase();



 