// ReturnRefundPolicy.jsx - Aayushman Bhava Natural Living Pvt. Ltd.
import React, { useState } from 'react';
import { 
  RefreshCw, 
  Package, 
  ShieldCheck, 
  AlertTriangle,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  HelpCircle,
  Calendar,
  Leaf,
  Droplets,
  FileText,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  ChevronRight,
  Heart,
  MessageCircle,
  Globe,
  Store,
  Sparkles
} from 'lucide-react';

const ReturnRefundPolicy = () => {
  const [activeTab, setActiveTab] = useState('eligible');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentDay = currentTime.getDay();
  const isSunday = currentDay === 0;
  
  let isOpen = false;
  if (!isSunday) {
    isOpen = currentHour >= 9 && currentHour < 19;
  } else {
    isOpen = currentHour >= 10 && currentHour < 17;
  }

  const eligibleReturns = [
    {
      title: 'Damaged Products',
      description: 'Products damaged during transit',
      examples: ['Broken bottles', 'Leaking containers', 'Damaged packaging'],
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />
    },
    {
      title: 'Wrong Items Delivered',
      description: 'Received different product than ordered',
      examples: ['Wrong product variant', 'Incorrect quantity', 'Different brand'],
      icon: <Package className="w-6 h-6 text-amber-600" />
    },
    {
      title: 'Expired Products',
      description: 'Products past expiry date',
      examples: ['Expired supplements', 'Old stock', 'Near expiry without notice'],
      icon: <Calendar className="w-6 h-6 text-red-600" />
    },
    {
      title: 'Quality Issues',
      description: 'Product quality not as expected',
      examples: ['Unusual smell', 'Color variation', 'Texture issues'],
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
    }
  ];

  const nonEligibleReturns = [
    {
      title: 'Opened/Used Products',
      reason: 'Hygiene and safety concerns',
      icon: <XCircle className="w-6 h-6 text-red-500" />
    },
    {
      title: 'Perishable Items',
      reason: 'Cannot be resold',
      icon: <Leaf className="w-6 h-6 text-red-500" />
    },
    {
      title: 'Sale/Discounted Items',
      reason: 'Final sale no returns',
      icon: <XCircle className="w-6 h-6 text-red-500" />
    },
    {
      title: 'Personal Care Items',
      reason: 'Hygiene products cannot be returned',
      icon: <ShieldCheck className="w-6 h-6 text-red-500" />
    }
  ];

  const returnProcess = [
    {
      step: 1,
      title: 'Contact Us',
      description: 'Email or call with order details',
      timeline: 'Within 48 hours of delivery',
      icon: <Phone className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'Share Photos',
      description: 'Send images of damaged/wrong items',
      timeline: 'Same day',
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'Get Approval',
      description: 'Our team verifies and approves',
      timeline: '1-2 business days',
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      step: 4,
      title: 'Return Items',
      description: 'Ship back or schedule pickup',
      timeline: '3-5 business days',
      icon: <Truck className="w-6 h-6" />
    },
    {
      step: 5,
      title: 'Inspection',
      description: 'Quality check at our facility',
      timeline: '1-2 business days',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 6,
      title: 'Refund',
      description: 'Amount credited to your account',
      timeline: '5-7 business days',
      icon: <IndianRupee className="w-6 h-6" />
    }
  ];

  const refundMethods = [
    {
      method: 'Original Payment Method',
      time: '5-7 business days',
      details: 'Credit back to card/UPI/bank account',
      icon: <RefreshCw className="w-6 h-6 text-green-600" />
    },
    {
      method: 'Store Credit',
      time: 'Immediate',
      details: 'Credit for future purchases',
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />
    },
    {
      method: 'Bank Transfer',
      time: '3-5 business days',
      details: 'NEFT/RTGS to bank account',
      icon: <IndianRupee className="w-6 h-6 text-green-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 mt-20">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Aayushman Bhava</h1>
                  <p className="text-green-700 font-semibold text-lg">Natural Living Pvt. Ltd.</p>
                  <p className="text-gray-600 text-sm">Promoting holistic health & organic living</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Our Location</p>
                    <p className="text-gray-600 text-sm">
                      275/2183, Motilal Nagar No.1<br />
                      Opp. Vibgyor School, S.S. Road<br />
                      Goregaon West, Mumbai - 400104
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Business Hours</p>
                    <p className="text-gray-600 text-sm">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                    <span className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isOpen ? '● Currently Open' : '● Currently Closed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Contact */}
            <div className="lg:w-1/3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600" />
                Quick Connect
              </h3>
              <div className="space-y-3">
                <a href="tel:+917208659290" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow transition-shadow">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Call Us</p>
                    <p className="text-gray-700">+91 72086 59290</p>
                  </div>
                </a>
                <a href="https://wa.me/917208659290" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow transition-shadow">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <p className="text-gray-700">+91 72086 59290</p>
                  </div>
                </a>
                <a href="mailto:info@aayushmanbhava.in" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow transition-shadow">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Email Us</p>
                    <p className="text-gray-700 text-sm">info@aayushmanbhava.in</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Return & Refund Policy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your satisfaction is our priority. We offer easy returns and refunds on eligible products.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Return Window: 7 Days</h3>
              <p className="text-amber-800">
                Please initiate returns within 7 days of delivery. Products must be unused and in original packaging.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b">
            <nav className="flex overflow-x-auto">
              {[
                { id: 'eligible', label: 'Eligible Returns', icon: <CheckCircle className="w-4 h-4" /> },
                { id: 'process', label: 'Return Process', icon: <RefreshCw className="w-4 h-4" /> },
                { id: 'refund', label: 'Refund Methods', icon: <IndianRupee className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-green-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 md:p-8">
            {/* Eligible Returns Tab */}
            {activeTab === 'eligible' && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Eligible for Return</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {eligibleReturns.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Examples:</p>
                          <div className="space-y-2">
                            {item.examples.map((example, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <ChevronRight className="w-4 h-4 text-green-500" />
                                {example}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Not Eligible for Return</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {nonEligibleReturns.map((item, index) => (
                      <div key={index} className="border border-red-100 bg-red-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          {item.icon}
                          <h4 className="font-bold text-gray-800">{item.title}</h4>
                        </div>
                        <p className="text-gray-600 text-xs">Reason: {item.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Return Process Tab */}
            {activeTab === 'process' && (
              <div className="space-y-8">
                <div className="relative">
                  <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 to-emerald-200"></div>
                  <div className="space-y-8">
                    {returnProcess.map((step) => (
                      <div key={step.step} className="relative flex items-start gap-6">
                        <div className="relative flex-shrink-0 w-16 h-16">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full opacity-10"></div>
                          <div className="relative w-16 h-16 bg-white border-4 border-white rounded-full flex items-center justify-center shadow-md">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                              {step.step}
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gray-50 rounded-lg">
                              {step.icon}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                          </div>
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          <div className="inline-flex items-center gap-2 text-sm text-green-700 font-medium bg-green-50 px-3 py-1.5 rounded-lg">
                            <Clock className="w-4 h-4" />
                            {step.timeline}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Refund Methods Tab */}
            {activeTab === 'refund' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {refundMethods.map((method, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-50 rounded-lg">
                          {method.icon}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">{method.method}</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Processing:</span>
                          <span className="font-bold text-green-700">{method.time}</span>
                        </div>
                        <p className="text-sm text-gray-500">{method.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-green-600" />
            Need Help? Contact Us
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-6 h-6 text-green-600" />
                <h4 className="text-lg font-bold text-gray-800">Call / WhatsApp</h4>
              </div>
              <a href="tel:+917208659290" className="text-xl font-bold text-green-700 block mb-2">
                +91 72086 59290
              </a>
              <p className="text-gray-500 text-sm">Also available on WhatsApp</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
                <h4 className="text-lg font-bold text-gray-800">Email Us</h4>
              </div>
              <a href="mailto:info@aayushmanbhava.in" className="text-lg font-bold text-blue-700 block break-all">
                info@aayushmanbhava.in
              </a>
              <p className="text-gray-500 text-sm mt-2">We respond within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-green-300"></div>
            <Leaf className="w-5 h-5 text-green-500" />
            <div className="w-8 h-0.5 bg-green-300"></div>
          </div>
          <p className="mb-2">
            <strong>Aayushman Bhava Natural Living Pvt. Ltd.</strong> • 
            Last Updated: {new Date().toLocaleDateString('en-IN')}
          </p>
          <p className="text-xs">
            275/2183, Motilal Nagar No.1, Opp. Vibgyor School, Goregaon West, Mumbai - 400104
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;