import mongoose, { Schema } from "mongoose";
import manufacturerSchema from "./Manufacturer.js";

const productSchema = new mongoose.Schema(
	{
	name: { type: String, required: true, trim: true, unique: true },
	sku: {type: Number, required: true, unique: true},
	description: { type: String },
    price: {type: Number, required: true},
    category: {type: String, required: true},
    //manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true},
    manufacturer: {type: manufacturerSchema, required: true},
	
    amountInStock: {type: Number, required: true}
	},
	{ timestamps: true, collection: "products" }
);

export const Product = mongoose.model("Product", productSchema, "products");
