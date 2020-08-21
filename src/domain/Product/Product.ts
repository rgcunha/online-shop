import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id: Number,
  name: String,
  description: String,
  price: Number,
  discount: Number,
  validFrom: Date,
  validUntil: Date,
}

const ProductSchema: Schema = new Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  discount: Number,
  validFrom: Date,
  validUntil: Date,
});

const MongooseModel = mongoose.model<IProduct>('Product', ProductSchema);

export default class Product extends MongooseModel {}