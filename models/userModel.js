import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        cardData: {type: Object, default: {}},
    },
    {minimize: false}
); // To allow the object to be created without and empty object

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
