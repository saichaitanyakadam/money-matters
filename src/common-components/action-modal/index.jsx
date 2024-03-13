import {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {MdOutlineWarningAmber} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import './index.css'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie'

const ActionModal = () => {
  const [show, setShow] = useState(true)
  const location = useLocation()
  const params = useParams()
  const type = location.state
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      const accessToken = Cookie.get('accessToken')
      await axios.delete(
        `https://money-matters-backend.onrender.com/api/transactions/${params.transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    Cookie.remove('accessToken')
    navigate('/login')
  }

  const handleClick = () => {
    location.pathname.includes('delete-transaction')
      ? handleDelete()
      : handleLogout()
    setShow(false)
    window.history.back()
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
        window.history.back()
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="m-0">
          {}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-start">
          <div className="rounded-circle me-3 align-self-center">
            {type === 'Logout' ? (
              <MdOutlineWarningAmber className="p-1 rounded-circle danger-icon rounded-circle" />
            ) : (
              <FiLogOut className="p-1 rounded-circle danger-icon rounded-circle" />
            )}
          </div>
          <div>
            <h4>Are You Sure You Want to {type}?</h4>
            <p>
              {type === 'Delete'
                ? 'This transaction will be deleted immediately. You can’t undo this action.'
                : 'You can not able to access the application. You will be directed to Login page.'}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-start">
        <Button onClick={handleClick} variant="danger">
          {type}
        </Button>
        <Button
          onClick={() => {
            setShow(false)
            window.history.back()
          }}
          variant="outline-secondary"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ActionModal
