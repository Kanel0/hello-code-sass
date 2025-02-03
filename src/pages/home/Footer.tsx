import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaApple, FaGooglePlay } from 'react-icons/fa';
import "../../components/fonts/font.css"
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-[Klapt] md:text-xl font-bold mb-4">Hello</h3>
            <p className="text-gray-300 text-sm mb-4">
             ERP Hello - Smart Management at Your Fingertips<br />
              Simplify, Innovate, Prosper
            </p>
            <div className="flex flex-col sm:flex-row mb-6 gap-2">
              <input
                type="email"
                placeholder="Newsletter..."
                className="bg-[#373951] text-sm px-4 py-2 rounded-md sm:rounded-r-none w-full sm:w-64"
              />
              <button className="bg-blue-800 font-[Klapt] hover:bg-purple-700 px-4 py-2 rounded-md sm:rounded-l-none text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Menu Section */}
          <div className="space-y-2 ml-8">
            <h4 className="text-base font-[Klapt] md:text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {["Home", "Pricing", "Blog", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white no-underline transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div className="space-y-2">
            <h4 className="text-base font-[Klapt] md:text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {["Hello ERP/CRM", "Documentation", "Video Tutorials", "Service Status", "Your Client Space"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white no-underline transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Section */}
          <div className="space-y-2">
            <h4 className="text-base font-[Klapt] md:text-lg font-semibold mb-4">Download Our App</h4>
            <div className="flex flex-col space-y-3">
              {[
                { icon: <FaApple className="text-2xl" />, text: "Download on the\nApp Store" },
                { icon: <FaGooglePlay className="text-2xl" />, text: "Download on the\nGoogle Play" }
              ].map((store, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex no-underline items-center space-x-3 text-sm text-gray-300 hover:text-white transition-colors duration-200 bg-[#373951] p-3 rounded-lg"
                >
                  {store.icon}
                  <span className="whitespace-pre-line">{store.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 md:pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} ERP Hello
          </div>
          <div className="flex space-x-6">
            {[
              { icon: FaFacebook, link: "https://www.facebook.com/profile.php?id=61567547651433" },
              { icon: FaTwitter, link: "https://www.twitter.com" },
              { icon: FaLinkedin, link: "https://www.linkedin.com" },
              { icon: FaInstagram, link: "https://www.instagram.com/hellocode004?igsh=bGk1aDM0c3Nzc2tk" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="no-underline text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={`Social media link ${index + 1}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="text-xl hover:scale-110 transition-transform duration-200" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
