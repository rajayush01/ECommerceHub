import { Home, ArrowLeft, Sparkles } from 'lucide-react';


export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="absolute -top-10 -left-10 text-yellow-300 animate-bounce">
          <Sparkles size={24} />
        </div>
        <div className="absolute -top-5 -right-5 text-pink-300 animate-bounce animation-delay-1000">
          <Sparkles size={16} />
        </div>
        <div className="absolute -bottom-5 left-5 text-blue-300 animate-bounce animation-delay-2000">
          <Sparkles size={20} />
        </div>
        
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-4 tracking-tight">
          404
        </h1>
        
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">
            Oops! Page Not Found
          </h2>
          <div className="absolute inset-0 text-3xl md:text-4xl font-bold text-pink-400 opacity-30 animate-pulse">
            Oops! Page Not Found
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          The page you're looking for seems to have vanished into the digital void. 
          <br className="hidden md:block" />
          Let's get you back on track!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center gap-2">
            <Home size={20} />
            Go Home
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
          
          <button className="group border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
        
        <div className="mt-12 animate-bounce">
          <div className="w-6 h-6 mx-auto bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}