import React from 'react'

import styles from './Footer.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className='bg-dark py-5'>
      <Container className={styles.footer}>
            <Link to='/' className='text-decoration-none'>
              <h3 className='text-start'>E-commerce</h3>
            </Link>
        <Row className='pt-3'>
          <Col md={4}>
            <ul className='list-unstyled text-start'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/products">Products</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <ul className='list-unstyled text-start'>
              <li><Link to="/brands">Brands</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <ul className='list-unstyled text-start'>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </Col>
        </Row>
        <p className='text-center text-light'>© 2023 E-commerce. All rights reserved. Omar Samir.</p>
      </Container>
    </footer>
  )
}

export default Footer