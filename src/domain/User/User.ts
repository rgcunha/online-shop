import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: String,
  password: String,
}

const UserSchema: Schema = new Schema({
  email: String,
  password: String,
});

const MongooseModel = mongoose.model<IUser>('User', UserSchema);

export default class User extends MongooseModel {}