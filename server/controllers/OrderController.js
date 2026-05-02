// controllers/OrderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Address from "../models/Address.js";
import { sendOrderNotification } from "../utils/whatsappUtils.js";

export const placeOrderOnline = async (req, res) => {
  try {
    const { items, address, transactionId } = req.body;
    const userId = req.user?._id || req.body.userId;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!address || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Address not provided",
      });
    }
    
    if (!transactionId || transactionId.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }

    const trimmedTransactionId = transactionId.trim();
    if (trimmedTransactionId.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID must be at least 8 characters long",
      });
    }

    // Check duplicate transaction ID
    const existingOrder = await Order.findOne({ transactionId: trimmedTransactionId });
    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: "This Transaction ID is already used",
      });
    }

    // Calculate amount
    let amount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.product} not found`,
        });
      }
      const itemTotal = (product.offerPrice || product.price) * item.quantity;
      amount += itemTotal;
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        name: product.name,
        price: itemTotal
      });
    }

    // Add 5% tax
    const tax = Math.floor(amount * 0.05);
    amount += tax;
    
    // ✅ FIXED: Create order with isPaid: FALSE (payment pending verification)
    const order = await Order.create({
      userId,
      items: items.map(item => ({ 
        product: item.product, 
        quantity: item.quantity 
      })),
      amount,
      address,
      paymentType: "Online",
      isPaid: false,              // ✅ FALSE until payment is verified
      paymentVerified: false,     // ✅ Not verified yet
      paymentStatus: "pending",   // ✅ pending status
      transactionId: trimmedTransactionId
    });

    // Fetch user and address details for WhatsApp message
    const user = await User.findById(userId).select('name phone email');
    const addressDetails = await Address.findById(address);
    
    // Prepare data for WhatsApp message
    const orderDataForWhatsApp = {
      orderId: order._id,
      customerName: user?.name || "Customer",
      customerPhone: user?.phone || "Not provided",
      totalAmount: amount,
      paymentType: "Online",
      transactionId: trimmedTransactionId,
      paymentStatus: "PENDING VERIFICATION", // ⚠️ Tell seller to verify
      address: addressDetails 
        ? `${addressDetails.street}, ${addressDetails.city}, ${addressDetails.state} - ${addressDetails.pincode}\n📞 ${addressDetails.phone || "No phone"}`
        : "Address not provided",
      items: orderItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    // Generate WhatsApp notification
    const whatsappNotification = await sendOrderNotification(orderDataForWhatsApp);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully! Payment verification pending.",
      orderId: order._id,
      orderDetails: {
        amount: amount,
        items: orderItems.length,
        transactionId: trimmedTransactionId,
        tax: tax,
        paymentStatus: "pending"
      },
      whatsappNotification: {
        success: whatsappNotification.success,
        url: whatsappNotification.whatsappUrl,
        message: "Order details sent to WhatsApp"
      }
    });
    
  } catch (error) {
    console.error("Order placement error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ NEW: Verify Payment (No seller validation required)
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, transactionId } = req.body;
    
    if (!orderId || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "Order ID and Transaction ID are required"
      });
    }
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    
    // Check if already verified
    if (order.isPaid && order.paymentVerified) {
      return res.status(400).json({
        success: false,
        message: "Payment already verified for this order"
      });
    }
    
    // Verify transaction ID matches
    if (order.transactionId !== transactionId) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID does not match"
      });
    }
    
    // ✅ Update payment status
    order.isPaid = true;
    order.paymentVerified = true;
    order.paymentStatus = "verified";
    order.paymentVerifiedAt = new Date();
    
    await order.save();

    res.json({
      success: true,
      message: "Payment verified successfully! Order has been confirmed.",
      order: {
        id: order._id,
        isPaid: order.isPaid,
        paymentVerified: order.paymentVerified,
        paymentStatus: order.paymentStatus
      }
    });
    
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Get user orders - Show payment status correctly
export const getUserOrders = async(req, res)=>{
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User authentication required",
      });
    }
    
    const orders = await Order.find({ userId })
      .populate("items.product address")
      .sort({createdAt: -1});
    
    res.status(200).json({
      success: true,
      orders: orders.map(order => ({
        ...order.toObject(),
        isPaid: order.isPaid,
        paymentVerified: order.paymentVerified,
        paymentStatus: order.paymentStatus
      }))
    });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// ✅ Get all orders for seller - Show pending verifications first
export const getAllOrders = async(req, res)=>{
  try {
    const orders = await Order.find({})
      .populate("items.product")
      .populate("address")
      .populate("userId", "name phone email")
      .sort({ createdAt: -1 });

    // Sort orders: pending verification first
    const sortedOrders = orders.sort((a, b) => {
      if (a.paymentStatus === 'pending' && b.paymentStatus !== 'pending') return -1;
      if (a.paymentStatus !== 'pending' && b.paymentStatus === 'pending') return 1;
      return 0;
    });

    res.status(200).json({
      success: true,
      orders: sortedOrders.map(order => ({
        ...order.toObject(),
        isPaid: order.isPaid,
        paymentVerified: order.paymentVerified,
        paymentStatus: order.paymentStatus
      }))
    });
  } catch (error) {
    console.error("Get seller orders error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Get WhatsApp URL for specific order
export const getOrderWhatsAppLink = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId)
      .populate('userId', 'name phone')
      .populate('address')
      .populate('items.product', 'name price');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Prepare order data
    const orderData = {
      orderId: order._id,
      customerName: order.userId?.name || "Customer",
      customerPhone: order.userId?.phone || "Not provided",
      totalAmount: order.amount,
      paymentType: order.paymentType,
      transactionId: order.transactionId,
      paymentStatus: order.isPaid ? "VERIFIED" : "PENDING VERIFICATION",
      address: order.address 
        ? `${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`
        : "Address not provided",
      items: order.items.map(item => ({
        name: item.product?.name || "Product",
        quantity: item.quantity,
        price: (item.product?.price || 0) * item.quantity
      }))
    };

    // Generate WhatsApp URL
    const { generateOrderWhatsAppMessage, getWhatsAppURL } = await import('../utils/whatsappUtils.js');
    const message = generateOrderWhatsAppMessage(orderData);
    const whatsappUrl = getWhatsAppURL(message);

    res.status(200).json({
      success: true,
      whatsappUrl: whatsappUrl,
      orderData: {
        orderId: orderData.orderId,
        customerName: orderData.customerName,
        totalAmount: orderData.totalAmount,
        paymentStatus: orderData.paymentStatus
      }
    });

  } catch (error) {
    console.error("Error generating WhatsApp link:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};