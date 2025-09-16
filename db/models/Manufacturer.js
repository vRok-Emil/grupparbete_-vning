import mongoose, { Schema } from "mongoose";

const manufacturerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		country: { type: String },
		website: { type: String },
		description: { type: String },
		address: { type: String, required: true },
		contact: { type: Schema.Types.ObjectId, ref: "Contact", required: true },
	},
	{ timestamps: true, collection: "manufacturer" }
);

export const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
