import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../assets/Logo.png'
import ActionModal from '../action-modal'
import ModalBtn from '../modal'

const NavigationBar = () => {
  const [showModal, setShowModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const navigate = useNavigate()
  const onLogout = () => {
    Cookies.remove('user_id')
    Cookies.remove('user')
    navigate('/login')
  }
  const handleAdd = async data => {
    const userId = Cookies.get('user_id')
    const user = Cookies.get('user')

    try {
      await axios.post(
        'https://bursting-gelding-24.hasura.app/api/rest/add-transaction',
        {
          name: data.transaction_name,
          type: data.type,
          category: data.category,
          amount: data.amount,
          date: data.date,
          user_id: userId,
        },
        {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret':
              'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': user,
            'x-hasura-user-id': userId,
          },
        },
      )
      toast.success('Transaction Added Successfully')
      setAddModal(false)
    } catch (error) {
      toast.error('Something Went Wrong')
    }
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setAddModal(true)
          }}
        >
          Add
        </button>{' '}
        {addModal && (
          <ModalBtn
            formType="Add"
            handleHide={setAddModal}
            handleEvent={handleAdd}
            show={addModal}
          />
        )}
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
      <ToastContainer />
    </Navbar>
  )
}
export default NavigationBar
