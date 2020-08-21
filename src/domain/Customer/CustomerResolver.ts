import { injectable } from 'inversify';
import Customer from './Customer';
import CustomerDTO from './CustomerDto';
import CustomerMapper from './CustomerMapper';

export interface ICustomerResolver {
  get(): Promise<CustomerDTO>;
}

@injectable()
export default class CustomerResolver implements ICustomerResolver {
  public async get(): Promise<CustomerDTO> {
    const customers: Customer[] = await Customer.find();
    return CustomerMapper.toDto(customers[0]);
  }
}
