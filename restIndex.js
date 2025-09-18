import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/dbConnection.js";
import productRoutes from "./routes/productRoutes.js";
import manufacturerRoutes from "./routes/manufacturerRoutes.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/products", productRoutes)
app.use("/manufacturers", manufacturerRoutes)

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

export default app;