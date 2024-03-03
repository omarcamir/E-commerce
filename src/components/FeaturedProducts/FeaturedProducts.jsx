import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../SubTitle/SubTitle";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getProducts() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getProducts();
  },[]);
  return (
    <Container className="py-5">
      <SubTitle subTitle="Featured Products" />
      <Row className="my-3 py-3">
        <div className="d-flex my-3 justify-content-center align-items-center">
          {isLoading && <Spinner animation="grow" variant="dark" size="lg" />}
        </div>
        {error && <Alert className="text-center text-danger">{error}</Alert>}
        {products?.map((product) => (
          <ProductCard key={product._id} priceAfterDiscount={product.priceAfterDiscount} id={product.id} title={product.title} rate={product.ratingsAverage} price={product.price} category={product.category.name} img={product.imageCover} />
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedProducts;
