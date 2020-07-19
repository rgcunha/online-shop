import { injectable } from 'inversify';
import Product from './Product';
import ProductSearchDTO from './ProductSearchDto';
import ProductMapper from './ProductMapper';

export interface IProductResolver {
  search(): Promise<ProductSearchDTO>;
}

@injectable()
export default class ProductResolver implements IProductResolver {
  public async search(): Promise<ProductSearchDTO> {
    const products: Product[] = await Product.find();
    return {
      count: products.length,
      results: products.map(ProductMapper.toDto),
    }
  }
}
