// TermsAndConditions.jsx - Aayushman Bhava Natural Living Pvt. Ltd.
import React, { useState } from 'react';
import { 
  CheckCircle, 
  Scale, 
  Shield, 
  FileText, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Leaf,
  Truck,
  Package,
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Heart,
  Sparkles,
  Brain,
  Sun
} from 'lucide-react';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: 'introduction',
      title: 'Who We Are',
      icon: <Heart className="w-5 h-5" />,
      content: `We "Aayushman Bhava Natural Living Pvt. Ltd." want to create something that will inspire you to realize the essence of true self knowledge to elevate the physical, mental and emotional suffering and pains all around us. We are aimed to promote holistic health and attain the balance between mind, body and nature. We believe that community is the key to ultimate growth. So we are committed to serve the society to optimize life by honoring the ancient legacy of authentic wisdom.`
    },
    {
      id: 'contact-info',
      title: 'Contact & Location',
      icon: <MapPin className="w-5 h-5" />,
      content: `📍 OFFICE ADDRESS:
275/2183, Motilal Nagar No.1
Opp. Vibgyor School, S.S. Road
Goregaon West, Mumbai
Maharashtra – 400104

📞 PHONE NUMBERS:
+91 72086 59290
+91 77150 11000

📱 WHATSAPP:
+91 72086 59290

📧 EMAIL:
info@aayushmanbhava.in

🕐 BUSINESS HOURS:
Monday - Saturday: 9:00 AM - 7:00 PM
Sunday: 10:00 AM - 5:00 PM`
    },
    {
      id: 'mission',
      title: 'Our Mission & Vision',
      icon: <Sparkles className="w-5 h-5" />,
      content: `We are dedicated to promoting holistic health and natural living through authentic organic products. Our mission is to bridge ancient wisdom with modern needs, offering products that nurture both body and soul. We strive to create a community that values natural living, self-awareness, and environmental consciousness.`
    },
    {
      id: 'products',
      title: 'Our Organic Products',
      icon: <Leaf className="w-5 h-5" />,
      content: `We offer a range of premium organic products:
• Organic Food & Spices
• Natural Wellness Products
• Herbal Supplements
• Ayurvedic Formulations
• Organic Personal Care
• Natural Home Care Products

All our products are sourced from certified organic farmers and manufacturers who follow strict quality standards.`
    },
    {
      id: 'account',
      title: 'User Accounts',
      icon: <Shield className="w-5 h-5" />,
      content: `• You must be at least 18 years old to create an account
• Provide accurate and complete information
• Maintain confidentiality of your account credentials
• Notify us immediately of any unauthorized access
• You are responsible for all activities under your account
• We reserve the right to refuse service or terminate accounts`
    },
    {
      id: 'ordering',
      title: 'Ordering & Payment',
      icon: <CheckCircle className="w-5 h-5" />,
      content: `1. All prices are in Indian Rupees (INR)
2. Orders are confirmed only after successful payment verification
3. We accept multiple payment methods:
   - UPI (Google Pay, PhonePe, Paytm)
   - Credit/Debit Cards
   - Net Banking
   - Cash on Delivery (select areas)
4. For bulk orders or corporate inquiries, contact us directly
5. Order modifications can be requested within 2 hours of placing order`
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: <Truck className="w-5 h-5" />,
      content: `• We deliver across India through trusted courier partners
• Processing time: 1-3 business days
• Delivery time: 3-7 business days depending on location
• Free shipping on orders above ₹999
• Tracking information shared via email/SMS
• For Mumbai local delivery: Same/Next day delivery available
• International shipping coming soon`
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      icon: <Package className="w-5 h-5" />,
      content: `We want you to be completely satisfied with your purchase.

Accepted for return within 7 days:
• Damaged or defective products
• Incorrect items shipped
• Expired products (if received expired)

Not accepted for return:
• Products that have been opened or used
• Perishable organic items
• Personal care items due to hygiene reasons

Return Process:
1. Contact us at info@aayushmanbhava.in with order details
2. Share photos of damaged/incorrect items
3. Our team will arrange pickup or guide you
4. Refund processed within 7-10 business days`
    },
    {
      id: 'quality',
      title: 'Quality Assurance',
      icon: <Shield className="w-5 h-5" />,
      content: `• All products undergo strict quality checks
• We source from certified organic suppliers
• Products are stored in optimal conditions
• Batch numbers and expiry dates clearly mentioned
• Regular quality audits conducted
• Customer feedback helps us improve continuously`
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: <Shield className="w-5 h-5" />,
      content: `• Your personal information is kept confidential
• We do not share your data with third parties without consent
• Payment information is securely processed
• You can request data deletion at any time
• Marketing communications require your opt-in consent
• For privacy concerns, email info@aayushmanbhava.in`
    },
    {
      id: 'testimonials',
      title: 'Reviews & Feedback',
      icon: <Users className="w-5 h-5" />,
      content: `• We value your honest feedback
• By submitting reviews, you grant us permission to share them
• We may edit for clarity while preserving meaning
• You can request removal of your review anytime
• Fake or misleading reviews will be removed
• Genuine reviews help our community grow`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `• Products are for general wellness and not intended to cure diseases
• Individual results may vary
• Consult healthcare provider before using any new product
• We are not liable for allergic reactions or misuse
• Maximum liability limited to product purchase value
• We are not responsible for delivery delays by courier partners`
    },
    {
      id: 'community',
      title: 'Our Community Commitment',
      icon: <Users className="w-5 h-5" />,
      content: `We believe community is the key to ultimate growth. We are committed to:
• Serving society through holistic wellness
• Honoring ancient wisdom and authentic knowledge
• Promoting sustainable and natural living
• Supporting local organic farmers and artisans
• Educating about natural lifestyle benefits
• Creating a aware and healthy community`
    },
    {
      id: 'governing',
      title: 'Governing Law',
      icon: <Scale className="w-5 h-5" />,
      content: `These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra. We encourage direct communication to resolve any issues amicably before legal proceedings.`
    },
    {
      id: 'updates',
      title: 'Updates to Terms',
      icon: <FileText className="w-5 h-5" />,
      content: `We may update these terms periodically to reflect changes in our services or legal requirements. Continued use of our services after changes constitutes acceptance. Major changes will be notified via email or on our website. Last updated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.`
    }
  ];

  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();
  const isSunday = currentDay === 0;
  
  let isOpen = false;
  if (!isSunday) {
    isOpen = currentHour >= 9 && currentHour < 19;
  } else {
    isOpen = currentHour >= 10 && currentHour < 17;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 mt-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-12 h-12 text-green-600" />
            <Heart className="w-10 h-10 text-emerald-500" />
            <Sparkles className="w-10 h-10 text-amber-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Aayushman Bhava
          </h1>
          <p className="text-green-700 font-medium text-lg mb-2">
            Natural Living Pvt. Ltd.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Promoting holistic health and balance between mind, body, and nature
          </p>
          
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800">
            <Leaf className="w-4 h-4" />
            <span className="font-medium">100% Organic & Natural Products</span>
          </div>

          {/* Business Status */}
          <div className="mt-4 flex justify-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="font-medium">
                {isOpen ? 'Currently Open' : 'Currently Closed'}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <MapPin className="inline w-4 h-4 mr-1" />
              Goregaon West, Mumbai
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <Phone className="inline w-4 h-4 mr-1" />
              +91 72086 59290
            </div>
            <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              <Clock className="inline w-4 h-4 mr-1" />
              Mon-Sat 9AM-7PM
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-green-800 font-medium flex items-center justify-center gap-2">
              <Brain className="w-5 h-5" />
              Honoring ancient wisdom for modern wellness
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Sections */}
          <div className="divide-y divide-gray-100">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className={`p-6 transition-colors ${
                  activeSection === section.id ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-green-600">
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-gray-400">
                    {activeSection === section.id ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>
                
                {activeSection === section.id && (
                  <div className="mt-6 pl-12">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Agreement Acceptance
              </h3>
              <p className="text-gray-600">
                By using Aayushman Bhava Natural Living Pvt. Ltd.'s services and purchasing our organic products, 
                you acknowledge reading and understanding these terms and agree to be bound by them.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
              <input
                type="checkbox"
                id="accept-terms"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <label htmlFor="accept-terms" className="text-gray-700 flex-1">
                <span className="font-bold block mb-1">
                  I have read, understood, and agree to the Terms & Conditions
                </span>
                <span className="text-sm">
                  I acknowledge these terms govern my use of Aayushman Bhava's organic products and services.
                </span>
              </label>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  if (accepted) {
                    alert('Thank you for accepting our Terms & Conditions! Welcome to Aayushman Bhava - Your journey to holistic health begins here 🌿');
                  }
                }}
                disabled={!accepted}
                className={`px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                  accepted
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                {accepted ? 'Accept & Continue' : 'Please Accept Terms'}
              </button>
              
              <button
                onClick={() => window.open('mailto:info@aayushmanbhava.in?subject=Terms%20and%20Conditions%20Query', '_blank')}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Questions
              </button>
              
              <button
                onClick={() => window.open('tel:+917208659290', '_blank')}
                className="px-6 py-3 border border-green-200 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call +91 72086 59290
              </button>
            </div>
          </div>
        </div>

        {/* Contact Details Footer */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-green-600" />
            Connect With Us
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-bold">Address</p>
                  <p className="text-gray-600 text-sm">
                    275/2183, Motilal Nagar No.1<br />
                    Opp. Vibgyor School, S.S. Road<br />
                    Goregaon West, Mumbai<br />
                    Maharashtra – 400104
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-gray-600">+91 72086 59290</p>
                  <p className="text-gray-600">+91 77150 11000</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-gray-600">info@aayushmanbhava.in</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-bold">Business Hours</p>
                  <p className="text-gray-600">Monday - Saturday: 9AM - 7PM</p>
                  <p className="text-gray-600">Sunday: 10AM - 5PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm space-y-2">
          <div className="p-4 bg-green-50 rounded-lg mb-4">
            <p className="text-green-800">
              <Sun className="inline w-5 h-5 mr-2" />
              "Optimize life by honoring the ancient legacy of authentic wisdom"
            </p>
          </div>
          
          <p className="text-gray-600">
            <strong>Aayushman Bhava Natural Living Pvt. Ltd.</strong> • Holistic Health & Organic Living
          </p>
          <p className="text-gray-500 text-xs">
            275/2183, Motilal Nagar No.1, Goregaon West, Mumbai - 400104
          </p>
          <p className="text-gray-400 text-xs pt-2 border-t border-gray-200">
            © {new Date().getFullYear()} Aayushman Bhava Natural Living Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;