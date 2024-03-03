import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PageTitle from '../PageTitle/PageTitle'
import mainHeader1 from '../../assets/images/main-header.jpg'
import mainHeader2 from '../../assets/images/main-header2.jpg'
import header2 from '../../assets/images/header2.jpg'
import header3 from '../../assets/images/header3.jpg'
import styles from './HomeHeader.module.css'
import Slider from 'react-slick'

const HomeHeader = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: "linear",
      pauseOnHover: true,
      dots:true,
    };
  return (
    <Container className='py-5'>
        <PageTitle title={`${hours >= 5 && hours < 12 ? 'Good Morning' : hours >= 12 && hours < 18 ? 'Good Afternoon' : 'Good Evening'}!`} />
        <Row className='my-5'>
            <Col md={8}>
                <Slider {...settings}>
                <img src={mainHeader1} alt="header 1" className={`w-100 d-block mb-3 mb-md-0 ${styles.headerImg}`} />
                <img src={mainHeader2} alt="header 2" className={`w-100 d-block mb-3 mb-md-0 ${styles.headerImg}`} />
                </Slider>
            </Col>
            <Col md={4} className='d-flex flex-column justify-content-between align-items-center'>
                    <img src={header2} alt="header 3" className={`w-100 d-block mb-3 mb-md-0 ${styles.headerImg}`} />
                    <img src={header3} alt="header 4" className={`w-100 d-block mb-3 mb-md-0 ${styles.headerImg}`} />
            </Col>
        </Row>
    </Container>
  )
}

export default HomeHeader