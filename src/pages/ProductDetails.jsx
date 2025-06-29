import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import data from "../assets/data.json";
import { useCart } from "../contexts/CartContext.jsx";

export default function ProductDetails() {
  const { mainCategory, subCategory, index } = useParams();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = data?.[mainCategory]?.[subCategory]?.[parseInt(index)];
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto p-8">
          <div className="relative mb-8">
            <div className="text-9xl mb-4 animate-bounce">😵</div>
            <div className="absolute inset-0 bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            The product you're looking for seems to have wandered off into the digital void.
          </p>
          <Link to="/" className="inline-flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 group">
            <span className="mr-2 group-hover:animate-bounce">🏠</span>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const rating = parseFloat(product.rating) || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: 'ADD',
        payload: {
          product,
          mainCategory,
          subCategory,
          index: parseInt(index)
        }
      });
    }
    
    const notification = document.createElement('div');
    notification.className = 'fixed top-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 transform transition-all duration-500 backdrop-blur-lg border border-white/20';
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="text-2xl animate-bounce">✅</div>
        <div>
          <div class="font-bold text-lg">${quantity} item(s) added!</div>
          <div class="text-green-100 text-sm">Ready for checkout</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const extractPrice = (priceString) => {
    if (!priceString) return 0;
    const numericValue = priceString.replace(/[$,]/g, '');
    return parseFloat(numericValue) || 0;
  };

  const currentPrice = extractPrice(product.price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <nav className="flex items-center text-gray-500 mb-8 bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg">
          <Link to="/" className="hover:text-indigo-600 transition-all duration-300 hover:scale-105 font-medium">Home</Link>
          <span className="mx-4 text-indigo-300">→</span>
          <Link to={`/category/${mainCategory}`} className="hover:text-indigo-600 transition-all duration-300 hover:scale-105 font-medium capitalize">{mainCategory}</Link>
          <span className="mx-4 text-indigo-300">→</span>
          <Link to={`/category/${mainCategory}/${subCategory}`} className="hover:text-indigo-600 transition-all duration-300 hover:scale-105 font-medium capitalize">{subCategory}</Link>
          <span className="mx-4 text-indigo-300">→</span>
          <span className="text-gray-800 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Product Details</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 group overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-2xl group-hover:animate-pulse" style={{animationDelay: '1s'}}></div>
              
              <div className="aspect-square bg-gradient-to-br from-gray-50/80 to-gray-100/60 rounded-3xl flex items-center justify-center overflow-hidden relative backdrop-blur-sm">
                <img 
                  src={images[selectedImage]} 
                  alt={product.title}
                  className="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 filter group-hover:brightness-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white px-3 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                  🔍 Hover to zoom
                </div>
              </div>
            </div>
            
            <div className="flex space-x-6 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 h-24 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border-2 transition-all duration-500 overflow-hidden group ${
                    selectedImage === idx 
                      ? 'border-indigo-500 scale-105 shadow-indigo-500/25' 
                      : 'border-white/30 hover:border-gray-300 hover:scale-102'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-110" />
                  {selectedImage === idx && (
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold capitalize border border-indigo-200/50 shadow-lg">
                  ✨ {subCategory}
                </span>
                <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold border border-green-200/50 shadow-lg animate-pulse">
                  🟢 In Stock
                </span>
              </div>
              
              <h1 className="text-5xl font-black bg-gradient-to-r from-gray-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-3xl transition-all duration-300 ${
                        i < fullStars || (i === fullStars && hasHalfStar) 
                          ? 'text-yellow-400 drop-shadow-lg animate-pulse' 
                          : 'text-gray-300'
                      }`}
                      style={{ animationDelay: `${i * 200}ms` }}
                    >
                      {i < fullStars ? '⭐' : 
                       i === fullStars && hasHalfStar ? '⭐' : 
                       '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-xl font-bold text-gray-700 bg-yellow-100 px-4 py-2 rounded-full border border-yellow-200 shadow-lg">
                  {product.rating}
                </span>
                <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-full text-sm font-medium">
                  ({Math.floor(Math.random() * 500) + 50} reviews)
                </span>
              </div>
            </div>

            <div className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-indigo-200/50 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-bl-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-tr-3xl"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-baseline gap-6">
                  <span className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <span className="text-3xl text-gray-400 line-through font-bold">
                    ${(currentPrice * 1.3).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg animate-bounce">
                    💰 Save ${((currentPrice * 1.3) - currentPrice).toFixed(2)}
                  </span>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                    ⚡ Limited Time
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3 text-3xl">📋</span>
                Product Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Experience premium quality with this exceptional {subCategory}. Meticulously crafted 
                with cutting-edge technology and premium materials, this product delivers unmatched 
                performance and durability. Whether for professional use or personal enjoyment, 
                it's designed to exceed expectations with its innovative features and elegant design.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-2 text-green-700">
                  <span className="text-lg">✅</span>
                  <span className="font-medium">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <span className="text-lg">🚀</span>
                  <span className="font-medium">Latest Technology</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-700">
                  <span className="text-lg">💎</span>
                  <span className="font-medium">Luxury Design</span>
                </div>
                <div className="flex items-center space-x-2 text-orange-700">
                  <span className="text-lg">⚡</span>
                  <span className="font-medium">High Performance</span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3 text-3xl">🛒</span>
                Add to Cart
              </h3>
              
              <div className="flex items-center gap-8 mb-8">
                <div className="flex items-center space-x-4">
                  <label className="text-gray-700 font-bold text-lg">Quantity:</label>
                  <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-bold transition-all duration-300 hover:scale-105"
                    >
                      −
                    </button>
                    <span className="px-8 py-3 bg-white font-bold text-gray-800 min-w-[80px] text-center text-xl border-x border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-bold transition-all duration-300 hover:scale-105"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-4 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <span className="relative z-10 text-3xl group-hover:animate-bounce">🛒</span>
                <span className="relative z-10">Add {quantity} to Cart - {product.price}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50', color: 'from-blue-50 to-indigo-50 border-blue-100' },
                { icon: '↩️', title: 'Easy Returns', desc: '30-day guarantee', color: 'from-green-50 to-emerald-50 border-green-100' },
                { icon: '🛡️', title: 'Warranty', desc: '2-year coverage', color: 'from-purple-50 to-pink-50 border-purple-100' },
                { icon: '⚡', title: 'Fast Delivery', desc: '2-3 business days', color: 'from-amber-50 to-orange-50 border-amber-100' }
              ].map((feature, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 text-center border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}>
                  <div className="text-4xl mb-3 group-hover:animate-bounce">{feature.icon}</div>
                  <p className="font-bold text-gray-700 text-lg mb-1">{feature.title}</p>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-gray-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
            You Might Also Love
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {data[mainCategory] && data[mainCategory][subCategory] && 
              data[mainCategory][subCategory]
                .filter((_, idx) => idx !== parseInt(index))
                .slice(0, 4)
                .map((relatedProduct, idx) => (
                  <Link
                    key={idx}
                    to={`/product/${mainCategory}/${subCategory}/${data[mainCategory][subCategory].indexOf(relatedProduct)}`}
                    className="group block transform transition-all duration-500 hover:scale-105"
                  >
                    <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/30 group-hover:bg-white/80">
                      <div className="p-6">
                        <div className="aspect-square bg-gradient-to-br from-gray-50/80 to-gray-100/60 rounded-2xl mb-6 flex items-center justify-center overflow-hidden group">
                          <img src={relatedProduct.image} alt={relatedProduct.title} className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">{relatedProduct.title}</h3>
                        <p className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{relatedProduct.price}</p>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}