import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(async () => {
      await login(email, pass);
      nav("/");
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-indigo-100/20 rounded-3xl"></div>
          
          <div className="relative z-10 text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-3xl text-white">🔐</span>
            </div>
            
            <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 font-medium">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors duration-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-400 hover:bg-white/70 shadow-sm hover:shadow-md"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors duration-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-400 hover:bg-white/70 shadow-sm hover:shadow-md"
                  value={pass}
                  onChange={e=>setPass(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors duration-300"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🚀</span>
                    Sign In
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center space-y-4 relative z-10">
            <a href="#" className="text-indigo-600 hover:text-purple-600 font-medium transition-colors duration-300 hover:underline">
              Forgot your password?
            </a>
            
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <span>Don't have an account?</span>
              <a href="#" className="text-indigo-600 hover:text-purple-600 font-bold transition-colors duration-300 hover:underline">
                Sign up
              </a>
            </div>
          </div>

          <div className="mt-8 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl py-3 px-4 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">🔍</span>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">Google</span>
                </div>
              </button>
              
              <button className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl py-3 px-4 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">📘</span>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">Facebook</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
}