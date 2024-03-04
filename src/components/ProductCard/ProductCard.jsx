import { faHeart} from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ id, title, priceAfterDiscount, category, price, rate, img }) => {
  const {addToCart} = useCartContext()
  async function addProductToCart(id){
    if (!id) {
      console.error('Invalid ProductId:', id);
      return;
    }
    try {
      let res = await addToCart(id);
      if (res?.status === 'success') {
        toast.success('Added to cart');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
    if (!id) {
      console.error('Invalid ProductId:', id);
      return;
    }
    


  }
  return (
    <Col sm={6} md={4} lg={3} className="mb-4">
      <Card className="card h-100">
        <Link to={`/products/${id}`}>
          <Card.Img variant="top" src={img} />
        </Link>
        <Card.Body>
          <Link to={`/products/${id}`} className="text-decoration-none">
            <Card.Title className="text-muted">{category}</Card.Title>
          </Link>
          <Card.Subtitle className="fs-6 my-3 fw-bold">
            {title.length > 20 ? title.slice(0, 20) + "..." : title}{" "}
          </Card.Subtitle>
          <div className="d-flex justify-content-between align-items-center my-2">
            <p className="mb-2 text-dark fw-bold"><span className={priceAfterDiscount ? "text-decoration-line-through me-2 text-muted" : "text-dark"}>${price}</span>${priceAfterDiscount}</p>
            <p className="mb-2 text-dark fw-bold">
              {rate} <FontAwesomeIcon icon={faStar} color="orange" />
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="dark" onClick={() => addProductToCart(id)}>
              <FontAwesomeIcon icon={faCartShopping} size="lg" />
            </Button>
            <Button variant="none">
              <FontAwesomeIcon icon={faHeart} color="red" size="lg" />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
