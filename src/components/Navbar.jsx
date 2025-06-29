import { Link } from "react-router-dom";
// import CartSlide from "./CartSlide";
import { useCart } from "../contexts/CartContext.jsx";
// import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  // const [open, setOpen] = useState(false);
  const { state } = useCart();
  const count = state.items.reduce((s,i)=>s+i.qty, 0);
  
  return (
    <>
      <header className="bg-black/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-pink-600/20"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto flex items-center justify-between py-4 px-6">
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

          <div className="flex items-center space-x-4">
            {/* <button 
              onClick={()=>setOpen(!open)} 
              className="relative group bg-white/5 backdrop-blur-sm hover:bg-white/10 p-4 rounded-2xl transition-all duration-300 hover:scale-110 border border-white/10 hover:border-white/20"
              title="Quick Cart View"
            >
              <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">🛒</span>
              
              {count > 0 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs px-3 py-1 font-bold shadow-lg animate-pulse min-w-[24px] h-6 flex items-center justify-center">
                  {count}
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button> */}

            <Link
              to="/cart"
              className="relative group bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm hover:from-indigo-500/30 hover:to-purple-500/30 p-4 rounded-2xl transition-all duration-300 hover:scale-110 border border-indigo-300/20 hover:border-indigo-300/40"
              title="Go to Cart Page"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl transform group-hover:scale-110 transition-transform duration-300">🛍️</span>
                <span className="hidden sm:block text-white font-semibold text-sm">View Cart</span>
              </div>
              
              {count > 0 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs px-2 py-1 font-bold shadow-lg min-w-[20px] h-5 flex items-center justify-center">
                  {count}
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold">
                      Hi, <span className="text-purple-300">{user.email.split('@')[0]}</span>
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={logout} 
                  className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50 overflow-hidden"
                >
                  <span className="relative z-10">Logout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </Link>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
      </header>
      
      {/* {open && <CartSlide />} */}
    </>
  );
}
