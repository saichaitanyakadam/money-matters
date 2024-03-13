import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {
  TransactionsTypeDropdown,
  CategoryDropdown,
} from '../../constants/AppConstants'
import './index.css'
import {useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie'

const ModalBtn = ({handleEvent, formType}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm()
  const [show, setShow] = useState(true)
  const location = useLocation()
  const formData = location?.state
  const params = useParams()

  useEffect(() => {
    if (formData) {
      setValue('transactionName', formData?.transactionName)
      setValue('amount', formData?.amount)
      setValue('transactionType', formData?.transactionType)
      setValue('category', formData?.category)
    }
  }, [setValue, formData])

  const handleEdit = async (data, accessToken) => {
    try {
      await axios.put(
        `https://money-matters-backend.onrender.com/api/transactions/${params.transactionId}`,
        {
          transactionName: data.transactionName,
          transactionType: data.transactionType,
          category: data.category,
          amount: data.amount,
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleAdd = async (data, accessToken) => {
    try {
      await axios.post(
        'https://money-matters-backend.onrender.com/api/transactions/add',
        {
          transactionName: data.transactionName,
          transactionType: data.transactionType,
          category: data.category,
          amount: data.amount,
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmitForm = data => {
    const accessToken = Cookie.get('accessToken')
    location.pathname.includes('edit-transaction')
      ? handleEdit(data, accessToken)
      : handleAdd(data, accessToken)
    setShow(false)
    window.history.back()
  }
  return (
    <Modal
      show={show}
      onHide={() => {
        window.history.back()
        setShow(false)
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {formType} Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {formType === 'Update'
            ? 'You can update your transaction here'
            : 'To Add Transaction Fill The Below Form'}
        </p>
        <form onSubmit={handleSubmit(onSubmitForm)} className="w-100">
          <div className="">
            <label htmlFor="transactionName">Transaction Name</label>
            <input
              id="transactionName"
              type="text"
              className="form-control"
              placeholder="Name"
              {...register('transactionName', {required: true, maxLength: 20})}
            />
            {errors.transactionName && (
              <p className="error mb-0">Enter Valid Name</p>
            )}
          </div>
          <div className="">
            <label htmlFor="transactionType">Transaction Type</label>
            <select
              id="transactionType"
              {...register('transactionType', {required: true})}
              className="form-select"
            >
              <option value="">Select</option>
              {TransactionsTypeDropdown?.map(type => (
                <option key={type.id} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.transactionType && (
              <p className="error mb-0">Select valid type</p>
            )}
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
          <div className="d-flex flex-column align-items-stretch mt-3">
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default ModalBtn
