import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production")
    dotenv.config();

import connectDB from "./config/db.config.js";
import app from "./app.js";

// @desc    Connect to DB
const DB_URI = process.env.DB_URI;
connectDB(DB_URI);

// @desc    Start Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server has started on PORT: ${PORT} 🎉`);
});

process.on("uncaughtException", (err, promise) => {
    console.log(`⚠️  Logged Error: \n${err}`);
    server.close(() => process.exit(1));
    console.log(`☢️  Server Closed`);
});
process.on("unhandledRejection", (err, promise) => {
    console.log(`⚠️  Logged Error: \n${err}`);
    server.close(() => process.exit(1));
    console.log(`☢️  Server Closed`);
});