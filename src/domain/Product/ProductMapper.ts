import Product from './Product';
import ProductDTO from './ProductDto';

export default class ProductMapper {
  static toDto(product: Product): ProductDTO {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      validFrom: product.validFrom.toISOString(),
      validUntil: product.validUntil.toISOString(),
    }
  }

  static toEntity(dto: ProductDTO): Product {
    return new Product({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      discount: dto.discount,
      validFrom: dto.validFrom,
      validUntil: dto.validUntil
    })
  }
}