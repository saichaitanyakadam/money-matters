import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {
  TransactionsTypeDropdown,
  CategoryDropdown,
} from '../../constants/AppConstants'
import './index.css'

const ModalBtn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm()

  const [modalShow, setModalShow] = useState(true)
  const transactionData = location.state

  useEffect(() => {
    if (location.pathname === '/edit-transaction') {
      setValue('transaction_name', transactionData?.transaction_name)
      setValue('amount', transactionData?.amount)
      setValue('date', transactionData?.date.substr(0, 10))
      setValue('type', transactionData?.type)
      setValue('category', transactionData?.category)
    }
  }, [transactionData, modalShow, setValue, location.pathname])

  const handleFormSubmit = async data => {
    if (location.pathname === '/edit-transaction') {
      try {
        await axios.post(
          'https://bursting-gelding-24.hasura.app/api/rest/update-transaction',
          {
            name: data.transaction_name,
            type: data.type,
            category: data.category,
            amount: data.amount,
            date: data.date,
            id: transactionData.id,
          },
          {
            headers: {
              'content-type': 'application/json',
              'x-hasura-admin-secret':
                'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
              'x-hasura-role': 'user',
              'x-hasura-user-id': 1,
            },
          },
        )
        setModalShow(false)
        navigate(-1)
      } catch (error) {
        console.error(error.message)
      }
    } else {
      try {
        await axios.post(
          'https://bursting-gelding-24.hasura.app/api/rest/add-transaction',
          {
            name: data.transaction_name,
            type: data.type,
            category: data.category,
            amount: data.amount,
            date: data.date,
            user_id: 1,
          },
          {
            headers: {
              'content-type': 'application/json',
              'x-hasura-admin-secret':
                'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
              'x-hasura-role': 'user',
              'x-hasura-user-id': 1,
            },
          },
        )
        setModalShow(false)
        navigate(-1)
      } catch (error) {
        console.error(error.message)
      }
    }
  }
  return (
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false)
        navigate(-1)
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {location.pathname === '/edit-transaction' ? 'Update' : 'Add'}{' '}
          Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {location.pathname === '/edit-transaction'
            ? 'You can update your transaction here'
            : 'To Add Transaction Fill The Below Form'}
        </p>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="">
            <label htmlFor="transaction_name">Transaction Name</label>
            <input
              id="transaction_name"
              type="text"
              className="form-control"
              placeholder="Name"
              {...register('transaction_name', {required: true, maxLength: 20})}
            />
            {errors.transaction_name && (
              <p className="error mb-0">Enter Valid Name</p>
            )}
          </div>
          <div className="">
            <label htmlFor="transactionType">Transaction Type</label>
            <select
              id="transactionType"
              {...register('type', {required: true})}
              className="form-select"
            >
              <option value="">Select</option>
              {TransactionsTypeDropdown?.map(type => (
                <option key={type.id} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && <p className="error mb-0">Select valid type</p>}
          </div>
          <div className="">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              {...register('category', {required: true})}
              className="form-select"
            >
              <option value="">Select</option>
              {CategoryDropdown?.map(status => (
                <option key={status.id} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            {errors.category && <p className="error mb-0">Select valid type</p>}
          </div>
          <div className="">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              className="form-control"
              placeholder="Select Amount"
              {...register('amount', {required: true, maxLength: 20})}
            />
            {errors.amount && <p className="error mb-0">Enter Valid Amount</p>}
          </div>
          <div className="">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              placeholder="Select Date"
              className="form-control"
              defaultValue={new Date().toISOString().slice(0, 10)}
              {...register('date', {
                required: true,
              })}
            />
            {errors.date && <p className="error mb-0">Enter Valid Date</p>}
          </div>
          <div className="d-flex flex-column align-items-stretch mt-3">
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default ModalBtn
