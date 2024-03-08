import {useState} from 'react'
import axios from 'axios'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
<<<<<<< HEAD
=======
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
import Table from 'react-bootstrap/Table'
import {BsArrowDownCircle, BsArrowUpCircle, BsTrash} from 'react-icons/bs'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import './index.css'
<<<<<<< HEAD
import profilePic from '../../assets/Ellipse103.png'
import {tableHead} from '../../constants/AppConstants'
import {useNavigate} from 'react-router-dom'

const DataTable = ({tableHeader, tableData, pagination, setLimit, getData}) => {
  const navigate = useNavigate()
=======
import ActionModal from '../action-modal'
import profilePic from '../../assets/Ellipse103.png'
import {tableHead} from '../../constants/AppConstants'
import ModalBtn from '../modal'

const DataTable = ({tableHeader, tableData, pagination, setLimit, getData}) => {
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
  const handleLimit = () => {
    setLimit(prev => (prev <= 0 ? prev : prev - 1))
  }
  const handleLimitNext = () => {
    setLimit(prev => prev + 1)
  }

<<<<<<< HEAD
  const onDelete = async () => {
    try {
      await axios.delete(
        'http://localhost:4500/api/transactions/65d8562476f6dafabee8e0d7',
        {
          headers: {
            'content-type': 'application/json',
=======
  const [deleteData, setDeleteData] = useState({})
  const [editData, setEditData] = useState({})
  const [editModal, setEditModal] = useState(false)
  const user = Cookies.get('user')
  const userId = Cookies.get('user_id')
  const [showModal, setShowModal] = useState(false)

  const handleEdit = async data => {
    try {
      await axios.post(
        'https://bursting-gelding-24.hasura.app/api/rest/update-transaction',
        {
          name: data.transaction_name,
          type: data.type,
          category: data.category,
          amount: data.amount,
          date: data.date,
          id: editData.id,
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
      toast.success('Transaction Updated')
      setEditModal(false)
      getData()
    } catch (error) {
      toast.error('Something Went Wrong')
      console.error(error)
    }
  }

  const onDelete = async () => {
    try {
      await axios.delete(
        'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction',
        {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret':
              'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': user,
            'x-hasura-user-id': userId,
          },
          params: {
            id: deleteData.id,
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
          },
        },
      )
      toast.success('Transaction Deleted')
<<<<<<< HEAD
=======
      setShowModal(false)
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
      getData()
    } catch (error) {
      toast.error('Something Went Wrong')
      console.error(error)
    }
  }

  return (
    <>
      <Table responsive>
        {tableHeader && (
          <thead>
            <tr>
              {tableHead.map(item => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {tableData.map(item => (
<<<<<<< HEAD
            <tr key={item?._id}>
              <td
                className={`col-4 m-0 p-2 ${
                  item.transactionType === 'debit'
                    ? 'text-danger'
                    : 'text-success'
                }`}
              >
                {item.transactionType === 'debit' ? (
=======
            <tr key={item.id}>
              <td
                className={`col-4 m-0 p-2 ${
                  item.type === 'debit' ? 'text-danger' : 'text-success'
                }`}
              >
                {item.type === 'debit' ? (
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
                  <BsArrowDownCircle className="me-2" size="20" />
                ) : (
                  <BsArrowUpCircle className="me-2" size="20" />
                )}
<<<<<<< HEAD
                {/* {user === 'admin' && (
                  <img src={profilePic} alt="profile" className="me-2" />
                )} */}
                {item.transactionName}
              </td>
              <td className="col-2 m-0  p-2">{item.category}</td>
              <td className="col-3 m-0 p-2">
                {format(new Date(item.createdAt), 'dd MMM,hh.mm aa')}
              </td>
              <td
                className={`col-2 p-2 m-0 ${
                  item.transactionType === 'debit'
                    ? 'text-danger'
                    : 'text-success'
                }`}
              >
                {item.transactionType === 'debit' ? '-' : '+'}${item.amount}
              </td>
              <td className="col-1">
                <MdOutlineModeEditOutline
                  className="text-primary me-3 cursor-pointer action-btn action-btn-edit"
                  onClick={() => {
                    navigate(`/edit-transaction/${item._id}`, {state: item})
=======
                {user === 'admin' && (
                  <img src={profilePic} alt="profile" className="me-2" />
                )}
                {item.transaction_name}
              </td>
              <td className="col-2 m-0  p-2">{item.category}</td>
              <td className="col-3 m-0 p-2">
                {format(new Date(item.date), 'dd MMM,hh.mm aa')}
              </td>
              <td
                className={`col-2 p-2 m-0 ${
                  item.type === 'debit' ? 'text-danger' : 'text-success'
                }`}
              >
                {item.type === 'debit' ? '-' : '+'}${item.amount}
              </td>
              <td className="col-1 p-2">
                <MdOutlineModeEditOutline
                  className="text-primary me-3 cursor-pointer action-btn action-btn-edit"
                  onClick={() => {
                    setEditModal(true)
                    setEditData(item)
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
                  }}
                />
                <BsTrash
                  className="text-danger action-btn action-btn-delete"
                  onClick={() => {
<<<<<<< HEAD
                    navigate(`delete-transaction/${item._id}`, {
                      state: 'Delete',
                    })
                  }}
                />
=======
                    setShowModal(true)
                    setDeleteData(item)
                  }}
                />
                {showModal && (
                  <ActionModal
                    show={showModal}
                    handleEvent={() => {
                      onDelete(item.id)
                    }}
                    handleHide={setShowModal}
                    type="Delete"
                  />
                )}
                {editModal && (
                  <ModalBtn
                    show={editData}
                    formData={editData}
                    handleEvent={handleEdit}
                    handleHide={setEditModal}
                    formType="Update"
                  />
                )}
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        {pagination && (
          <div className="d-flex justify-content-end gap-4">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleLimit}
            >
              prev
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleLimitNext}
            >
              next
            </button>
          </div>
        )}
<<<<<<< HEAD
=======
        <ToastContainer />
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
      </div>
    </>
  )
}

export default DataTable
