import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    console.log('Attempting to connect to DB')
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error while connecting to mongoDB", error.message);
  }
};
