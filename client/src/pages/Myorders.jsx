import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CheckCircle, AlertTriangle, Clock, CreditCard, RefreshCw } from "lucide-react";

function Myorders() {
  const { axios, user } = useAppContext();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  // Function to get payment status color and icon
  const getPaymentStatus = (order) => {
    if (order.isPaid) {
      return {
        text: "Payment Verified",
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
        borderColor: "border-green-200",
        bgColor: "bg-green-50"
      };
    } else if (order.transactionId && !order.isPaid) {
      return {
        text: "Pending Verification",
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-4 h-4" />,
        borderColor: "border-yellow-200",
        bgColor: "bg-yellow-50"
      };
    } else {
      return {
        text: "Payment Failed",
        color: "bg-red-100 text-red-800",
        icon: <AlertTriangle className="w-4 h-4" />,
        borderColor: "border-red-200",
        bgColor: "bg-red-50"
      };
    }
  };

  // Function to get order status display
  const getOrderStatus = (order) => {
    if (order.isPaid) {
      return "Confirmed ✓";
    } else if (order.transactionId && !order.isPaid) {
      return "Awaiting Verification";
    } else {
      return order.status || "Pending";
    }
  };

  return (
    <>
      <div className="mt-16 pb-16 px-6 md:px-16 lg:px-24 xl:px-28 ">
        <div className="flex justify-between items-center mb-6 mt-20">
          <p className="text-2xl font-medium uppercase">My Orders</p>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : myOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found</p>
            <p className="text-gray-400 text-sm mt-2">Your orders will appear here</p>
          </div>
        ) : (
          myOrders.map((order, index) => {
            const paymentStatus = getPaymentStatus(order);
            
            return (
              <div 
                className={`border ${paymentStatus.borderColor} rounded-lg mb-10 p-4 py-5 transition-all duration-200 hover:shadow-md`} 
                key={order._id}
              >
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-center gap-3 text-gray-400 md:font-medium mb-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Order ID:</span>
                    <span className="font-mono text-sm font-medium text-gray-700">
                      {order._id?.slice(-12) || 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm capitalize">{order.paymentType || 'Online'}</span>
                  </div>
                  
                  <div className="font-bold text-gray-800">
                    Total: ₹{order.amount || 0}
                  </div>
                  
                  {/* Payment Status Badge */}
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${paymentStatus.color}`}>
                    {paymentStatus.icon}
                    <span>{paymentStatus.text}</span>
                  </div>
                  
                  {/* Transaction ID Display */}
                  {order.transactionId && (
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs">
                      <span className="font-medium">Txn:</span>
                      <span className="font-mono">{order.transactionId.slice(0, 8)}...</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(order.transactionId);
                          alert('Transaction ID copied to clipboard');
                        }}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        📋
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Order Items */}
                {order.items.map((item, itemIndex) => (
                  item.product ? (
                    <div 
                      className={`relative bg-white text-gray-500/70 ${order.items.length !== itemIndex + 1 && "border-b"} border-gray-100 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`} 
                      key={itemIndex}
                    >
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <img 
                            src={item.product.image?.[0] || '/placeholder.png'} 
                            className="w-16 h-16 object-cover"
                            alt={item.product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <h2 className="text-xl font-medium text-gray-800">{item.product.name}</h2>
                          <p className="text-sm text-gray-500">{item.product.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center md:ml-10 mb-4 md:mb-0">
                        <p>Quantity: {item.quantity || "1"}</p>
                        <p className="flex items-center gap-1 mt-1">
                          <span>Status:</span>
                          <span className={`font-medium ${
                            order.isPaid ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {getOrderStatus(order)}
                          </span>
                        </p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <p className="text-primary text-lg font-medium">
                        Amount: ₹{(item.product.offerPrice || item.product.price || 0) * (item.quantity || 1)}
                      </p>
                    </div>
                  ) : (
                    <div 
                      className={`relative bg-white text-gray-500/70 ${order.items.length !== itemIndex + 1 && "border-b"} border-gray-100 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`} 
                      key={itemIndex}
                    >
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="w-16 h-16 flex items-center justify-center bg-gray-200">
                            <span>❌</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h2 className="text-xl font-medium text-gray-800">Product no longer available</h2>
                          <p>Product has been removed</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center md:ml-10 mb-4 md:mb-0">
                        <p>Quantity: {item.quantity || "1"}</p>
                        <p>Status: {order.status}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <p className="text-gray-400 text-lg font-medium">
                        Product unavailable
                      </p>
                    </div>
                  )
                ))}
                
                {/* Payment Verification Message for Pending Orders */}
                {order.transactionId && !order.isPaid && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Payment Pending Verification
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Your transaction ID ({order.transactionId.slice(0, 12)}...) has been submitted. 
                          The seller will verify your payment within 24 hours. 
                          You will receive a confirmation once verified.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(order.transactionId);
                              alert('Transaction ID copied to clipboard');
                            }}
                            className="text-xs bg-white text-yellow-700 px-2 py-1 rounded border border-yellow-300 hover:bg-yellow-50"
                          >
                            Copy Transaction ID
                          </button>
                          <button
                            onClick={() => window.location.reload()}
                            className="text-xs bg-white text-yellow-700 px-2 py-1 rounded border border-yellow-300 hover:bg-yellow-50"
                          >
                            Check Status
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Payment Verified Message */}
                {order.isPaid && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          ✓ Payment Verified Successfully
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          Your payment has been verified. Your order is confirmed and will be processed soon.
                        </p>
                        {order.paymentVerifiedAt && (
                          <p className="text-xs text-green-600 mt-1">
                            Verified on: {new Date(order.paymentVerifiedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Myorders;