import dotenv from "dotenv";
dotenv.config();

import Connection from '../src/db/Connection';
import products from '../src/db/products';
import Product, { IProduct } from '../src/domain/Product/Product';

async function populateDatabase() {
  await Connection.connect();
  await Product.deleteMany({});

  const documents: IProduct[] = await Promise.all(products.map(async (product) => {
    const document: IProduct = new Product(product);
    await document.save();
    return document;
  }));
  
  console.log(`${documents.length} inserted`);
  await Connection.disconnect();
};

populateDatabase();



 