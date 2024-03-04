import axios from "axios";
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

function CartContextProvider({ children }) {
  const endPoint = "https://ecommerce.routemisr.com/api/v1/cart/ ";
  const { userToken } = useAuth();
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        endPoint,
        {
          productId: productId,
        },
        {
          headers: {
            token: userToken,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("useCartContext must be used within a CartContextProvider");
  return context;
}
export { CartContextProvider, useCartContext };
