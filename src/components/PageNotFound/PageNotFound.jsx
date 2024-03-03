import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import notFound from '../../assets/images/notFound.png'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Container className='py-5'>
      <Row className='align-items-center justify-content-center'>
        <Col md={6} className='d-flex flex-column justify-content-center align-items-center'>
          <img src={notFound} loading='lazy' alt="Not Found" className='w-50 d-block' />
          <h2 className='fs-1 text-center fw-bold '>404</h2>
          <h3 className='fs-2 text-center fw-bold my-3'>The page you are looking for does not exist!</h3>
          <Link to='/' className='text-center text-decoration-none'>
            <Button variant='dark' size='lg'>Back to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default PageNotFound