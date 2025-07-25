import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true, //!allow frontend side to send cookies
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})