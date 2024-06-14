import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 4000;
const db = process.env.MongoDBURI;

// Log the environment variables to debug
console.log("PORT:", port);
console.log("MongoDB URI:", db);

if (!db) {
  console.error("MongoDB URI is not defined. Please check your .env file.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
