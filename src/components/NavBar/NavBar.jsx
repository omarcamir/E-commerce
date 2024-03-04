import React from 'react'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../context/AuthContext'
import { useCartContext } from '../../context/CartContext'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  const {userToken , setUserToken} = useAuth()
  const {numOfCartItems} = useCartContext()
    const pages = [
        {
            path:"",
            name:"Home"
        },
        {
          path:"products",
          name:"Products"
        },
        {
          path:"brands",
          name:"Brands"
        },
        {
          path:"categories",
          name:"Categories"
        },
    ]
    const socialMedia = [
      {
        icon:faGithub,
        link:"https://www.github.com/omarcamir",
      },
      {
        icon: faFacebook,
        link:"https://www.facebook.com",
      },
      {
        icon:faLinkedin,
        link:"https://www.linkdin.com/in/omarcamir",
      },
    ]
    
    const handleLogout = ()=>{
      setUserToken(null)
      localStorage.removeItem("userToken")
    }
  return (
    <Navbar sticky='top' expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Link className='text-decoration-none' to='/'>
            <Navbar.Brand className='fw-bold'>E-commerce</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userToken &&
            pages.map((page , index)=>(
              <NavLink className='nav-link ' key={index} to={page.path}>{page.name}</NavLink>
          ))
            }
          </Nav>
          <Nav className="ms-auto">
            {socialMedia.map((social , index)=>(
              <Nav.Link key={index} href={social.link} target='_blank'>
                <FontAwesomeIcon icon={social.icon} />
              </Nav.Link>
            ))}
            {userToken ?
              <>
                <NavLink className='nav-link position-relative' to='/cart'>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <Badge bg="danger" className='d-flex justify-content-center align-items-center rounded-circle position-absolute w-50 h-50 top-0 start-50'>{numOfCartItems}</Badge>
                </NavLink>
                <NavLink className='nav-link' onClick={handleLogout}>
                  Logout
                </NavLink>
              </>
            :
            <>
              <NavLink className='nav-link' to='/login'>
                Login
              </NavLink>
              <NavLink className='nav-link' to='/register'>
                Register
              </NavLink>
            </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar