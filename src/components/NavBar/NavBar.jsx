import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../../context/AuthContext'

const NavBar = () => {
  const {userToken , setUserToken} = useAuth()
    const pages = [
        {
            path:"",
            name:"Home"
        },
        {
            path:"cart",
            name:"Cart"
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
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Link className='text-decoration-none' to='/'>
            <Navbar.Brand className='fw-bold'>E-commerce</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userToken &&
            pages.map((page , index)=>(
              <NavLink className='nav-link' key={index} to={page.path}>{page.name}</NavLink>
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
                <NavLink className='nav-link'>
                  Profile
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