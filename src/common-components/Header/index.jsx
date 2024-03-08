import {useState} from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button'
import {AiOutlinePlus} from 'react-icons/ai'
import './index.css'
import ModalBtn from '../modal'
import {useNavigate} from 'react-router-dom'

const Header = ({
  heading,
  addTransactionBtn,
  transactionTypes,
  activeTab,
  setActiveTab,
  getData,
}) => {
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
    </div>
  )
}
export default Header
