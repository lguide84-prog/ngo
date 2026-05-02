import React, { useEffect, useState, useRef } from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { X, Package, User, MapPin, Calendar, Hash, CheckCircle, Tag, Layers, Download, FileText, Printer, Mail, Shield, AlertTriangle, CreditCard } from 'lucide-react';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [verifyingOrder, setVerifyingOrder] = useState(null);
  const { axios } = useAppContext();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeDetailModal = () => {
    setSelectedOrder(null);
  };

  // Payment Verification Function
  const verifyPayment = async (order) => {
    if (!order.transactionId) {
      toast.error("No transaction ID found for this order");
      return;
    }

    setVerifyingOrder(order._id);
    
    try {
      const { data } = await axios.post('/api/order/verify-payment', {
        orderId: order._id,
        transactionId: order.transactionId
      });

      if (data.success) {
        toast.success(data.message || "Payment verified successfully!");
        
        // Update the order in the local state
        setOrders(prevOrders => 
          prevOrders.map(o => 
            o._id === order._id 
              ? { ...o, isPaid: true, paymentVerified: true, paymentVerifiedAt: new Date() }
              : o
          )
        );
        
        // Refresh orders to get latest status
        fetchOrders();
      } else {
        toast.error(data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to verify payment");
    } finally {
      setVerifyingOrder(null);
    }
  };

  // Number to words function
  const numberToWords = (num) => {
    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);
    
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    const convertHundreds = (n) => {
      if (n === 0) return '';
      if (n < 10) return units[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
      if (n < 1000) {
        const hundred = Math.floor(n / 100);
        const remainder = n % 100;
        return units[hundred] + ' Hundred' + (remainder !== 0 ? ' ' + convertHundreds(remainder) : '');
      }
      return '';
    };
    
    const convert = (n) => {
      if (n === 0) return 'Zero';
      
      let result = '';
      
      // Crores
      const crore = Math.floor(n / 10000000);
      if (crore > 0) {
        result += convertHundreds(crore) + ' Crore ';
        n %= 10000000;
      }
      
      // Lakhs
      const lakh = Math.floor(n / 100000);
      if (lakh > 0) {
        result += convertHundreds(lakh) + ' Lakh ';
        n %= 100000;
      }
      
      // Thousands
      const thousand = Math.floor(n / 1000);
      if (thousand > 0) {
        result += convertHundreds(thousand) + ' Thousand ';
        n %= 1000;
      }
      
      // Hundreds
      const hundred = Math.floor(n / 100);
      if (hundred > 0) {
        result += convertHundreds(hundred) + ' Hundred ';
        n %= 100;
      }
      
      // Units
      if (n > 0) {
        result += convertHundreds(n);
      }
      
      return result.trim();
    };
    
    let result = convert(rupees) + ' Rupees';
    if (paise > 0) {
      result += ' and ' + convertHundreds(paise) + ' Paise';
    }
    
    return result;
  };

  // Function to generate invoice HTML
  const generateInvoiceHTML = (order) => {
    if (!order) return '';
    
    const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();
    const formattedDate = orderDate.toLocaleDateString('en-IN');
    const formattedTime = orderDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    
    let subtotal = 0;
    let totalGST = 0;
    let itemsList = [];
    
    if (order.items && order.items.length > 0) {
      itemsList = order.items.map((item, index) => {
        const product = item.product || {};
        const gstPercentage = product.gstPercentage || 5;
        const unitPrice = product.offerPrice || product.price || 0;
        const quantity = item.quantity || 1;
        const itemSubtotal = unitPrice * quantity;
        const gstAmount = (itemSubtotal * gstPercentage) / 100;
        const itemTotal = itemSubtotal + gstAmount;
        
        subtotal += itemSubtotal;
        totalGST += gstAmount;
        
        return {
          index: index + 1,
          name: product.name || 'Product',
          quantity: quantity,
          unitPrice: unitPrice,
          gstPercentage: gstPercentage,
          gstAmount: gstAmount,
          total: itemTotal
        };
      });
    }
    
    const grandTotal = subtotal + totalGST;
    const gstNo = "06CFEPK5827G1ZG";
    const panNo = "AABCU9603R";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Courier New', monospace;
          }
          
          body {
            width: 80mm;
            margin: 0 auto;
            padding: 5px;
            background: white;
            font-size: 12px;
            line-height: 1.2;
          }
          
          .invoice-container {
            width: 100%;
            border: 1px solid #000;
            padding: 8px;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
            margin-bottom: 8px;
          }
          
          .company-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 2px;
            text-transform: uppercase;
          }
          
          .company-tagline {
            font-size: 10px;
            margin-bottom: 3px;
            color: #555;
          }
          
          .gst-info {
            font-size: 9px;
            font-weight: bold;
          }
          
          .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 10px;
          }
          
          .customer-info {
            background: #f5f5f5;
            border: 1px dashed #888;
            padding: 6px;
            margin-bottom: 8px;
            font-size: 10px;
          }
          
          .customer-label {
            font-weight: bold;
            margin-bottom: 3px;
          }
          
          .items-header {
            display: grid;
            grid-template-columns: 40px 1fr 30px 50px 50px;
            gap: 3px;
            font-weight: bold;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 3px;
            font-size: 10px;
          }
          
          .items-header div {
            text-align: center;
          }
          
          .items-header div:nth-child(2) {
            text-align: left;
          }
          
          .item-row {
            display: grid;
            grid-template-columns: 40px 1fr 30px 50px 50px;
            gap: 3px;
            padding: 2px 0;
            border-bottom: 0.5px dotted #ccc;
            font-size: 10px;
          }
          
          .item-row div {
            text-align: center;
            overflow: hidden;
          }
          
          .item-row div:nth-child(2) {
            text-align: left;
            overflow-wrap: break-word;
            word-break: break-word;
          }
          
          .item-name {
            font-weight: bold;
          }
          
          .item-gst {
            font-size: 8px;
            color: #666;
            margin-top: 1px;
          }
          
          .calculation {
            margin-top: 8px;
            border-top: 1px solid #000;
            padding-top: 6px;
            font-size: 11px;
          }
          
          .calc-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }
          
          .gst-row {
            display: flex;
            justify-content: space-between;
            padding-left: 10px;
            margin-bottom: 1px;
            font-size: 9px;
          }
          
          .grand-total {
            display: flex;
            justify-content: space-between;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 2px solid #000;
            font-size: 13px;
            font-weight: bold;
          }
          
          .amount-words {
            background: #f5f5f5;
            padding: 4px;
            margin-top: 4px;
            font-size: 9px;
            border-left: 3px solid #000;
          }
          
          .payment-info {
            background: #f5f5f5;
            padding: 6px;
            margin-top: 8px;
            border-radius: 3px;
            font-size: 10px;
          }
          
          .payment-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }
          
          .footer {
            border-top: 1px solid #000;
            margin-top: 10px;
            padding-top: 6px;
            text-align: center;
            font-size: 9px;
          }
          
          .contact-info {
            margin-bottom: 3px;
            font-weight: bold;
          }
          
          .terms {
            color: #666;
            font-size: 8px;
            margin-top: 4px;
          }
          
          .thank-you {
            color: #000;
            font-weight: bold;
            margin-top: 5px;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 5px;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <div class="company-name">KUNTALAGRO AGENCIES</div>
            <div class="company-tagline">Farm & Garden Solutions</div>
            <div class="gst-info">GSTIN: ${gstNo}</div>
          </div>
          
          <div class="invoice-details">
            <div>
              <strong>INVOICE #:</strong> ${order._id?.slice(-8) || 'N/A'}<br>
              <strong>Date:</strong> ${formattedDate}<br>
              <strong>Time:</strong> ${formattedTime}
            </div>
            <div style="text-align: right;">
              <strong>TXN ID:</strong><br>
              <span style="font-family: monospace;">${order.transactionId?.slice(-12) || 'N/A'}</span>
            </div>
          </div>
          
          ${order.address ? `
            <div class="customer-info">
              <div class="customer-label">SHIP TO:</div>
              <div><strong>${order.address.firstname || ''} ${order.address.lastname || ''}</strong></div>
              <div>📱 ${order.address.phone || 'N/A'}</div>
              <div>${order.address.street || ''}</div>
              <div>${order.address.city || ''}, ${order.address.state || ''}</div>
              <div>PIN: ${order.address.zipcode || ''}</div>
            </div>
          ` : ''}
          
          <div class="items-header">
            <div>Sr.</div>
            <div>Item Name</div>
            <div>Qty</div>
            <div>Price</div>
            <div>Total</div>
          </div>
          
          ${itemsList.map(item => `
            <div class="item-row">
              <div>${item.index}</div>
              <div>
                <div class="item-name">${item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}</div>
                <div class="item-gst">GST ${item.gstPercentage}%: ₹${item.gstAmount.toFixed(2)}</div>
              </div>
              <div>${item.quantity}</div>
              <div>₹${item.unitPrice.toFixed(2)}</div>
              <div style="font-weight: bold;">₹${item.total.toFixed(2)}</div>
            </div>
          `).join('')}
          
          <div class="calculation">
            <div class="calc-row">
              <span>Subtotal (${itemsList.length} items):</span>
              <span>₹${subtotal.toFixed(2)}</span>
            </div>
            
            <div class="calc-row">
              <span>Total GST:</span>
              <span>₹${totalGST.toFixed(2)}</span>
            </div>
            
            <div class="calc-row">
              <span>Shipping:</span>
              <span style="font-weight: bold; color: #008000;">FREE</span>
            </div>
            
            <div class="grand-total">
              <span>GRAND TOTAL:</span>
              <span style="color: #008000;">₹${grandTotal.toFixed(2)}</span>
            </div>
            
            <div class="amount-words">
              <strong>Amount in Words:</strong> ${numberToWords(grandTotal)} only
            </div>
          </div>
          
          <div class="payment-info">
            <div class="payment-row">
              <span>Payment Status:</span>
              <span style="color: ${order.isPaid ? '#008000' : '#FFA500'}; font-weight: bold;">
                ${order.isPaid ? '✅ VERIFIED' : '⏳ PENDING VERIFICATION'}
              </span>
            </div>
            <div class="payment-row">
              <span>Payment Mode:</span>
              <span style="font-weight: bold;">${order.paymentType || 'ONLINE'}</span>
            </div>
            <div class="payment-row">
              <span>Order Status:</span>
              <span style="font-weight: bold; color: #008000;">CONFIRMED</span>
            </div>
          </div>
          
          <div class="footer">
            <div class="contact-info">
              📞 +91 8586845185 | 📧 kuntalagrosohna@gmail.com
            </div>
            <div style="margin-bottom: 3px;">
              <strong>PAN:</strong> ${panNo} | <strong>GST:</strong> ${gstNo}
            </div>
            <div class="terms">
              • This is a computer generated invoice • Valid without signature<br>
              • Goods once sold will not be taken back • Subject to Gurgaon jurisdiction
            </div>
            <div class="thank-you">
              Thank you for your business! 🚚
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const printInvoice = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(generateInvoiceHTML(order));
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // Function to get color based on category
  const getCategoryColor = (category) => {
    const colorMap = {
      "Crop": "bg-green-50 text-green-800 border-green-200",
      "Fertilizer": "bg-blue-50 text-blue-800 border-blue-200",
      "Pesticide": "bg-red-50 text-red-800 border-red-200",
      "Household Items": "bg-purple-50 text-purple-800 border-purple-200",
      "Sprayers": "bg-amber-50 text-amber-800 border-amber-200",
      "Sprayers Parts": "bg-cyan-50 text-cyan-800 border-cyan-200",
      "Terrace Gardening": "bg-emerald-50 text-emerald-800 border-emerald-200",
      "Household Insecticides": "bg-orange-50 text-orange-800 border-orange-200",
      "Farm Machinery": "bg-gray-100 text-gray-800 border-gray-300",
      "Plantation": "bg-lime-50 text-lime-800 border-lime-200"
    };
    
    return colorMap[category] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getSubCategoryColor = (category, subCategory) => {
    if (category === "Fertilizer") {
      if (subCategory === "Organic") return "bg-green-100 text-green-900 border-green-300";
      if (subCategory === "Non-organic") return "bg-yellow-100 text-yellow-900 border-yellow-300";
    }
    
    if (category === "Crop") {
      if (subCategory === "Field Crop") return "bg-teal-100 text-teal-900 border-teal-300";
      if (subCategory === "Vegetable Crop") return "bg-emerald-100 text-emerald-900 border-emerald-300";
    }
    
    if (category === "Pesticide") {
      if (subCategory === "Herbicides") return "bg-red-100 text-red-900 border-red-300";
      if (subCategory === "Insecticides") return "bg-orange-100 text-orange-900 border-orange-300";
      if (subCategory === "Fungicides") return "bg-purple-100 text-purple-900 border-purple-300";
    }
    
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getSubCategoryEmoji = (category, subCategory) => {
    if (category === "Fertilizer") {
      if (subCategory === "Organic") return "🌱";
      if (subCategory === "Non-organic") return "⚗️";
    }
    
    if (category === "Crop") {
      if (subCategory === "Field Crop") return "🌾";
      if (subCategory === "Vegetable Crop") return "🥦";
    }
    
    if (category === "Pesticide") {
      if (subCategory === "Herbicides") return "🚫";
      if (subCategory === "Insecticides") return "🐛";
      if (subCategory === "Fungicides") return "🍄";
    }
    
    return "";
  };

  if (loading) {
    return (
      <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
        <div className="md:p-10 p-4 space-y-4">
          <h2 className="text-lg font-medium">Orders List</h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
        <div className="md:p-10 p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Orders List</h2>
              <p className="text-gray-600 text-sm mt-1">
                {orders.length} orders found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchOrders}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          
          {orders.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No orders found</p>
              <p className="text-gray-400 text-sm mt-2">New orders will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border transition-all duration-200 bg-white ${
                    !order.isPaid && order.transactionId 
                      ? 'border-yellow-400 bg-yellow-50/30 hover:shadow-md' 
                      : order.isPaid 
                      ? 'border-green-300 hover:shadow-md' 
                      : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <div 
                    onClick={() => handleOrderClick(order)}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Package className={`w-10 h-10 ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`} />
                        {order.isPaid && (
                          <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
                        )}
                        {!order.isPaid && order.transactionId && (
                          <AlertTriangle className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="space-y-2 flex-1">
                        {order.items && order.items.slice(0, 2).map((item, itemIndex) => {
                          const hasSubcategory = ["Crop", "Fertilizer", "Pesticide"].includes(item?.product?.category);
                          
                          return (
                            <div key={itemIndex} className="flex flex-col gap-1">
                              <p className="font-medium text-gray-800 text-sm">
                                {item?.product?.name || 'Unknown Product'} 
                                <span className={`text-green-600 ml-2 ${(!item?.quantity || item.quantity < 2) && "hidden"}`}>
                                  x {item?.quantity || 0}
                                </span>
                              </p>
                              
                              {item?.product?.category && (
                                <div className="flex flex-wrap items-center gap-1">
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(item.product.category)}`}>
                                    <Tag className="inline w-3 h-3 mr-1" />
                                    {item.product.category}
                                  </span>
                                  
                                  {hasSubcategory && item?.product?.subCategory && (
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSubCategoryColor(item.product.category, item.product.subCategory)}`}>
                                      <Layers className="inline w-3 h-3 mr-1" />
                                      {getSubCategoryEmoji(item.product.category, item.product.subCategory)} {item.product.subCategory}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {order.items && order.items.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{order.items.length - 2} more items
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 md:text-center">
                    {order.address ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="text-xs">{order.address.firstname || ''} {order.address.lastname || ''}</span>
                      </div>
                    ) : (
                      <p className='text-red-500 text-xs'>No address</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end md:items-center gap-1">
                    <p className="font-bold text-lg text-gray-800">
                      ₹{order.amount || 0}
                    </p>
                    <div className="flex items-center gap-1">
                      <Hash className="w-3 h-3 text-blue-500" />
                      <span className="text-xs font-medium text-blue-600">
                        {order.transactionId ? 
                          `${order.transactionId.slice(0, 8)}...` : 
                          'No Txn ID'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.isPaid ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3" />
                          Pending
                        </>
                      )}
                    </div>
                    
                    {/* Verify Payment Button - Only show for orders with transaction ID that are not verified */}
                    {order.transactionId && !order.isPaid && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          verifyPayment(order);
                        }}
                        disabled={verifyingOrder === order._id}
                        className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1 ${
                          verifyingOrder === order._id
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {verifyingOrder === order._id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4" />
                            Verify Payment
                          </>
                        )}
                      </button>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(order);
                      }}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
                  <p className="text-sm text-gray-500">Order ID: {selectedOrder._id?.slice(-8) || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Verify Payment Button in Modal */}
                {selectedOrder.transactionId && !selectedOrder.isPaid && (
                  <button
                    onClick={() => verifyPayment(selectedOrder)}
                    disabled={verifyingOrder === selectedOrder._id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
                      verifyingOrder === selectedOrder._id
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {verifyingOrder === selectedOrder._id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Verify Payment
                      </>
                    )}
                  </button>
                )}
                
                <button
                  onClick={() => printInvoice(selectedOrder)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                
                <button 
                  onClick={closeDetailModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="flex flex-wrap items-center justify-between bg-gray-50 p-4 rounded-lg gap-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className={`font-bold flex items-center gap-2 ${selectedOrder.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                    {selectedOrder.isPaid ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Payment Verified
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5" />
                        Payment Pending Verification
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-bold text-gray-800">
                    {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Items</p>
                  <p className="font-bold text-xl text-gray-800">{selectedOrder.items?.length || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-2xl text-gray-800">₹{selectedOrder.amount || 0}</p>
                </div>
              </div>

              {/* Transaction ID Section */}
              <div className={`rounded-lg p-4 ${selectedOrder.isPaid ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-6 h-6 ${selectedOrder.isPaid ? 'text-green-600' : 'text-yellow-600'}`} />
                    <div>
                      <p className={`text-sm font-medium ${selectedOrder.isPaid ? 'text-green-700' : 'text-yellow-700'}`}>
                        Transaction ID
                      </p>
                      <p className="text-lg font-bold font-mono break-all">
                        {selectedOrder.transactionId || 'Not Available'}
                      </p>
                    </div>
                  </div>
                  {selectedOrder.transactionId && (
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(selectedOrder.transactionId);
                        toast.success('Transaction ID copied to clipboard');
                      }}
                      className="text-sm bg-white text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition border"
                    >
                      Copy
                    </button>
                  )}
                </div>
                {!selectedOrder.isPaid && selectedOrder.transactionId && (
                  <div className="mt-3 text-sm text-yellow-700 bg-yellow-100 p-2 rounded">
                    ⚠️ This payment is pending verification. Please verify the transaction ID before processing the order.
                  </div>
                )}
                {selectedOrder.isPaid && (
                  <div className="mt-3 text-sm text-green-700 bg-green-100 p-2 rounded">
                    ✅ Payment verified on {selectedOrder.paymentVerifiedAt ? new Date(selectedOrder.paymentVerifiedAt).toLocaleString() : 'recently'}
                  </div>
                )}
              </div>

              {/* Order Items Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items ({selectedOrder.items?.length || 0})
                </h4>
                
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, index) => {
                      const hasSubcategory = ["Crop", "Fertilizer", "Pesticide"].includes(item?.product?.category);
                      const gstPercentage = item?.product?.gstPercentage || 5;
                      const unitPrice = item?.product?.offerPrice || item?.product?.price || 0;
                      const quantity = item?.quantity || 1;
                      const subtotal = unitPrice * quantity;
                      const gstAmount = (subtotal * gstPercentage) / 100;
                      const itemTotal = subtotal + gstAmount;
                      
                      return (
                        <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                          <div className="p-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-start gap-4 flex-1">
                                <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                  <img 
                                    src={item?.product?.image?.[0] || assets.default_product} 
                                    alt={item?.product?.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="space-y-2 flex-1">
                                  <div>
                                    <p className="font-bold text-gray-800 text-lg">{item?.product?.name || 'Unknown Product'}</p>
                                    <p className="text-sm text-gray-500">
                                      Product ID: {item?.product?._id?.slice(-8) || 'N/A'}
                                    </p>
                                  </div>
                                  
                                  {item?.product?.category && (
                                    <div className="flex flex-wrap items-center gap-2">
                                      <div className="flex items-center gap-1">
                                        <Tag className="w-3 h-3 text-gray-500" />
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.product.category)}`}>
                                          {item.product.category}
                                        </span>
                                      </div>
                                      
                                      {hasSubcategory && item?.product?.subCategory && (
                                        <div className="flex items-center gap-1">
                                          <Layers className="w-3 h-3 text-gray-500" />
                                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSubCategoryColor(item.product.category, item.product.subCategory)}`}>
                                            {getSubCategoryEmoji(item.product.category, item.product.subCategory)} {item.product.subCategory}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  
                                  {item?.product?.weightValue && (
                                    <div className="text-sm text-gray-600">
                                      <span className="font-medium">Weight: </span>
                                      {item.product.weightValue} {item.product.weightUnit}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="text-right space-y-2 min-w-[120px]">
                                <div>
                                  <p className="text-sm text-gray-500">Unit Price</p>
                                  <p className="font-bold text-gray-800">₹{unitPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Quantity</p>
                                  <p className="font-bold text-gray-800">{quantity}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">GST ({gstPercentage}%)</p>
                                  <p className="font-bold text-gray-800">₹{gstAmount.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Item Total</p>
                                  <p className="font-bold text-green-600 text-xl">₹{itemTotal.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-100 px-4 py-3 border-t border-gray-200">
                            <div className="flex flex-wrap items-center justify-between text-sm">
                              <div className="flex items-center gap-4">
                                {item?.product?.category && (
                                  <span className="text-gray-600">
                                    Category: <span className="font-medium">{item.product.category}</span>
                                  </span>
                                )}
                                {item?.product?.subCategory && (
                                  <span className="text-gray-600">
                                    Subcategory: <span className="font-medium">{item.product.subCategory}</span>
                                  </span>
                                )}
                              </div>
                              <div className="text-gray-600">
                                Item Total (incl. GST): <span className="font-bold text-green-700">₹{itemTotal.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Order Summary with GST Breakdown */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h5 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h5>
                      <div className="space-y-3">
                        {(() => {
                          let subtotal = 0;
                          let totalGST = 0;
                          let gstBreakdown = {};
                          
                          selectedOrder.items?.forEach(item => {
                            const gstPercentage = item?.product?.gstPercentage || 5;
                            const unitPrice = item?.product?.offerPrice || item?.product?.price || 0;
                            const quantity = item?.quantity || 1;
                            const itemSubtotal = unitPrice * quantity;
                            const gstAmount = (itemSubtotal * gstPercentage) / 100;
                            
                            subtotal += itemSubtotal;
                            totalGST += gstAmount;
                            
                            if (!gstBreakdown[gstPercentage]) {
                              gstBreakdown[gstPercentage] = 0;
                            }
                            gstBreakdown[gstPercentage] += gstAmount;
                          });
                          
                          const grandTotal = subtotal + totalGST;
                          
                          return (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Subtotal ({selectedOrder.items?.length || 0} items)</span>
                                <span className="font-bold">₹{subtotal.toFixed(2)}</span>
                              </div>
                              
                              <div className="pl-4 border-l-2 border-gray-300">
                                <p className="text-sm font-medium text-gray-600 mb-2">GST Breakdown:</p>
                                {Object.entries(gstBreakdown).map(([percentage, amount]) => (
                                  <div key={percentage} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">{percentage}% GST</span>
                                    <span>₹{amount.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                                <span className="text-gray-600">Total GST</span>
                                <span className="font-bold">₹{totalGST.toFixed(2)}</span>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Shipping Fee</span>
                                <span className="font-bold text-green-600">FREE</span>
                              </div>
                              
                              <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                                <span className="text-xl font-bold text-gray-800">Grand Total</span>
                                <span className="text-2xl font-bold text-green-600">
                                  ₹{grandTotal.toFixed(2)}
                                </span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Package className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <p className="text-yellow-700 font-medium">No items found in this order</p>
                  </div>
                )}
              </div>

              {/* Customer Information */}
              {selectedOrder.address && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-lg">
                        {selectedOrder.address.firstname || ''} {selectedOrder.address.lastname || ''}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium text-lg">{selectedOrder.address.phone || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium">{selectedOrder.address.email || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium capitalize">{selectedOrder.paymentType || 'Not specified'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Shipping Address
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-lg mb-2">{selectedOrder.address.street || ''}</p>
                      <div className="text-gray-600 space-y-1">
                        <p>{selectedOrder.address.city || ''}, {selectedOrder.address.state || ''}</p>
                        <p>Pincode: {selectedOrder.address.zipcode || ''}</p>
                        <p>Country: {selectedOrder.address.country || 'India'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Order;