import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./db.js";
import express from "express";
import cors from "cors";
import upload from "./middleware/upload.js";

//Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import stripeRoute from "./routes/stripeRoute.js";
import orderRoutes from "./routes/orderRoutes.js";

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/checkout", stripeRoute);
app.use("/api/orders", orderRoutes);

app.get("/api/config/google", (req, res) => res.send(process.env.GOOGLE_CLIENT_ID));

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    // Lưu trữ thành công, trả về tên tệp tin

    const fileName = req.file.filename;
    res.json({ imageName: fileName });
    console.log(fileName);
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//localhost:5000//api/products

const port = 5000;

app.get("/", (req, res) => {
  res.send("Api is running ...");
});

app.listen(port, () => {
  console.log(`Sever runs on port ${port}`);
});
