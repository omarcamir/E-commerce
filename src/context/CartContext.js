import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const endPoint = "https://ecommerce.routemisr.com/api/v1/cart/";
  const { userToken } = useAuth();
  const headers = {
    token: userToken,
  };

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        endPoint,
        {
          productId: productId,
        },
        {
          headers,
        }
      );
      console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCartItems() {
    try {
      const { data } = await axios.get(endPoint, { headers });
      setNumOfCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async function removeFromCart(cartItemId) {
    try {
      const { data } = await axios.delete(`${endPoint}/${cartItemId}`, {
        headers,
      });
      setNumOfCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductQty(cartItemId, count) {
    try {
      
    } catch (error) {
      
    }  const {data} = await axios.put(`${endPoint}/${cartItemId}`,{
        count
      }, {
        headers
      })
      return data;
  }
  return (
    <CartContext.Provider value={{ numOfCartItems, addToCart, getCartItems ,removeFromCart , updateProductQty }}>
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
