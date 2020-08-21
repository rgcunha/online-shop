import mongoose, { Schema, Document } from 'mongoose';

export interface OrderItem {
  productId: Number,
  quantity: Number,
}

export interface IOrder extends Document {
  id: Number,
  customerId: Number,
  orderItems: OrderItem[],
  price: Number,
  status: String
  creationDate: Date,
  completionDate: Date,
}

const OrderSchema: Schema = new Schema({
  order: Number,
  customerId: Number,
  orderItems: Array,
  price: Number,
  status: String,
  creationDate: Date,
  completionDate: Date,
});

const MongooseModel = mongoose.model<IOrder>('Order', OrderSchema);

export default class Order extends MongooseModel {}