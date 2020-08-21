import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  id: Number,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  email: String,
  address: String,
  city: String,
  postCode: String,
  countryCode: String,
}

const CustomerSchema: Schema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  email: String,
  address: String,
  city: String,
  postCode: String,
  countryCode: String,
});

const MongooseModel = mongoose.model<ICustomer>('Customer', CustomerSchema);

export default class Customer extends MongooseModel {}