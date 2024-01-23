import {useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {useForm} from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {
  TransactionsTypeDropdown,
  CategoryDropdown,
} from '../../constants/AppConstants'
import './index.css'

const ModalBtn = ({handleEvent, formData, show, handleHide, formType}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm()

  useEffect(() => {
    if (formData) {
      setValue('transaction_name', formData?.transaction_name)
      setValue('amount', formData?.amount)
      setValue('date', formData?.date.substr(0, 10))
      setValue('type', formData?.type)
      setValue('category', formData?.category)
    }
  }, [setValue, formData])

  const onSubmitForm = data => {
    handleEvent(data)
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
