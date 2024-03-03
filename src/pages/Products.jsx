import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import PageTitle from '../components/PageTitle/PageTitle'
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts'

const Products = () => {
  return (
    <Container className='py-5'>
      <Helmet title="Products"></Helmet>
      <PageTitle title="Products"></PageTitle>
      <FeaturedProducts/>
    </Container>
  )
}

export default Products