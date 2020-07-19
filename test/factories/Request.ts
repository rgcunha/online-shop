import { Factory } from "rosie";

const headers = {
  authorization: "Basic 123",
};

const factory = new Factory()
  .attr('headers', headers)
  .attr('body', {})
  .attr('params', {});

export default factory;