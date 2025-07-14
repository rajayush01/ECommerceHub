import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { state } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const count = state.items.reduce((s, i) => s + i.qty, 0);
  const isRestrictedPage =
    location.pathname === "/social-shopping" || location.pathname === "/checkout";

  return (
    <>
      <header className="bg-black/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-pink-600/20"></div>
          <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-20 sm:w-40 h-20 sm:h-40 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto flex items-center justify-between py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6">
          <Link
            to="/"
            className="group flex items-center space-x-1 sm:space-x-2 text-lg sm:text-2xl lg:text-3xl font-black text-white hover:text-purple-300 transition-all duration-300 tracking-tight"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-xl sm:rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="text-sm sm:text-lg md:text-2xl flex items-center font-black">E</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="bg-gradient-to-r text-sm sm:text-lg md:text-2xl from-white to-purple-200 bg-clip-text text-transparent hidden xs:block">
              CommerceHub
            </span>
            <span className="bg-gradient-to-r text-sm md:text-2xl from-white to-purple-200 bg-clip-text text-transparent block xs:hidden">
              CommerceHub
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <Link
              to="/social-shopping"
              className="relative group bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm hover:from-emerald-500/30 hover:to-teal-500/30 px-3 lg:px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-110 border border-emerald-300/20 hover:border-emerald-300/40"
              title="Shop Together"
            >
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">👥</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-white font-semibold text-sm lg:text-base hidden lg:block">Shop Together</span>
                <span className="text-white font-semibold text-sm block lg:hidden">Social</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/cart"
              className="relative group bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm hover:from-indigo-500/30 hover:to-purple-500/30 px-3 lg:px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-110 border border-indigo-300/20 hover:border-indigo-300/40"
              title="Go to Cart Page"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">🛍️</span>
                <span className="text-white font-semibold text-sm lg:text-base hidden lg:block">View Cart</span>
                <span className="text-white font-semibold text-sm block lg:hidden">Cart</span>
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
                <div className="bg-white/10 backdrop-blur-sm px-3 lg:px-4 py-3 rounded-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm lg:text-base font-semibold">
                      Hi, <span className="text-purple-300">{user.email.split('@')[0]}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 lg:px-5 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50 overflow-hidden text-sm lg:text-base"
                >
                  <span className="relative z-10">Logout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                </button>
              </div>
            ) : !isRestrictedPage && (
              <Link
                to="/login"
                className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 lg:px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50 overflow-hidden text-sm lg:text-base"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <Link
              to="/social-shopping"
              className="relative group bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm hover:from-emerald-500/30 hover:to-teal-500/30 p-2 rounded-xl transition-all duration-300 hover:scale-110 border border-emerald-300/20 hover:border-emerald-300/40"
              title="Shop Together"
            >
              <div className="relative">
                <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">👥</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/cart"
              className="relative group bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm hover:from-indigo-500/30 hover:to-purple-500/30 p-2 rounded-xl transition-all duration-300 hover:scale-110 border border-indigo-300/20 hover:border-indigo-300/40"
              title="Go to Cart Page"
            >
              <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">🛍️</span>
              {count > 0 && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs px-1.5 py-0.5 font-bold shadow-lg min-w-[18px] h-4 flex items-center justify-center">
                  {count}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 rounded-xl transition-all duration-300 hover:scale-110 border border-white/10 hover:border-white/20"
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
                <span className={`block w-4 h-0.5 bg-white transition-all duration-300 mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-4 h-0.5 bg-white transition-all duration-300 mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="relative z-10 px-3 sm:px-4 pb-4 space-y-3">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            {user ? (
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-semibold">
                      Hi, <span className="text-purple-300">{user.email.split('@')[0]}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50 overflow-hidden"
                >
                  <span className="relative z-10">Logout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                </button>
              </div>
            ) : !isRestrictedPage && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
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
    </>
  );
}
