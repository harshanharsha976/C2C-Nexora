import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://Harshan:harshanharsha@ac-j1xwww7-shard-00-00.qyfakyf.mongodb.net:27017,ac-j1xwww7-shard-00-01.qyfakyf.mongodb.net:27017,ac-j1xwww7-shard-00-02.qyfakyf.mongodb.net:27017/?ssl=true&replicaSet=atlas-yvbehn-shard-0&authSource=admin&appName=Cluster0",
    );

    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("Connection error ❌:", err);
    process.exit(1);
  }
};
