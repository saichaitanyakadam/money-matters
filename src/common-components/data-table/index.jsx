import {useNavigate} from 'react-router-dom'
import {useState, useRef} from 'react'
import axios from 'axios'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Table from 'react-bootstrap/Table'
import {BsArrowDownCircle, BsArrowUpCircle, BsTrash} from 'react-icons/bs'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import './index.css'
import ActionModal from '../action-modal'
import profilePic from '../../assets/Ellipse103.png'
import {tableHead} from '../../constants/AppConstants'

const DataTable = ({tableHeader, tableData, pagination, setLimit}) => {
  const handleLimit = () => {
    setLimit(prev => prev + 10)
  }
  const deleteData = useRef({})
  const navigate = useNavigate()
  const user = Cookies.get('user')
  const userId = Cookies.get('user_id')
  const [showModal, setShowModal] = useState(false)

  const onEdit = item => {
    navigate(`/edit-transaction`, {state: item})
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
            id: deleteData.current,
          },
        },
      )
      setShowModal(false)
    } catch (error) {
      console.error(error.message)
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
            <tr key={item.id}>
              <td
                className={`col-4 m-0 p-2 ${
                  item.type === 'debit' ? 'text-danger' : 'text-success'
                }`}
              >
                {item.type === 'debit' ? (
                  <BsArrowDownCircle className="me-2" size="20" />
                ) : (
                  <BsArrowUpCircle className="me-2" size="20" />
                )}
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
                    onEdit(item)
                  }}
                />
                <BsTrash
                  className="text-danger action-btn action-btn-delete"
                  onClick={() => {
                    setShowModal(true)
                    deleteData.current = item.id
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        {pagination && (
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleLimit}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default DataTable
