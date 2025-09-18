import express from "express"
import productCrud from "../controllers/productCrud.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const allProducts = await productCrud.getAllProducts()
    if (!allProducts) {
      return res.status(404).json({ message: "No products found" })
    }
    return res.status(200).json(allProducts)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Couldn't get all products", error: error.message })
  }
})

router.get("/total-amount", async (req, res) => {
  try {
    const totalamount = await productCrud.getTotalStockValue()
    return res.status(200).json(totalamount)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Couldn't get totalamount", error: error.message })
  }
})

router.get("/total-amount-by-manufacturer", async (req, res) => {
  try {
    const totalamountByManufacturer =
      await productCrud.getTotalStockValueByManufacturer()
    return res.status(200).json(totalamountByManufacturer)
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't get totalamount by manufacturer",
      error: error.message,
    })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const product = await productCrud.getProductById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    return res.status(200).json(product)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Couldn't get product by id", error: error.message })
  }
})

router.post("/", async (req, res) => {
  const {
    name,
    sku,
    description,
    price,
    category,
    manufacturer,
    amountInStock,
  } = req.body
  try {
    if (
      !name ||
      !sku ||
      !price ||
      !category ||
      !manufacturer ||
      !amountInStock
    ) {
      return res.status(400).json({ message: "Missing required fields" })
    }
    const newProduct = await productCrud.createProduct({
      name,
      sku,
      description,
      price,
      category,
      manufacturer,
      amountInStock,
    })
    return res.status(201).json(newProduct)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Couldn't create product", error: error.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const updateProduct = await productCrud.updateProduct(
      req.params.id,
      req.body
    )
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" })
    }
    return res.status(200).json(updateProduct)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Couldn't update product", error: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await productCrud.deleteProduct(req.params.id)
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }
    return res.status(200).json({ message: "Product deleted successfully" })
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Couldn't delete product", error: error.message })
  }
})

export default router
