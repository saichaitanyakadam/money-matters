/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button'
import {AiOutlinePlus} from 'react-icons/ai'
import './index.css'
import {useNavigate} from 'react-router-dom'

const Header = ({heading, addTransactionBtn, edit, handleEdit}) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="d-flex justify-content-between header align-items-center py-2 px-3">
        <h2>{heading}</h2>
        {addTransactionBtn && (
          <>
            <Button
              variant="primary"
              onClick={() => {
                navigate('/add-transaction')
              }}
              className="d-none d-lg-block"
            >
              <AiOutlinePlus size="20" className="me-2" />
              Add Transaction
            </Button>
          </>
        )}
        {edit && (
          <>
            <Button
              variant="primary"
              onClick={handleEdit}
              className="d-none d-lg-block"
            >
              Edit Profile
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
export default Header
