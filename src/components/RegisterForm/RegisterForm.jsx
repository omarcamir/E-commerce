import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import styles from "./RegisterForm.module.css";
import { useState } from "react";
const RegisterForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string()
      .matches(/^(?:\+201|00201)?[0125][0-9]{8}$/, "Invalid Phone Number")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i, "Invalid Password")
      .required("Password is required"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  async function handleRegister(values) {
    setIsLoading(true)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
    .then(res => {
        // console.log(res)
        if (res.data.message === "success") {
            setIsLoading(false)
            setError(null)
            formik.setValues(initialValues);
            navigate("/login")
        }
    })
    .catch(err => {
        setIsLoading(false)
        setError(err.response.data.message)
    })
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleRegister(values),
  });
  return (
    <Row>
    {error && <div className="alert alert-danger">{error}</div>}
      <Col md={6}>
        <Form onSubmit={formik.handleSubmit} className="py-3">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {
                formik.errors.name && formik.touched.name &&
                <span className="text-danger">{formik.errors.name}</span>
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {
                formik.errors.email && formik.touched.email &&
                <span className="text-danger">{formik.errors.email}</span>
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="******"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {
                formik.errors.password && formik.touched.password &&
                <span className="text-danger">{formik.errors.password}</span>
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="rePassword">
            <Form.Label>re-Password:</Form.Label>
            <Form.Control
              type="password"
              name="rePassword"
              placeholder="******"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
            />
            {
                formik.errors.rePassword && formik.touched.rePassword &&
                <span className="text-danger">{formik.errors.rePassword}</span>
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="+123456789"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {
                formik.errors.phone && formik.touched.phone &&
                <span className="text-danger">{formik.errors.phone}</span>
            }
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <Button type="submit" variant="dark" disabled={!(formik.isValid && formik.dirty)}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Register"}
            </Button>
          </div>
        </Form>
      </Col>
      <Col
        md={6}
        className="d-none d-md-flex justify-content-center align-items-center"
      >
        <h2 className="text-center fs-1 fw-bold">E-commerce</h2>
      </Col>
    </Row>
  );
};

export default RegisterForm;
