import React from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import SubTitle from "../SubTitle/SubTitle";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";

const CategorySlider = () => {
  async function getCategories() {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return response.data.data;
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: "categories",
    queryFn: getCategories,
  });
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Container className="py-5">
      <SubTitle subTitle="Categories" />
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
      <Row className="my-3 py-3">
        <Slider {...settings}>
          {data?.map((category) => (
            <Col key={category._id} className="mb-4  mx-4">
              <Card className="card mx-3 ">
                <Link
                  to={`/categories/${category._id}`}
                  className="text-decoration-none "
                >
                  <Card.Img
                    variant="top"
                    src={category.image}
                    alt={category.name}
                    style={{
                      height: "200px",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Card.Body>
                  <Link
                    to={`/categories/${category._id}`}
                    className="text-decoration-none link-dark"
                  >
                    <Card.Title
                      className={`text-muted ${
                        category.name.length > 10 ? "fs-6" : "fs-5"
                      }`}
                    >
                      {category.name}
                    </Card.Title>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Slider>
      </Row>
    </Container>
  );
};

export default CategorySlider;
