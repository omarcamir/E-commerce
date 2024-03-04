import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useCartContext } from "../context/CartContext";
import PageTitle from "../components/PageTitle/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

const Cart = () => {
  const { getCartItems, numOfCartItems, removeFromCart , updateProductQty } = useCartContext();
  const [cartDetails, setCartDetails] = useState(null);

  async function handleRemoveFromCart(id) {
    const data = await removeFromCart(id);
    if (data?.status === "success") {
      console.log("data", data);
      setCartDetails(data);
      toast.success("Item removed from cart successfully", { theme: "dark" });
    } else {
      console.log("data", data);
      toast.error("Oops something went wrong", { theme: "dark" });
    }
  }
  async function updateProductQuantity(cartItemId, count) {
    if (count === 0) {
      return handleRemoveFromCart(cartItemId);
    }
  
    const data = await updateProductQty(cartItemId, count);
    if (data?.status === "success") {
      console.log("data", data);
      setCartDetails(data);
      toast.success("Item quantity updated", { theme: "dark" });
    } else {
      console.log("data", data);
      toast.error("Oops something went wrong", { theme: "dark" });
    }
  }
  useEffect(() => {
    // Define getCart function inside useEffect callback
    async function getCart() {
      const data = await getCartItems();
      console.log(data);
      setCartDetails(data);
    }

    // Call getCart function
    getCart();
  }, []);
  return (
    <Container className="py-5">
      <Helmet title="Cart"></Helmet>
      <PageTitle title="Shopping Cart" />
      {cartDetails?.data && (
        <div key={cartDetails.data._id} className="cart bg-body-secondary rounded-3 p-5 my-4">
          <div className="d-flex justify-content-between aline-items-center my-3">
            <p className="fs-3 fw-bold">
              Total Price:
              <span className="text-success ms-2">
                {cartDetails.data.totalCartPrice}
              </span>
            </p>
            <p className="fs-3 fw-bold">
              Items: <span className="text-success ms-2">{numOfCartItems}</span>
            </p>
          </div>
          {cartDetails?.data.products.map((item) => (
            <div className="item d-flex w-100 justify-content-between align-items-center my-3 px-md-5 border-1 border-bottom border-secondary">
              <div className="item-details d-flex flex-column flex-md-row justify-content-between align-items-start my-3">
                <figure>
                  <img
                    src={item.product.imageCover}
                    className="img-fluid"
                    alt={item.product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </figure>
                <div className="ms-4">
                  <p className="fw-bold h5">{item.product.title}</p>
                  <p className="fw-bold text-secondary my-1">${item.price}</p>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item.product.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                    Remove
                  </Button>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <div className="w-100 d-flex align-items-center">
                  <Button onClick={() => updateProductQuantity(item.product.id ,item.count-1)} variant="outline-danger" className="me-3">
                    -
                  </Button>
                  <p>{item.count}</p>
                  <Button onClick={() => updateProductQuantity(item.product.id ,item.count+1)} variant="outline-success" className="ms-3">
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="dark" className="w-100 my-3">
            Checkout
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
