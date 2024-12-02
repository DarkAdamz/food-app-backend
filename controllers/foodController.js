import foodModel from "../models/foodModel.js";
import fs from "fs";
import express from "express";

const app = express();

// ADD FOOD ITEM
export const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });
    try {
        await food.save();
        res.status(200);
        res.json({success: true, message: "Food Added", data: food});
        console.log("Request Body:", req.body); // Check if req.body contains the fields
        console.log("Request File:", req.file); // Check if req.file contains the image
    } catch (error) {
        res.status(400);
        res.json({success: false, message: `${error}`});
    }
};

//FOOD LIST
export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200);
        res.json({success: true, data: foods});
        console.log("Food list has been recieved from database");
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({success: false, message: error});
    }
};

// REMOVE FOOD ITEM
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body._id);
        fs.unlink(`uploads/${food.image}`, () => {
            console.log("Picture removed from folder");
        });
        await foodModel.findByIdAndDelete(req.body._id);
        res.status(200);
        res.json({success: true, message: "Food deleted from Database"});
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({success: false, message: error});
    }
};
