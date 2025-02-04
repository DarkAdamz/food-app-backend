import userModel from "../models/userModel.js";

//Add to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Added to Cart"});
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({success: false, message: "Was not able to add to cart"});
    }
};

//Remove from Cart
const removeFromCart = async (req, res) => {};

//Fetch cart
const getCart = async (req, res) => {};

export {addToCart, removeFromCart, getCart};
