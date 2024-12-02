import express from "express";
import cors from "cors";
import {ConnectDB} from "./config/db.js";
import mongoose from "mongoose";
import "dotenv/config";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";

// APP CONFIG
const app = express();
const port = 4000;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(cors());

// API ENDPOINT
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user/", userRouter);
app.use("/api/cart", cartRouter);

//TEST API
app.post("/test", (req, res) => {
    console.log("Request body:", req.file); // Should log the incoming data
    res.json({message: "Data received", data: req.file});
});

app.get("/", (req, res) => {
    res.send("Api is working");
});

app.listen(port, () => {
    console.log(`Server is ready to roll on port http://localhost:${port}`);
});

// DB CONNECTION
ConnectDB().catch(console.dir);
//CHECKING THE CONNECTION
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to the database ");
}); //The database is still connected

mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error: " + err);
}); //There was an error during the connection

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
}); //The database has been disconnected.

//mongodb+srv://agwuuchea:<db_password>@cluster0.adost.mongodb.net/?
