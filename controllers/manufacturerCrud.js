import { Manufacturer } from "../db/models/manufacturer.js";

const getAllManufacturers = async () => {
  return await Manufacturer.find();
};

const getManufacturerById = async (id) => {
  return await Manufacturer.findById(id);
};

const createManufacturer = async (manufacturerData) => {
  return await Manufacturer.create(manufacturerData);
}

const updateManufacturer = async (id, updateData) => {
  return await Manufacturer.findByIdAndUpdate(id, updateData, { new: true });
}

const deleteManufacturer = async (id) => {
  return await Manufacturer.findByIdAndDelete(id);
}

export default {
  getAllManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
};