import { Product } from "../db/models/Product.js";

const getAllProducts = async () => {
  return await Product.find().populate('manufacturer');
}

const getProductById = async (id) => {
  return await Product.findById(id).populate('manufacturer');
}

const createProduct = async (productData) => {
  return await Product.create(productData);
}

const updateProduct = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
}

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
}

const getTotalStockValue = async () => {
    return await Product.aggregate([
        {
            $group:{
                _id: '$manufacturer',
                amount: {
                    $sum: "$amountInStock"
                },
                maxAmount: {
                    $max: "$amountInStock"
                }
            }
        }
    ]);
} 



export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTotalStockValue
};