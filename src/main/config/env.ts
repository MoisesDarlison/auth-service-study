import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017",
  PORT_SERVER: process.env.PORT_SERVER || 3333,
};
