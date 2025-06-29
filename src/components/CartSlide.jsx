import { useCart } from "../contexts/CartContext.jsx";

export default function CartSlide() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((s,i)=>s + parseFloat(i.product.price?.replace('$','')||0)*i.qty, 0);

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 border-l border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="mr-3">🛒</span>
          Shopping Cart
        </h2>
        <p className="text-indigo-100 mt-1">
          {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🛒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm leading-tight mb-2 line-clamp-2">
                        {item.product.title}
                      </h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-indigo-600">{item.product.price}</span>
                          <span className="mx-2">×</span>
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                            {item.qty}
                          </span>
                        </div>
                        
                        <button
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-300"
                          onClick={() => dispatch({type:'REMOVE', payload:idx})}
                          title="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-medium text-gray-700">Total:</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => { 
                alert(`🎉 Order placed successfully!\nTotal: $${total.toFixed(2)}\nThank you for shopping with us!`); 
                dispatch({type:'CLEAR'}); 
              }}
            >
              Checkout ${total.toFixed(2)}
            </button>

            <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
              <span className="mr-2">🔒</span>
              Secure checkout with SSL encryption
            </div>

            <button
              className="w-full mt-3 bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition-colors duration-300"
              onClick={() => dispatch({type:'CLEAR'})}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}