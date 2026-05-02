// PrivacyPolicy.jsx - Aayushman Bhava Natural Living Pvt. Ltd.
import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Trash2,
  Edit,
  Server,
  Globe,
  Smartphone,
  CreditCard,
  Calendar,
  Leaf,
  MessageSquare,
  History,
  Clock,
  Heart,
  Sparkles,
  Store
} from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [showConsentOptions, setShowConsentOptions] = useState(false);
  const [consentPreferences, setConsentPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: true
  });

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const updateConsent = (key, value) => {
    setConsentPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const companyInfo = {
    name: 'Aayushman Bhava Natural Living Pvt. Ltd.',
    tagline: 'Promoting holistic health and balance between mind, body, and nature',
    contact: {
      phone: '+91 72086 59290',
      phone2: '+91 77150 11000',
      whatsapp: '+91 72086 59290',
      email: 'info@aayushmanbhava.in',
      website: 'aayushmanbhava.in'
    },
    location: {
      address: '275/2183, Motilal Nagar No.1, Opp. Vibgyor School, S.S. Road, Goregaon West, Mumbai, Maharashtra – 400104',
      landmark: 'Opposite Vibgyor School',
      googleMaps: 'https://maps.google.com/?q=275/2183+Motilal+Nagar+No.1+Opp.+Vibgyor+School+Goregaon+West+Mumbai'
    },
    hours: {
      weekdays: 'Monday - Saturday: 9:00 AM - 7:00 PM',
      sunday: 'Sunday: 10:00 AM - 5:00 PM'
    }
  };

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

  const dataCategories = [
    {
      category: 'Personal Information',
      icon: <User className="w-5 h-5" />,
      examples: [
        'Full name and date of birth',
        'Contact details (phone, email)',
        'Delivery address',
        'Payment information'
      ],
      purpose: 'Account creation, order processing, customer support'
    },
    {
      category: 'Health & Wellness Data',
      icon: <Heart className="w-5 h-5" />,
      examples: [
        'Product preferences',
        'Health goals and interests',
        'Allergy information (with consent)',
        'Wellness journey data'
      ],
      purpose: 'Personalized product recommendations, wellness guidance'
    },
    {
      category: 'Transaction Data',
      icon: <CreditCard className="w-5 h-5" />,
      examples: [
        'Purchase history',
        'Payment methods and details',
        'Order values and frequencies',
        'Return/refund records'
      ],
      purpose: 'Billing, financial records, service improvement'
    },
    {
      category: 'Technical Data',
      icon: <Smartphone className="w-5 h-5" />,
      examples: [
        'IP address, device information',
        'Browser type and version',
        'Website usage patterns',
        'Location data (with consent)'
      ],
      purpose: 'Security, analytics, website optimization'
    },
    {
      category: 'Communication Data',
      icon: <MessageSquare className="w-5 h-5" />,
      examples: [
        'Customer support queries',
        'Feedback and reviews',
        'Survey responses',
        'Newsletter engagement'
      ],
      purpose: 'Customer service, quality improvement'
    }
  ];

  const dataUsagePurposes = [
    {
      purpose: 'Service Delivery',
      description: 'Processing orders, deliveries, and payments',
      legalBasis: 'Contractual necessity',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />
    },
    {
      purpose: 'Personalization',
      description: 'Customized product recommendations',
      legalBasis: 'Legitimate interest',
      icon: <Sparkles className="w-5 h-5 text-green-600" />
    },
    {
      purpose: 'Analytics & Research',
      description: 'Improving products and understanding customer needs',
      legalBasis: 'Legitimate interest',
      icon: <Database className="w-5 h-5 text-green-600" />
    },
    {
      purpose: 'Marketing Communications',
      description: 'Offers, new products, wellness tips',
      legalBasis: 'Consent (opt-in required)',
      icon: <Mail className="w-5 h-5 text-green-600" />
    },
    {
      purpose: 'Legal Compliance',
      description: 'Tax records, regulatory requirements',
      legalBasis: 'Legal obligation',
      icon: <FileText className="w-5 h-5 text-green-600" />
    }
  ];

  const userRights = [
    {
      right: 'Right to Access',
      description: 'Request copy of your personal data',
      icon: <Eye className="w-5 h-5" />,
      action: 'Download Data Report'
    },
    {
      right: 'Right to Rectification',
      description: 'Correct inaccurate or incomplete data',
      icon: <Edit className="w-5 h-5" />,
      action: 'Update Information'
    },
    {
      right: 'Right to Erasure',
      description: 'Request deletion of personal data',
      icon: <Trash2 className="w-5 h-5" />,
      action: 'Request Deletion'
    },
    {
      right: 'Right to Restrict Processing',
      description: 'Limit how we use your data',
      icon: <Lock className="w-5 h-5" />,
      action: 'Manage Preferences'
    },
    {
      right: 'Right to Data Portability',
      description: 'Receive your data in usable format',
      icon: <Download className="w-5 h-5" />,
      action: 'Export Data'
    },
    {
      right: 'Right to Object',
      description: 'Object to certain data processing',
      icon: <XCircle className="w-5 h-5" />,
      action: 'Opt-Out Options'
    }
  ];

  const securityMeasures = [
    {
      measure: 'Encryption',
      description: 'All sensitive data encrypted in transit and at rest',
      icon: <Lock className="w-5 h-5" />
    },
    {
      measure: 'Access Controls',
      description: 'Role-based access to customer data',
      icon: <Shield className="w-5 h-5" />
    },
    {
      measure: 'Regular Audits',
      description: 'Quarterly security assessments',
      icon: <Server className="w-5 h-5" />
    },
    {
      measure: 'Secure Payments',
      description: 'PCI compliant payment processing',
      icon: <CreditCard className="w-5 h-5" />
    }
  ];

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction & Scope',
      icon: <FileText className="w-5 h-5" />,
      content: `This Privacy Policy explains how ${companyInfo.name} ("we," "us," or "our") collects, uses, discloses, and protects your personal information when you use our website, mobile application, and related services.

We are committed to protecting your privacy and ensuring transparency in our data practices. This policy applies to all customers, website visitors, and users of Aayushman Bhava services.

${companyInfo.tagline}`
    },
    {
      id: 'data-collection',
      title: 'Data We Collect',
      icon: <Database className="w-5 h-5" />,
      content: `We collect various types of information to provide and improve our organic products and services:

1. Information You Provide:
   - Registration details (name, email, phone)
   - Order information and delivery address
   - Payment details
   - Communication with customer support
   - Feedback and reviews

2. Automatically Collected:
   - Device and browser information
   - Usage patterns and preferences
   - Location data (with consent)
   - IP addresses and log data`
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Data',
      icon: <CheckCircle className="w-5 h-5" />,
      content: `Your data helps us:
• Process orders and arrange deliveries
• Provide personalized product recommendations
• Improve our product offerings
• Send relevant wellness updates (with consent)
• Prevent fraud and ensure security
• Conduct research to serve you better
• Comply with legal obligations`
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing & Disclosure',
      icon: <Globe className="w-5 h-5" />,
      content: `We may share your information with:
• Payment processors for transaction completion
• Delivery partners for product transportation
• Analytics providers for service improvement
• Marketing partners (only with explicit consent)

We never sell your personal data to third parties. All partners are bound by strict confidentiality agreements.`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Shield className="w-5 h-5" />,
      content: `We implement industry-standard security measures:
• SSL encryption for all data transfers
• Secure servers with firewalls
• Regular security audits
• Employee data protection training

Despite our efforts, no system is 100% secure. We encourage you to use strong passwords and report any suspicious activity.`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: <History className="w-5 h-5" />,
      content: `We retain personal data only as long as necessary:
• Account data: 7 years after last activity
• Transaction records: 7 years for tax purposes
• Communication records: 3 years
• Marketing preferences: Until consent withdrawn

After retention periods expire, data is securely deleted or anonymized.`
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      icon: <User className="w-5 h-5" />,
      content: `As a user, you have rights under applicable laws:
1. Access your personal data
2. Correct inaccurate information
3. Delete your data (subject to legal requirements)
4. Restrict or object to processing
5. Data portability
6. Withdraw consent for marketing

To exercise these rights, contact us at ${companyInfo.contact.email}`
    },
    {
      id: 'children',
      title: "Children's Privacy",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `Our services are not intended for individuals under 18 years of age. We do not knowingly collect data from children. If you believe a child has provided us with personal data, please contact us immediately for removal.`
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      icon: <Globe className="w-5 h-5" />,
      content: `We use cookies to enhance your browsing experience. Cookies help us:
• Remember your preferences
• Understand how you use our website
• Improve site functionality

You can control cookie settings through your browser preferences.`
    },
    {
      id: 'changes',
      title: 'Policy Updates',
      icon: <Calendar className="w-5 h-5" />,
      content: `We may update this policy periodically. Significant changes will be:
• Notified via email
• Highlighted on our website
• Accompanied by a notice period

Continued use after changes constitutes acceptance. Last updated: ${new Date().toLocaleDateString('en-IN')}.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <Phone className="w-5 h-5" />,
      content: `For privacy-related inquiries:
Email: ${companyInfo.contact.email}
Phone: ${companyInfo.contact.phone}
Address: ${companyInfo.location.address}

Response time: Within 30 days for formal requests.`
    }
  ];

  const handleConsentUpdate = () => {
    alert('Your privacy preferences have been updated successfully!');
    setShowConsentOptions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  from-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 mt-20">
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-green-100 rounded-2xl">
              <Leaf className="w-12 h-12 text-green-700" />
              <Heart className="w-10 h-10 text-emerald-600 -mt-8 ml-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Aayushman Bhava</h1>
              <p className="text-green-700 font-semibold">Natural Living Pvt. Ltd.</p>
              <p className="text-gray-600 text-sm mt-1">Promoting holistic health & organic living</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Privacy Policy
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-3xl mx-auto">
            <p className="text-green-800 font-medium flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              We are committed to protecting your personal information
            </p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-green-200">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Our Location</h3>
              </div>
              <p className="text-gray-600 text-sm">
                275/2183, Motilal Nagar No.1<br />
                Opp. Vibgyor School, S.S. Road<br />
                Goregaon West, Mumbai<br />
                Maharashtra – 400104
              </p>
              <p className="text-gray-500 text-xs">Landmark: Opposite Vibgyor School</p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-gray-800">Call Us</h4>
                </div>
                <a href="tel:+917208659290" className="text-gray-700 block">+91 72086 59290</a>
                <a href="tel:+917715011000" className="text-gray-700">+91 77150 11000</a>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-gray-800">Email Us</h4>
                </div>
                <a href="mailto:info@aayushmanbhava.in" className="text-gray-700 break-all">info@aayushmanbhava.in</a>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-gray-800">Business Hours</h4>
                </div>
                <p className="text-gray-600 text-sm">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p className="text-gray-600 text-sm">Sunday: 10:00 AM - 5:00 PM</p>
                <span className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isOpen ? '● Currently Open' : '● Currently Closed'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Consent Management */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-green-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Manage Your Privacy Preferences</h3>
                <p className="text-gray-600 text-sm">Control how we use your data for marketing and personalization</p>
              </div>
            </div>
            <button
              onClick={() => setShowConsentOptions(!showConsentOptions)}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              {showConsentOptions ? 'Hide Options' : 'Manage Consent'}
            </button>
          </div>

          {showConsentOptions && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Your Consent Preferences</h4>
              <div className="space-y-4">
                {Object.entries(consentPreferences).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-3">
                    <div className="flex items-center gap-3">
                      {key === 'essential' && <Lock className="w-5 h-5 text-blue-600" />}
                      {key === 'analytics' && <Database className="w-5 h-5 text-purple-600" />}
                      {key === 'marketing' && <Mail className="w-5 h-5 text-orange-600" />}
                      {key === 'personalization' && <Sparkles className="w-5 h-5 text-green-600" />}
                      <div>
                        <span className="font-medium text-gray-800 capitalize">{key}</span>
                        <p className="text-sm text-gray-500">
                          {key === 'essential' && 'Required for service operation'}
                          {key === 'analytics' && 'Helps us improve our services'}
                          {key === 'marketing' && 'Receive offers and updates'}
                          {key === 'personalization' && 'Personalized recommendations'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {key !== 'essential' && (
                        <>
                          <button
                            onClick={() => updateConsent(key, false)}
                            className={`px-3 py-1 rounded text-sm ${!value ? 'bg-red-100 text-red-700 font-bold' : 'bg-gray-200 text-gray-700'}`}
                          >
                            Opt-Out
                          </button>
                          <button
                            onClick={() => updateConsent(key, true)}
                            className={`px-3 py-1 rounded text-sm ${value ? 'bg-green-100 text-green-700 font-bold' : 'bg-gray-200 text-gray-700'}`}
                          >
                            Opt-In
                          </button>
                        </>
                      )}
                      {key === 'essential' && (
                        <span className="text-sm text-gray-500">Required</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleConsentUpdate}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Data Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data We Collect
              </h3>
              <div className="space-y-4">
                {dataCategories.map((cat, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {cat.icon}
                      <h4 className="font-bold text-gray-800">{cat.category}</h4>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {cat.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-500">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs bg-blue-50 text-blue-700 p-2 rounded">
                      <span className="font-semibold">Purpose:</span> {cat.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Sections */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Privacy Policy Sections</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`flex items-center gap-2 p-2 text-left rounded-lg text-sm transition-colors ${activeSection === section.id
                          ? 'bg-green-100 border border-green-300 text-green-700'
                          : 'hover:bg-gray-100'
                        }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-700">{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {sections.map((section) => (
                  <div key={section.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-green-600">{section.icon}</div>
                        <h3 className="font-bold text-gray-900">{section.title}</h3>
                      </div>
                      {activeSection === section.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {activeSection === section.id && (
                      <div className="mt-4 pl-8">
                        <div className="whitespace-pre-line text-gray-700 text-sm leading-relaxed">
                          {section.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* User Rights */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Your Rights
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {userRights.map((right, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {right.icon}
                      <h4 className="font-bold text-gray-800">{right.right}</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{right.description}</p>
                    <button className="text-green-600 text-sm font-medium hover:text-green-700">
                      {right.action} →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Measures */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Measures
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {securityMeasures.map((measure, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {measure.icon}
                      <h4 className="font-bold text-gray-800">{measure.measure}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{measure.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t text-gray-500 text-sm">
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

export default PrivacyPolicy;