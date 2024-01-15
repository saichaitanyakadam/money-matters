import {useState} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import Button from 'react-bootstrap/Button'
import {AiOutlinePlus} from 'react-icons/ai'
import './index.css'
import ModalBtn from '../modal'

const Header = ({
  heading,
  addTransactionBtn,
  transactionTypes,
  activeTab,
  setActiveTab,
}) => {
  const [showModal, setShowModal] = useState(false)
  const handleClick = async data => {
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
      setShowModal(false)
    } catch (error) {
      toast.error('Something Went Wrong')
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between header align-items-center py-2 px-3">
        <h2>{heading}</h2>
        {addTransactionBtn && (
          <>
            <Button
              variant="primary"
              onClick={() => {
                setShowModal(true)
              }}
              className="d-none d-lg-block"
            >
              <AiOutlinePlus size="20" className="me-2" />
              Add Transaction
            </Button>
            {showModal && (
              <ModalBtn
                handleEvent={handleClick}
                show={showModal}
                handleHide={setShowModal}
                formType="Add"
              />
            )}
          </>
        )}
      </div>
      {transactionTypes && (
        <ul className="header-list">
          {transactionTypes.map(item => (
            <li
              onClick={() => setActiveTab(item.type)}
              key={item.id}
              className={`list-item ${
                activeTab === item.type &&
                'text-primary border-bottom border-2 border-primary'
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  )
}
export default Header
