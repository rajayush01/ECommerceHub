import data from "../assets/data.json";
import { Link } from "react-router-dom";

export default function Home() {
  const categoryIcons = {
    "electronics": "📱",
    "clothing": "👕",
    "books": "📚",
    "home": "🏠",
    "sports": "⚽",
    "beauty": "💄",
    "toys": "🧸",
    "automotive": "🚗",
    "bottoms": "👖",
    "one-piece": "👗",
    "footwear": "👟",
    "eyewear": "🕶️",
    "jewelry": "💍",
    "miscellaneous": "🛍️",
    "dairy": "🥛",
    "fruits": "🍎",
    "vegetables": "🥦",
    "meat": "🍖",
    "oil": "🛢️",
    "accessories": "🧢",
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-pink-900/40"></div>
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>
        
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%',
          animation: 'float 15s ease-in-out infinite'
        }}></div>
        
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
      `}</style>

      <div className="relative z-10 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping delay-1000"></div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-8 leading-none relative">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Shop by
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent relative">
              Category
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 animate-pulse"></div>
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary products across all categories with 
            <span className="text-purple-300 font-semibold"> unbeatable prices </span>
            and 
            <span className="text-pink-300 font-semibold"> premium quality</span>
          </p>
          
          <div className="flex justify-center space-x-6 mb-16">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce shadow-lg"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full animate-bounce delay-100 shadow-lg"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce delay-200 shadow-lg"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.keys(data).map((category, index) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="group relative overflow-hidden transform transition-all duration-700 hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 text-center transition-all duration-700 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-purple-500/25">
                
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                
                <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out"></div>
                
                <div className="relative mb-8">
                  <div className="text-7xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                    {categoryIcons[category.toLowerCase()] || "🛍️"}
                  </div>
                  
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                    animation: 'glow 2s ease-in-out infinite alternate'
                  }}></div>
                </div>
                
                <h2 className="relative text-2xl font-bold text-white mb-3 capitalize group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                  {category}
                </h2>
                
                <p className="relative text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  Explore premium {category}
                </p>
                
                <div className="relative opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                    Shop Now
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-500 animate-pulse"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative z-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-indigo-900/40 to-pink-900/30 backdrop-blur-sm"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Why Choose 
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Us?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
            Experience the difference with our premium services
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🚚", title: "Free Shipping", desc: "Complimentary delivery on orders over $50", gradient: "from-purple-500 to-indigo-500" },
              { icon: "🔒", title: "Secure Payment", desc: "Bank-level security for all transactions", gradient: "from-indigo-500 to-pink-500" },
              { icon: "↩️", title: "Easy Returns", desc: "Hassle-free 30-day return guarantee", gradient: "from-pink-500 to-purple-500" }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-white transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105">
                  
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.desc}
                  </p>
                  
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: `linear-gradient(45deg, ${feature.gradient.includes('purple') ? 'rgba(168, 85, 247, 0.1)' : 'rgba(236, 72, 153, 0.1)'} 0%, transparent 100%)`
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
