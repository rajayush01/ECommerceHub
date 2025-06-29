import { Link } from "react-router-dom";

export default function ProductCard({ product, mainCategory, subCategory, index }) {
  const rating = parseFloat(product.rating) || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <Link
      to={`/product/${mainCategory}/${subCategory}/${index}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:scale-105 group-hover:-translate-y-2">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-64">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            Quick View
          </div>
          
          {(product.price.includes('9.99') || product.price.includes('0.00')) && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Sale
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
            {product.title}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">
                  {i < fullStars ? '⭐' : 
                   i === fullStars && hasHalfStar ? '⭐' : 
                   '☆'}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-indigo-600">{product.price}</p>
            
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
              <span className="text-white text-lg">🛒</span>
            </div>
          </div>
          
          <div className="mt-4 inline-block">
            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {subCategory}
            </span>
          </div>
        </div>
        
        <div className="h-1 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
}