import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedCircle = state?.selectedCircle;
  const sharedCart = state?.sharedCart || [];

  useEffect(() => {
    if (!selectedCircle) navigate("/");
  }, [selectedCircle, navigate]);

  const totalSpent = sharedCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirmCheckout = () => {
    alert(` Checkout completed for circle: ${selectedCircle.name}`);
    navigate("/");
  };

  if (!selectedCircle) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 w-full max-w-2xl text-white">
        <h2 className="text-3xl font-bold mb-4">Checkout: {selectedCircle.name}</h2>

        {/* Summary */}
        <div className="space-y-2 mb-6">
          <p className="text-gray-300">💰 Budget: ${selectedCircle.budget}</p>
          <p className="text-emerald-400">🧾 Total Spent: ${totalSpent.toFixed(2)}</p>
        </div>

        {/* Members */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Members</h4>
          <ul className="list-disc list-inside text-gray-300">
            {selectedCircle.members.map((m) => (
              <li key={m.id}>{m.name}</li>
            ))}
          </ul>
        </div>

        {/* Cart Items */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-3">🛒 Items in Cart</h4>
          {sharedCart.length === 0 ? (
            <p className="text-gray-400">No items added to cart.</p>
          ) : (
            <div className="space-y-4">
              {sharedCart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-white/20 rounded-lg p-4 bg-white/5"
                >
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-400">Added by: {item.addedBy}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleConfirmCheckout}
          className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
        >
           Confirm Checkout
        </button>
      </div>
    </div>
  );
}
