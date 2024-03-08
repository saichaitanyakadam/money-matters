import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../assets/Logo.png'

const NavigationBar = () => {
  const [active, setActive] = useState(false)
  const navigate = useNavigate()

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expanded={active}
      expand="lg"
      className="bg-body-tertiary d-sm-block d-lg-none"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="company-logo" />
          </Link>
        </Navbar.Brand>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            navigate('/add-transaction')
          }}
        >
          Add
        </button>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            setActive(prev => !prev)
          }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              className="nav-link"
              onClick={() => {
                setActive(false)
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className="nav-link"
              onClick={() => {
                setActive(false)
              }}
            >
              Transactions
            </Link>
            <Link
              to="/profile"
              className="nav-link"
              onClick={() => {
                setActive(false)
              }}
            >
              Profile
            </Link>
            <button
              type="button"
              className="btn btn-outline-secondary align-self-center"
              onClick={() => {
                navigate('/sign-out', {state: 'Logout'})
              }}
            >
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavigationBar
