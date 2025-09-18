import mongoose from "mongoose";
import contactSchema from "./Contact.js";

const manufacturerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true, trim: true },
		country: { type: String },
		website: { type: String },
		description: { type: String },
		address: { type: String, required: true },
    contact: { type: contactSchema, required: true },
	},
	{ timestamps: true, collection: "manufacturers" },
);

export const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema, "manufacturers");
