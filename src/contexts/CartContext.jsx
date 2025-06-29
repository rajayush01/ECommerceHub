import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const exists = state.items.find(i => i.index === action.payload.index && i.subCategory === action.payload.subCategory);
      if (exists) {
        return { items: state.items.map(i =>
            i.index === action.payload.index && i.subCategory === action.payload.subCategory
              ? {...i, qty: i.qty + 1}
              : i
        )};
      }
      return { items: [...state.items, { ...action.payload, qty: 1 }] };
    case "REMOVE":
      return { items: state.items.filter((_, idx) => idx !== action.payload) };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
