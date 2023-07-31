import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../assets/Logo.png'
import ActionModal from '../action-modal'

const NavigationBar = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const onLogout = () => {
    Cookies.remove('user_id')
    Cookies.remove('user')
    navigate('/login')
  }
  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary d-sm-block d-lg-none"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="company-logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
            <Link to="/transactions" className="nav-link">
              Transactions
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/add-transaction" className="nav-link">
              Add Transaction
            </Link>
            <button
              type="button"
              className="btn btn-outline-secondary align-self-center"
              onClick={() => {
                setShowModal(true)
              }}
            >
              Logout
            </button>
            {showModal && (
              <ActionModal
                handleHide={setShowModal}
                show={showModal}
                type="Logout"
                handleEvent={onLogout}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavigationBar
