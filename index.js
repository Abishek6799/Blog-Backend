import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbconfig.js";
import authRouter from "./Routers/authRouter.js";
import postRouter from "./Routers/postRouter.js"

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

connectDB()

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to Blog")
})

app.use("/api/auth",authRouter);
app.use("/api/post",postRouter)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("Server is Running");
})
