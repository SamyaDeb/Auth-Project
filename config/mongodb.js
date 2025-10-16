import mongoose from "mongoose"

const connectDB = async() => {

  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("MongoDB Connected Successfully! ✅");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message} ❌`);
  }
  
}

export default connectDB