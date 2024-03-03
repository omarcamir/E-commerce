import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import HomeHeader from '../components/HomeHeader/HomeHeader'
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts'
import CategorySlider from '../components/CategorySlider/CategorySlider'

const Home = () => {
  return (
    <Container>
      <Helmet title="Home"></Helmet>
      <HomeHeader/>
      <CategorySlider/>
      <FeaturedProducts/>
    </Container>
  )
}

export default Home