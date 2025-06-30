import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import mongoose from "mongoose";
import router from "./routers/alarms.js";
import connectDB from "./config/dbConn.js";
import cookieParser from "cookie-parser"
const app = express()
const PORT = process.env.PORT || 3500;

configDotenv();
connectDB();
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/alarms', router);


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Up and Running!"));
});