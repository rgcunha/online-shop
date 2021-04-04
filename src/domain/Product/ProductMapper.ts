import Product from './Product';
import ProductDTO, { Badge } from './ProductDto';
import moment from 'moment';

export default class ProductMapper {
  static toDto(product: Product): ProductDTO {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      validFrom: product.validFrom.toISOString(),
      validUntil: product.validUntil.toISOString(),
      img: product.imageUrl,
      badge: ProductMapper.calculateBadge(product),
    }
  }

  static toEntity(dto: ProductDTO): Product {
    return new Product({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      discount: dto.discount,
      validFrom: dto.validFrom,
      validUntil: dto.validUntil,
      imageUrl: dto.img,
    })
  }

  private static calculateBadge(product: Product): Badge | null {
    if (product.discount) return Badge.SALE;
    if (moment(Date.now()).diff(product.validFrom, 'months') < 3) return Badge.NEW;
    return null;
  }
}