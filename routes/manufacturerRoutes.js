import express from "express";
import manufacturerCrud from "../controllers/manufacturerCrud.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allManufacturers = await manufacturerCrud.getAllManufacturers();
    if (!allManufacturers) {
      return res.status(404).json({ message: "No manufacturers found" });
    }
    return res.status(200).json(allManufacturers);
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't get all manufacturers", error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const manufacturer = await manufacturerCrud.getManufacturerById(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }
    return res.status(200).json(manufacturer);
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't get manufacturer by id", error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  const { name, country, website, description, address, contact } = req.body;
  try {
    if (!name || !address || !contact) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newManufacturer = await manufacturerCrud.createManufacturer({
      name, country, website, description, address, contact
    });
    return res.status(201).json(newManufacturer);
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't create manufacturer", error: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedManufacturer = await manufacturerCrud.updateManufacturer(req.params.id, req.body);
    if (!updatedManufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }
    return res.status(200).json(updatedManufacturer);
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't update manufacturer", error: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedManufacturer = await manufacturerCrud.deleteManufacturer(req.params.id);
    if (!deletedManufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }
    return res.status(200).json({ message: "Manufacturer deleted successfully" });
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't delete manufacturer", error: error.message
    });
  }
});

export default router;