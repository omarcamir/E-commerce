import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import CategorySlider from '../components/CategorySlider/CategorySlider'
import PageTitle from '../components/PageTitle/PageTitle'

const Categories = () => {
  return (
    <Container className='py-5'>
      <Helmet title="Categories"></Helmet>
      <PageTitle title="Categories"></PageTitle>
      <CategorySlider/>
    </Container>
  )
}

export default Categories