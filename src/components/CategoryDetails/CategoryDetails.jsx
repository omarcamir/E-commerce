import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";

const CategoryDetails = () => {
  const { id } = useParams();
  async function getCategoryDetails() {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    return response.data.data;
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "CategoryDetails",
    queryFn: getCategoryDetails,
  });
  console.log(data);
  return (
    <Container className="py-5">
      <PageTitle title={"Category Details"} className="mb-5"></PageTitle>
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
      <Row className="my-5">
          {data &&
            <Col md={'6'} key={data._id} className="mb-4  mx-4">
              <Card className="card w-50 mx-auto">
                <Card.Img
                  variant="top"
                  src={data.image}
                  alt={data.name}
                  className="d-block w-100"
                />
                <Card.Body>
                  <Card.Title className={`text-muted fw-bold text-center`}>
                    {data.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            }
      </Row>
    </Container>
  );
};

export default CategoryDetails;
