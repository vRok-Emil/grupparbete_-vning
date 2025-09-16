import mongoose, { Schema } from "mongoose";
import { Contact } from "./Contact.js";

const manufacturerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		country: { type: String },
		website: { type: String },
		description: { type: String },
		address: { type: String, required: true },
		contact: { type: Schema.Types.ObjectId, ref: "Contact", required: true },
    // contact: { type: Contact, ref: "Contact", required: true },
	},
	{ timestamps: true, collection: "manufacturer" },
  { _id: false }
);

export const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema, "manufacturers");
