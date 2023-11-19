import mongoose from "mongoose";

const connectDB = async (URI) => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI);

    console.log("Connection to the Database was established successfully 🌍");
};

export default connectDB;