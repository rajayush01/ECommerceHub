import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #ec4899 0%, transparent 50%)`,
          backgroundSize: '100px 100px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center flex flex-col gap-2 md:text-left">
            <Link 
            to="/" 
            className="group flex items-center space-x-2 text-3xl font-black text-white hover:text-purple-300 transition-all duration-300 tracking-tight"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="text-2xl flex items-center font-black">E</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              CommerceHub
            </span>
          </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover the latest trends and timeless styles. 
              Your fashion journey starts here.
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <nav className="space-y-2">
              {['About Us', 'Collections', 'Contact', 'Size Guide'].map((link) => (
                <a 
                  key={link}
                  href="/" 
                  className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Follow Us</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {[
                { icon: Instagram, color: 'hover:text-pink-400' },
                { icon: Twitter, color: 'hover:text-blue-400' },
                { icon: Facebook, color: 'hover:text-blue-500' },
                { icon: Mail, color: 'hover:text-purple-400' }
              ].map(({ icon: Icon, color }, index) => (
                <button 
                  key={index}
                  className={`p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${color}`}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-1 mb-4 md:mb-0">
            <span>&copy; 2025 ECommerceHub. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={14} className="text-red-400 animate-pulse mx-1" />
            <span>for fashion lovers</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse"></div>
    </footer>
  );
}