import mongoose from "mongoose";
import {configDotenv} from "dotenv";
configDotenv();

const uri = `mongodb+srv://agwuuchea:${process.env.PASSWORD}@cluster0.adost.mongodb.net/food-app?retryWrites=true&w=majority&appName=Cluster0`;
const clientOptions = {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
        reconnectTries: Number.MAX_VALUE, // Retry indefinitely
        reconnectInterval: 500, // Reconnect every 500ms
    },
};

export const ConnectDB = async () => {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        // await mongoose.connection.db.admin().command({ping: 1});
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
        console.log("Connection to the database was successful");
    } catch (err) {
        mongoose.disconnect();
        console.log(`Server was stopped because of:`, err);
    }
};
