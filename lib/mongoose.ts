import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGO_DB_URL) {
    return console.log('Missing mongo db url');
  }
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: 'devflow',
    });
    isConnected = true;
    // console.log('Successfuly connected to mongo db!');
  } catch (error) {
    console.error(error);
  }
};
