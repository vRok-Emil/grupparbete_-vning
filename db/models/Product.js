import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
	    sku: {type: Number, required: true, unique: true},
		description: { type: String },
        price: {type: Number, required: true},
        category: {type: String, required: true},
        manufacturer: {type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true},
        amountInStock: {true: Number, required: true}
	},
	{ timestamps: true, collection: "tasks" }
);

export const Product = mongoose.model("Product", productSchema, "products");
