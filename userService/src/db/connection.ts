import mongoose, { connect } from "mongoose";
import { logError, logInfo } from "../utils/logger";

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/userdb";

const connectDB = async () => {
  try {
    await connect(dbURI);
    logInfo("DB connected");
  } catch (error: any) {
    logError(error.message);
    process.exit(1);
  }
};

export const db = mongoose.connection;

export default connectDB;
