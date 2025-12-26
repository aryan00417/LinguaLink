import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import usersRoute from "./routes/user.route.js"
import chatRoute from "./routes/chat.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express()
const PORT = process.env.PORT


app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/chat",chatRoute)

app.listen(PORT,()=>{
  console.log(`the server is running on port ${PORT}`);
  connectDB();
});