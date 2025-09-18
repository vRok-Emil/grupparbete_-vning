import { Product } from "../db/models/Product.js"

const getAllProducts = async () => {
  return await Product.find()
}

const getProductById = async (id) => {
  return await Product.findById(id)
}

const createProduct = async (productData) => {
  return await Product.create(productData)
}

const updateProduct = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true })
}

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id)
}

const getTotalStockValue = async () => {
  return await Product.aggregate([
    {
      $group: {
        _id: null,
        totalStockValue: { $sum: { $multiply: ["$amountInStock", "$price"] } },
      },
    },
  ])
}

const getTotalStockValueByManufacturer = async () => {
  return await Product.aggregate([
    {
      $lookup: {
        from: "manufacturers",
        localField: "manufacturer",
        foreignField: "_id",
        as: "manufacturerData",
      },
    },
    { $unwind: "$manufacturerData" },
    {
      $group: {
        _id: "$manufacturerData.name",
        totalStockValue: {
          $sum: { $multiply: ["$amountInStock", "$price"] },
        },
      },
    },
  ])
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTotalStockValue,
  getTotalStockValueByManufacturer,
}
