import { Factory } from 'rosie';
import AxiosResponse from './AxiosResponse';

// axios error structure
const factory = new Factory()
  .option('status', 500)
  .option('data', {})
  .attr('response', ['status', 'data'], (status, data) => AxiosResponse.build({ status, data }));

export default factory;