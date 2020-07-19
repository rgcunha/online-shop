import { Factory } from "rosie";

const factory = new Factory()
  .attr('send', () => console.log("response sent!"))
  .attr('status', 400);

export default factory;