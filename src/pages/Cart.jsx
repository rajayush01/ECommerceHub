import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";

export default function Cart() {
  const { state, dispatch } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  
  const subtotal = state.items.reduce((s,i)=>s + parseFloat(i.product.price?.replace('$','')||0)*i.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  const updateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      dispatch({type: 'REMOVE', payload: index});
    } else {
      // Update quantity logic would go here
      // For now, we'll just handle remove when qty is 0
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-pink-900/40"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <div className="text-9xl mb-8 animate-bounce">🛒</div>
          <h1 className="text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Your Cart is Empty
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Looks like you haven't added any products to your cart yet. 
            <span className="text-purple-300 font-semibold"> Let's fix that! </span>
          </p>
          
          <Link 
            to="/" 
            className="group inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 rounded-3xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <svg className="mr-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Start Shopping
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-pink-900/40"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <nav className="flex justify-center mb-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10">
              <Link 
                to="/" 
                className="text-purple-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <span className="mx-4 text-gray-500">/</span>
              <span className="text-white font-semibold">Shopping Cart</span>
            </div>
          </nav>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Shopping Cart
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Review your selected items and 
            <span className="text-purple-300 font-semibold"> complete your purchase</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3 text-3xl">🛍️</span>
                  Cart Items ({state.items.length})
                </h2>
                
                <button
                  onClick={() => dispatch({type:'CLEAR'})}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300 hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {state.items.map((item, idx) => (
                  <div key={idx} className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                          <img 
                            src={item.product.image} 
                            alt={item.product.title} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2">
                          {item.product.title}
                        </h3>
                        
                        <div className="flex items-center mb-3">
                          <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                            {item.subCategory}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-purple-300">
                            {item.product.price}
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/20">
                              <button
                                onClick={() => updateQuantity(idx, item.qty - 1)}
                                className="text-white hover:text-purple-300 font-bold text-lg w-6 h-6 flex items-center justify-center transition-colors duration-300"
                              >
                                −
                              </button>
                              <span className="mx-4 text-white font-semibold min-w-[2rem] text-center">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(idx, item.qty + 1)}
                                className="text-white hover:text-purple-300 font-bold text-lg w-6 h-6 flex items-center justify-center transition-colors duration-300"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => dispatch({type:'REMOVE', payload:idx})}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-3 rounded-full transition-all duration-300 group-hover:scale-110"
                              title="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-right">
                          <span className="text-gray-400 text-sm">Subtotal: </span>
                          <span className="text-white font-bold text-lg">
                            ${(parseFloat(item.product.price?.replace('$','') || 0) * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="mr-3 text-3xl">📋</span>
                Order Summary
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-300 mb-3">
                  Promo Code
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
                  />
                  <button
                    onClick={handlePromoCode}
                    disabled={promoApplied}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-400 text-sm mt-2 flex items-center">
                    <span className="mr-2">✅</span>
                    Promo code applied! 10% discount
                  </p>
                )}
                {!promoApplied && (
                  <p className="text-gray-400 text-xs mt-2">
                    Try "SAVE10" for 10% off
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {subtotal < 50 && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 mb-8">
                  <p className="text-orange-300 text-sm flex items-center">
                    <span className="mr-2">🚚</span>
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <button
                onClick={() => { 
                  alert(`🎉 Order placed successfully!\nTotal: $${total.toFixed(2)}\nThank you for shopping with us!`); 
                  dispatch({type:'CLEAR'}); 
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 mb-4"
              >
                🚀 Proceed to Checkout
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center text-sm text-gray-400 mb-4">
                  <span className="mr-2">🔒</span>
                  Secure 256-bit SSL encryption
                </div>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <span className="mr-1">💳</span>
                    Visa
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">💳</span>
                    Mastercard
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">💰</span>
                    PayPal
                  </span>
                </div>
              </div>

              <Link 
                to="/" 
                className="block text-center text-purple-300 hover:text-white font-medium transition-colors duration-300 hover:underline mt-6"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}