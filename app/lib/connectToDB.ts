import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("db connected...");
    console.log('MongoDB URL:', process.env.MONGO_URL);
    
  } catch (error) {
    console.log(error);
  }
}
export default connectToDB;
