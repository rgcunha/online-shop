import { Factory } from 'rosie';

// axios response structure
const factory = new Factory()
  .attr('status', 200)
  .attr('request', {
    path: 'path',
    method: 'GET',
  })
  .attr('config', {
    headers: {
      'Content-type': 'application/json',
    },
  })
  .attr('data', {});

export default factory;