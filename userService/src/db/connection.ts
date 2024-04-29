import mongoose, { connect } from "mongoose";

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/userdb";
console.log(dbURI);
const connectDB = async () => {
  try {
    await connect(dbURI);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const db = mongoose.connection;

export default connectDB;
