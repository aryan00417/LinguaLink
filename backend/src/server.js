import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT
const app = express()

app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
  console.log(`the server is running on port ${PORT}`);
  connectDB();
});