import React from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import PageTitle from "../components/PageTitle/PageTitle";

const Brands = () => {
  return (
    <Container className="py-5">
      <Helmet title="Brands" />
      <PageTitle title="Brands"></PageTitle>
    </Container>
  );
};

export default Brands;
