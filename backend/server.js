import express from "express"
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT
const app = express()

app.get("/api/auth/signup",(req,res)=>{
  res.send("Signup route")
})

app.get("/api/auth/login",(req,res)=>{
  res.send("login route")
})

app.get("/api/auth/logout",(req,res)=>{
  res.send("Logout route")
})

app.listen(PORT,()=>{
  console.log(`the server is running on port ${PORT}`)
});