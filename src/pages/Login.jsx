import React from 'react'
import { Container } from 'react-bootstrap'
import LoginForm from '../components/LoginForm/LoginForm'
import { Helmet } from 'react-helmet'

const Login = () => {
  return (
    <Container className='py-5'>
      <Helmet title="Login"></Helmet>
      <h3>Login</h3>
      <LoginForm/>
    </Container>
  )
}

export default Login