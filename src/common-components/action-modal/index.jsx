import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {MdOutlineWarningAmber} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const ActionModal = ({show, handleHide, type, handleEvent}) => {
  const handleClick = () => {
    handleEvent()
  }
  const handleCancel = () => {
    handleHide(false)
  }
  return (
    <Modal
      show={show}
      onHide={() => {
        handleHide(false)
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
        <Button onClick={handleCancel} variant="outline-secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ActionModal
