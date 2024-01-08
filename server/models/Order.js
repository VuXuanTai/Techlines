import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    shippingPrice: { type: Number, default: 0.0 },
    totalPrice: { type: Number, default: 0.0 },
    subtotal: { type: Number, default: 0.0 },
    isDelivered: { type: Boolean, required: true, default: false },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    cancelledQty: { type: Number, default: 0 }, // Thêm trường số lượng bị hủy
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Created", "Paid", "Delivered", "Cancelled", "Success"],
      default: "Created",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
