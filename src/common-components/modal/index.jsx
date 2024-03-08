<<<<<<< HEAD
import {useEffect, useState} from 'react'
=======
import {useEffect} from 'react'
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
import 'react-toastify/dist/ReactToastify.css'
import {useForm} from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {
  TransactionsTypeDropdown,
  CategoryDropdown,
} from '../../constants/AppConstants'
import './index.css'
<<<<<<< HEAD
import {useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie'

const ModalBtn = ({handleEvent, formType}) => {
=======

const ModalBtn = ({handleEvent, formData, show, handleHide, formType}) => {
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm()
<<<<<<< HEAD
  const [show, setShow] = useState(true)
  const location = useLocation()
  const formData = location?.state
  const params = useParams()

  useEffect(() => {
    if (formData) {
      setValue('transactionName', formData?.transactionName)
      setValue('amount', formData?.amount)
      setValue('transactionType', formData?.transactionType)
=======

  useEffect(() => {
    if (formData) {
      setValue('transaction_name', formData?.transaction_name)
      setValue('amount', formData?.amount)
      setValue('date', formData?.date.substr(0, 10))
      setValue('type', formData?.type)
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
      setValue('category', formData?.category)
    }
  }, [setValue, formData])

<<<<<<< HEAD
  const handleEdit = async (data, accessToken) => {
    try {
      await axios.put(
        `http://localhost:4500/api/transactions/${params.transactionId}`,
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
        'http://localhost:4500/api/transactions/add',
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
      console.log(error)
    }
  }

  const onSubmitForm = data => {
    const accessToken = Cookie.get('accessToken')
    location.pathname.includes('edit-transaction')
      ? handleEdit(data, accessToken)
      : handleAdd(data, accessToken)
    setShow(false)
    window.history.back()
=======
  const onSubmitForm = data => {
    handleEvent(data)
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
  }
  return (
    <Modal
      show={show}
      onHide={() => {
<<<<<<< HEAD
        window.history.back()
        setShow(false)
=======
        handleHide(false)
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
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
<<<<<<< HEAD
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
=======
        <form onSubmit={handleSubmit(onSubmitForm)}>
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
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
              <p className="error mb-0">Enter Valid Name</p>
            )}
          </div>
          <div className="">
            <label htmlFor="transactionType">Transaction Type</label>
            <select
              id="transactionType"
<<<<<<< HEAD
              {...register('transactionType', {required: true})}
=======
              {...register('type', {required: true})}
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
              className="form-select"
            >
              <option value="">Select</option>
              {TransactionsTypeDropdown?.map(type => (
                <option key={type.id} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
<<<<<<< HEAD
            {errors.transactionType && (
              <p className="error mb-0">Select valid type</p>
            )}
=======
            {errors.type && <p className="error mb-0">Select valid type</p>}
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
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
<<<<<<< HEAD
=======
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
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
          <div className="d-flex flex-column align-items-stretch mt-3">
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default ModalBtn
