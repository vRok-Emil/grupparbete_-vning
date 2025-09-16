import express from 'express';
import prodcutCrud from '../controllers/productCrud.js';

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        
        const allProducts = await productCrud.getAllProducts();
        if (!allProducts) {
            return res.status(404).json({message:"No products found"});
        }
        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(400).json({message:"Couldn't get all products", error:error.message});
    }
});
router.get("/products/:id", async (req, res)=>{
    try {
        const product = await productsCrud.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({message:"Couldn't get product by id", error:error.message});
    }
});

router.post("/products", async (req, res)=>{
    const {name, sku, description, price, category, manufacturer, amountInStock} = req.body;
    try {
        if (!name || !sku || !price || !category || !manufacturer || !amountInStock) {
            return res.status(400).json({message:"Missing required fields"});
        }
       const newProduct = await ProductCrud.createproduct({name, sku, description, price, category, manufacturer, amountInStock});
       return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(400).json({message:"Couldn't create product", error:error.message});
    }
});

router.put("/products/:id", async (req, res)=>{
    try {
     const updateProduct = await productCrud.updateProduct(req.params.id, req.body);
     if (!updateProduct) {
        return res.status(404).json({message:"Product not found"});
     }
     return res.status(200).json(updateProduct);   
    } catch (error) {
        return res.status(400).json({message:"Couldn't update product", error:error.message});
    }
});

router.delete("/products/:id", async (req, res)=>{
    try {
        const deleteProduct = await productCrud.deleteProduct(req.params.id);
        if (!deleteProduct) {
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        return res.status(400).json({message:"Couldn't delete product", error:error.message});
    }
});

export default router;

