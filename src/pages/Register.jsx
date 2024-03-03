import React from 'react'
import { Container } from 'react-bootstrap'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import { Helmet } from 'react-helmet'

const Register = () => {
  return (
    <Container className='py-5'>
      <Helmet title="Register"></Helmet>
      <h3>Register</h3>
      <RegisterForm/>
    </Container>
  )
}

export default Register