import { useParams, Link } from "react-router-dom";
import data from "../assets/data.json";

export default function Category() {
  const { mainCategory } = useParams();
  const subcategories = data[mainCategory];

  if (!subcategories) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-orange-900/30 to-pink-900/40"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="text-8xl mb-6 animate-bounce">😵</div>
          <h2 className="text-4xl font-black text-white mb-4">Category not found</h2>
          <p className="text-gray-300 mb-8 text-lg">The category you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-pink-900/40"></div>

        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
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
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <nav className="flex justify-center mb-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10">
              <Link
                to="/"
                className="text-purple-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <span className="mx-4 text-gray-500">/</span>
              <span className="text-white font-semibold capitalize">{mainCategory}</span>
            </div>
          </nav>

          <h1 className="text-6xl md:text-7xl font-black mb-6 capitalize leading-none">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {mainCategory}
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore our curated collection of
            <span className="text-purple-300 font-semibold"> premium {mainCategory} </span>
            subcategories
          </p>

          <div className="flex justify-center space-x-6">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce shadow-lg"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full animate-bounce delay-100 shadow-lg"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce delay-200 shadow-lg"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.keys(subcategories).map((sub, index) => (
            <Link
              key={sub}
              to={`/category/${mainCategory}/${sub}`}
              className="group relative overflow-hidden transform transition-all duration-700 hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 text-center transition-all duration-700 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-purple-500/25">

                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>

                <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out"></div>

                <div className="relative z-10">
                  <div className="relative mb-8">
                    <div className="text-7xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                      {sub.toLowerCase().includes('t-shirt') || sub.toLowerCase().includes('tshirt') ? '👕' :
                        sub.toLowerCase().includes('shirt') && sub.toLowerCase().includes('formal') ? '👔' :
                          sub.toLowerCase().includes('shirt') && sub.toLowerCase().includes('casual') ? '👕' :
                            sub.toLowerCase().includes('dress shirt') ? '👔' :
                              sub.toLowerCase().includes('jacket') || sub.toLowerCase().includes('denim') || sub.toLowerCase().includes('bomber') ? '🧥' :
                                sub.toLowerCase().includes('hoodie') || sub.toLowerCase().includes('sweatshirt') ? '👘' :
                                  sub.toLowerCase().includes('jean') || sub.toLowerCase().includes('denim') && sub.toLowerCase().includes('pant') ? '👖' :
                                    sub.toLowerCase().includes('short') && !sub.toLowerCase().includes('shirt') ? '🩳' :
                                      sub.toLowerCase().includes('skirt') || sub.toLowerCase().includes('mini') || sub.toLowerCase().includes('midi') || sub.toLowerCase().includes('maxi') ? '👗' :
                                        sub.toLowerCase().includes('dress') ? '👗' :
                                          sub.toLowerCase().includes('jumpsuit') || sub.toLowerCase().includes('romper') || sub.toLowerCase().includes('overall') ? '👘' :
                                            sub.toLowerCase().includes('sneaker') || sub.toLowerCase().includes('running') ? '👟' :
                                              sub.toLowerCase().includes('formal') && sub.toLowerCase().includes('shoe') ? '👞' :
                                                sub.toLowerCase().includes('oxford') || sub.toLowerCase().includes('derby') ? '👞' :
                                                  sub.toLowerCase().includes('sandal') || sub.toLowerCase().includes('floater') ? '👡' :
                                                    sub.toLowerCase().includes('heel') || sub.toLowerCase().includes('pump') || sub.toLowerCase().includes('stiletto') || sub.toLowerCase().includes('wedge') ? '👠' :
                                                      sub.toLowerCase().includes('sunglass') ? '🕶️' :
                                                        sub.toLowerCase().includes('prescription') && sub.toLowerCase().includes('glass') ? '👓' :
                                                          sub.toLowerCase().includes('blue light') && sub.toLowerCase().includes('glass') ? '👓' :
                                                            sub.toLowerCase().includes('necklace') ? '📿' :
                                                              sub.toLowerCase().includes('earring') ? '👂' :
                                                                sub.toLowerCase().includes('watch') ? '⌚' :
                                                                  sub.toLowerCase().includes('bag') || sub.toLowerCase().includes('tote') || sub.toLowerCase().includes('handbag') || sub.toLowerCase().includes('purse') ? '👜' :
                                                                    sub.toLowerCase().includes('hat') || sub.toLowerCase().includes('cap') || sub.toLowerCase().includes('baseball') ? '🧢' :
                                                                      sub.toLowerCase().includes('clothing') ? '👕' :
                                                                        sub.toLowerCase().includes('bottom') ? '👖' :
                                                                          sub.toLowerCase().includes('one-piece') ? '👗' :
                                                                            sub.toLowerCase().includes('footwear') ? '👟' :
                                                                              sub.toLowerCase().includes('eyewear') ? '👓' :
                                                                                sub.toLowerCase().includes('jewelry') ? '💎' :
                                                                                  sub.toLowerCase().includes('misc') ? '👜' :
                                                                                    '🛍️'}
                    </div>

                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                      animation: 'glow 2s ease-in-out infinite alternate'
                    }}></div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 capitalize group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                    {sub}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {subcategories[sub] ? `${Object.keys(subcategories[sub]).length} products available` : 'Premium collection'}
                  </p>

                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                      Browse Products
                      <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-500 animate-pulse"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}