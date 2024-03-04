import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import PageTitle from "../PageTitle/PageTitle";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const {addToCart} = useCartContext()
  async function getProductDetails() {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    return response.data.data;
  }
  const { isError, isLoading, error, data } = useQuery({
    queryKey: "ProductDetails",
    queryFn: getProductDetails,
  });
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  async function addProductToCart(id){
    if (!id) {
      console.error('Invalid ProductId:', id);
      return;
    }
    try {
      let res = await addToCart(id);
      console.log(res);
      if (res?.status === 'success') {
        toast.success('Added to cart');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  }
  return (
    <Container className="py-5">
      <PageTitle title={"Product Details"} className="mb-5"></PageTitle>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="dark" size="lg" />
        </div>
      )}
      {isError && (
        <Alert variant="danger" className="capitalize">
          {error.message}
        </Alert>
      )}
      {data && (
        <Row className="my-5">
          <Col md={3} className="mb-3">
            <Slider {...settings}>
              {data.images.map((img,index)=>
              <img
              key={index}
              src={img}
              className="w-100 rounded-5 mb-3 rounded d-block"
              alt={data.title}
            />)}
            </Slider>
          </Col>
          <Col md={6}>
            <h3>{data.title}</h3>
            <h6 className="text-muted my-3 fw-bold">
              {data.category.name} - {data.brand.name}
            </h6>
            <p className="text-muted my-3">{data.description}</p>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h5>
                <span
                  className={
                    data.priceAfterDiscount
                      ? "text-decoration-line-through"
                      : ""
                  }
                >
                  ${data.price} {data.priceAfterDiscount}
                </span>
              </h5>
              <p className="text-muted mb">
                {data.ratingsAverage}{" "}
                <FontAwesomeIcon icon={faStar} color="orange" />
              </p>
            </div>
            <div className="btns w-100 d-flex justify-content-between align-items-end">
              <div className="d-flex">
                <Button variant="dark" size="lg" className="me-3">
                  Buy Now
                </Button>
                <Button variant="dark" size="lg" className="ms-3" onClick={()=>addProductToCart(id)}>
                  <FontAwesomeIcon icon={faCartShopping} size="lg" />
                </Button>
              </div>
              <Button variant="light" size="lg">
                <FontAwesomeIcon icon={faHeart} color="red" size="lg" />
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
