import { Factory } from "rosie";

const factory = new Factory()
  .attr('name', 'Samsung Galaxy 6')
  .attr('description', 'description')
  .attr('imageUrl', 'https://drive.google.com/uc?export=view&id=14C5tYz8H0dBgrRepcIMza-3iY0PDUTFZ')
  .attr('price', 100.0)
  .attr('discount', 20.0)
  .attr('validFrom', new Date("2020-07-26T23:05:40.793Z"))
  .attr('validUntil', new Date("2020-07-26T23:05:40.793Z"));

export default factory;