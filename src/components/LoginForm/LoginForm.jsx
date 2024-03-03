import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {setUserToken} = useAuth();
  const initialValues = {
    email: "",
    password: ""
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i, "Invalid Password")
      .required("Password is required"),
  });
  async function handleLogin(values) {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        // console.log(res);
        if (res.data.message === "success") {
          setIsLoading(false);
          setError(null);
          formik.setValues(initialValues);
          setUserToken(res.data.token);
          localStorage.setItem("userToken", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        // console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleLogin(values),
  });
  return (
    <Row>
    {error && <div className="alert alert-danger">{error}</div>}
      <Col md={6}>
      <Form onSubmit={formik.handleSubmit} className="py-3">
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
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p>
              Don't have an account? <Link to="/Register">Register</Link>
            </p>
            <Button type="submit" variant="dark" disabled={!(formik.isValid && formik.dirty)}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
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

export default LoginForm;
