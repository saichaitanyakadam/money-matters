import {useState} from 'react'
import axios from 'axios'
<<<<<<< HEAD
import Cookie from 'js-cookie'
=======
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
import Button from 'react-bootstrap/Button'
import {AiOutlinePlus} from 'react-icons/ai'
import './index.css'
import ModalBtn from '../modal'
<<<<<<< HEAD
import {useNavigate} from 'react-router-dom'
=======
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8

const Header = ({
  heading,
  addTransactionBtn,
  transactionTypes,
  activeTab,
  setActiveTab,
  getData,
}) => {
<<<<<<< HEAD
  const navigate = useNavigate()
=======
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
      getData()
    } catch (error) {
      toast.error('Something Went Wrong')
    }
  }
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8

  return (
    <div>
      <div className="d-flex justify-content-between header align-items-center py-2 px-3">
        <h2>{heading}</h2>
        {addTransactionBtn && (
          <>
            <Button
              variant="primary"
              onClick={() => {
<<<<<<< HEAD
                navigate('/add-transaction')
=======
                setShowModal(true)
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
              }}
              className="d-none d-lg-block"
            >
              <AiOutlinePlus size="20" className="me-2" />
              Add Transaction
            </Button>
<<<<<<< HEAD
=======
            {showModal && (
              <ModalBtn
                handleEvent={handleClick}
                show={showModal}
                handleHide={setShowModal}
                formType="Add"
              />
            )}
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
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
<<<<<<< HEAD
=======
      <ToastContainer />
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
    </div>
  )
}
export default Header
