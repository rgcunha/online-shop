import mongoose from 'mongoose';

export default class Connection {
  static async connect(): Promise<void> {
    const connectionUrl = process.env.MONGO_DB_CONNECTION_URL;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    await mongoose.connect(connectionUrl as string, options);
    console.log(`connected to database: ${connectionUrl}`);
  }

  public static async disconnect(): Promise<void> {
    await mongoose.connection.close();
  }
};

