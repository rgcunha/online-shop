import ProductDTO, { Badge } from "../../src/domain/Product/ProductDto";

export const productDto: ProductDTO = {
  name: "Samsung Galaxy 6",
  description: "description",
  img: "https://drive.google.com/uc?export=view&id=14C5tYz8H0dBgrRepcIMza-3iY0PDUTFZ",
  price: 100.0,
  discount: 20.0,
  validFrom: "2020-07-26T23:05:40.793Z",
  validUntil: "2020-07-26T23:05:40.793Z",
  badge: Badge.SALE,
};