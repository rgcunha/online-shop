import Customer from './Customer';
import CustomerDTO from './CustomerDto';

export default class ProductMapper {
  static toDto(customer: Customer): CustomerDTO {
    return {
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth.toISOString(),
      gender: customer.gender,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      postCode: customer.postCode,
      countryCode: customer.countryCode,
    }
  }

  static toEntity(dto: CustomerDTO): Customer {
    return new Customer({
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: dto.dateOfBirth,
      gender: dto.gender,
      email: dto.email,
      address: dto.address,
      city: dto.city,
      postCode: dto.postCode,
      countryCode: dto.countryCode,
    })
  }
}