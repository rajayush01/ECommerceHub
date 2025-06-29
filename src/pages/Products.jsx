import { useParams, Link } from "react-router-dom";
import data from "../assets/data.json";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

export default function Products() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const { mainCategory, subCategory } = useParams();
  const items = data?.[mainCategory]?.[subCategory] || [];
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");

  const filtered = items.filter(item => {
    const price = parseFloat(item.price?.replace('$','')) || 0;
    return item.title.toLowerCase().includes(search.toLowerCase()) &&
           price >= priceRange.min &&
           price <= priceRange.max &&
           parseFloat(item.rating) >= minRating;
  });

  const sortedFiltered = [...filtered].sort((a, b) => {
    const priceA = parseFloat(a.price?.replace('$','')) || 0;
    const priceB = parseFloat(b.price?.replace('$','')) || 0;
    const ratingA = parseFloat(a.rating) || 0;
    const ratingB = parseFloat(b.rating) || 0;

    switch (sortBy) {
      case 'price-low': return priceA - priceB;
      case 'price-high': return priceB - priceA;
      case 'rating': return ratingB - ratingA;
      case 'name': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const clearAllFilters = () => {
    setSearch("");
    setMinRating(0);
    setPriceRange({ min: 0, max: Infinity });
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse opacity-60"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '4s'}}></div>

      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/20 via-purple-800/20 to-pink-800/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="flex items-center text-white/70 mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <Link to="/" className="hover:text-white transition-all duration-300 hover:scale-105 font-medium flex items-center">
              <span className="mr-2">🏠</span>
              Home
            </Link>
            <span className="mx-4 text-white/50">→</span>
            <Link to={`/category/${mainCategory}`} className="hover:text-white transition-all duration-300 hover:scale-105 font-medium capitalize">
              {mainCategory}
            </Link>
            <span className="mx-4 text-white/50">→</span>
            <span className="text-white font-bold bg-white/20 px-3 py-1 rounded-full capitalize">
              {subCategory}
            </span>
          </nav>
          
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 mb-6 border border-white/30">
              <span className="text-3xl mr-3">✨</span>
              <span className="text-white font-bold text-lg">Premium Collection</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white capitalize mb-6 tracking-tight">
              {subCategory}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-white/90">
              <div className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/30">
                <span className="text-2xl font-bold">{sortedFiltered.length}</span>
                <span className="ml-2 text-sm font-medium">
                  {sortedFiltered.length === 1 ? 'Product' : 'Products'}
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/30">
                <span className="text-2xl">🎯</span>
                <span className="ml-2 text-sm font-medium">Curated Selection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12 border border-white/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-bl-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-tr-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-gray-800 flex items-center">
                <span className="mr-3 text-3xl">🔍</span>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Search & Filter
                </span>
              </h3>
              
              {(search || minRating > 0 || priceRange.min > 0 || priceRange.max < Infinity || sortBy !== "default") && (
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold border border-indigo-200">
                    🎯 Filters Active
                  </span>
                  <button 
                    onClick={clearAllFilters}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    ✨ Clear All
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">🔎</span>
                  Search Products
                </label>
                <div className="relative">
                  <SearchBar value={search} onChange={setSearch} />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">🔄</span>
                  Sort By
                </label>
                <select 
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white shadow-lg hover:shadow-xl font-medium"
                  value={sortBy} 
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="default">🎯 Default</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="name">🔤 Name A-Z</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">⭐</span>
                  Minimum Rating
                </label>
                <select 
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white shadow-lg hover:shadow-xl font-medium"
                  value={minRating} 
                  onChange={e => setMinRating(parseFloat(e.target.value))}
                >
                  <option value={0}>⭐ All Ratings</option>
                  <option value={3}>⭐⭐⭐ 3+ Stars</option>
                  <option value={4}>⭐⭐⭐⭐ 4+ Stars</option>
                  <option value={4.5}>⭐⭐⭐⭐⭐ 4.5+ Stars</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">💰</span>
                  Price Range
                </label>
                <div className="space-y-2">
                  <input 
                    type="number" 
                    placeholder="Min $" 
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                    onChange={e => setPriceRange(r => ({ ...r, min: parseFloat(e.target.value) || 0 }))}
                    value={priceRange.min || ""}
                  />
                  <input 
                    type="number" 
                    placeholder="Max $" 
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                    onChange={e => setPriceRange(r => ({ ...r, max: parseFloat(e.target.value) || Infinity }))}
                    value={priceRange.max === Infinity ? "" : priceRange.max}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {sortedFiltered.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="text-9xl mb-4 animate-bounce">🔍</div>
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <h3 className="text-4xl font-black bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-6">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <span className="text-2xl">✨</span>
                Clear All Filters
              </button>
              
              <Link 
                to="/"
                className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <span className="text-2xl">🏠</span>
                Browse All Categories
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/50">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full">
                  <span className="text-xl font-bold">{sortedFiltered.length}</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">
                    {sortedFiltered.length} {sortedFiltered.length === 1 ? 'Product' : 'Products'} Found
                  </p>
                  <p className="text-sm text-gray-600">
                    {search && `Showing results for "${search}"`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="animate-pulse">🔥</span>
                <span className="font-medium">Premium Quality Guaranteed</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedFiltered.map((item, idx) => {
                const originalIndex = items.findIndex(originalItem => originalItem === item);
                
                return (
                  <div 
                    key={originalIndex} 
                    className="group animate-fadeIn transform transition-all duration-500 hover:scale-105"
                    style={{ 
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="relative">
                      {sortBy !== "default" && idx < 3 && (
                        <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg animate-pulse">
                          #{idx + 1}
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 scale-110"></div>
                      
                      <ProductCard
                        product={item}
                        mainCategory={mainCategory}
                        subCategory={subCategory}
                        index={originalIndex}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {sortedFiltered.length > 12 && (
              <div className="text-center mt-16">
                <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="text-2xl group-hover:animate-bounce">⬇️</span>
                    Load More Products
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-110 z-50 group"
      >
        <span className="text-xl group-hover:animate-bounce">⬆️</span>
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}