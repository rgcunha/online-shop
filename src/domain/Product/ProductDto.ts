export enum Badge {
  SALE = 'sale',
  NEW = 'new',
}

export default interface ProductDTO {
  name: String;
  description: String;
  price: Number;
  discount: Number;
  validFrom: String;
  validUntil: String;
  img: String;
  badge: Badge | null;
};