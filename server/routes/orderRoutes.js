import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import { admin, protectRoute } from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";

const orderRoutes = express.Router();

const getOrders = async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
};

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).send("Order not found.");
    throw new Error("Order not found.");
  }
});
const setCancel = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.status === "Cancelled") {
      res.status(400).send("Order is already cancelled.");
    } else {
      // Đặt lại trạng thái thành "Cancelled"
      order.status = "Cancelled";
      order.cancelledQty = order.orderItems.reduce((acc, item) => acc + item.qty, 0);
      const updatedOrder = await order.save();

      // Gọi hàm để xử lý logic sau khi hủy đơn hàng (ví dụ: cập nhật số lượng hàng trong kho)
      await handleCancelledOrder(updatedOrder);

      res.json(updatedOrder);
    }
  } else {
    res.status(404).send("Order not found.");
    throw new Error("Order not found.");
  }
});

// Hàm xử lý logic sau khi hủy đơn hàng
const handleCancelledOrder = async (order) => {
  // Thêm logic xử lý sau khi hủy đơn hàng ở đây
  // Ví dụ: cập nhật số lượng hàng trong kho
  for (const item of order.orderItems) {
    const product = await Product.findById(item.id);
    if (product) {
      product.countInStock += item.qty; // Cộng lại số lượng hàng trong kho
      await product.save();
    }
  }
};

const setDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).send("Order could not be uploaded.");
    throw new Error("Order could not be updated.");
  }
});

orderRoutes.route("/").get(protectRoute, admin, getOrders);
orderRoutes.route("/:id").put(protectRoute, admin, setDelivered);
orderRoutes.route("/:id").delete(protectRoute, admin, deleteOrder);
orderRoutes.route("/:id/cancel").put(protectRoute, admin, setCancel);

export default orderRoutes;
