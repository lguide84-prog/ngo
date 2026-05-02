// Footer.jsx - Aayushman Bhava Natural Living Pvt. Ltd.
import React from 'react'
import { footerLinks } from '../assets/assets'

function Footer() {
  // Social media data with icons (using Font Awesome classes)
  const socialMedia = [
    {
      name: "Instagram",
      url: "#",
      icon: "fab fa-instagram",
      color: "hover:bg-pink-500 hover:text-white"
    },
    {
      name: "Facebook",
      url: "#",
      icon: "fab fa-facebook-f",
      color: "hover:bg-blue-600 hover:text-white"
    },
    {
      name: "YouTube",
      url: "#",
      icon: "fab fa-youtube",
      color: "hover:bg-red-600 hover:text-white"
    }
  ]

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2">
            <img className="w-45 h-12 lg:h-12 lg:w-65" src="/image.png" alt="Aayushman Bhava Logo" />
           
          </div>
          <p className="max-w-[410px] mt-4 text-sm">
            Promoting holistic health and balance between mind, body, and nature. 
            We offer premium quality organic products for a healthy lifestyle, honoring 
            the ancient legacy of authentic wisdom.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              
              {/* Check if this is the "Follow Us" section */}
              {section.title === "Follow Us" ? (
                <div className="flex gap-4 mt-2">
                  {socialMedia.map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                                text-gray-600 transition-all duration-300 ${social.color}
                                border border-gray-300 hover:border-transparent`}
                      aria-label={`Follow us on ${social.name}`}
                      title={social.name}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              ) : (
                // Render regular links for other sections
                <ul className="text-sm space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} className="hover:text-green-600 transition-colors">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className='flex flex-col md:flex-row justify-between items-center py-6 gap-3'>
        <p className="text-center text-sm text-gray-500">
          Copyright 2025 ©{" "}
          <a href="#" className="hover:text-green-600 transition-colors">
            Aayushman Bhava
          </a>{" "}
          All Rights Reserved.
        </p>
        
    
        
        <p className="text-center text-xs text-gray-400">
          Designed & Developed By{" "}
          <a 
            href="https://www.digitalexpressindia.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors"
          >
            DigitalExpressIndia
          </a>
        </p>
      </div>
      
      {/* Address Line */}
      <div className="text-center py-4 border-t border-gray-200 text-xs text-gray-400">
        275/2183, Motilal Nagar No.1, Opp. Vibgyor School, S.S. Road, Goregaon West, Mumbai, Maharashtra – 400104
      </div>
    </div>
  )
}

export default Footer