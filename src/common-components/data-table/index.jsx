import {useState} from 'react'
import axios from 'axios'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Table from 'react-bootstrap/Table'
import {BsArrowDownCircle, BsArrowUpCircle, BsTrash} from 'react-icons/bs'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import './index.css'
import profilePic from '../../assets/Ellipse103.png'
import {tableHead} from '../../constants/AppConstants'
import {useNavigate} from 'react-router-dom'

const DataTable = ({tableHeader, tableData, pagination, setLimit, getData}) => {
  const navigate = useNavigate()
  const handleLimit = () => {
    setLimit(prev => (prev <= 0 ? prev : prev - 1))
  }
  const handleLimitNext = () => {
    setLimit(prev => prev + 1)
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
            <tr key={item?._id}>
              <td
                className={`col-4 m-0 p-2 ${
                  item.transactionType === 'debit'
                    ? 'text-danger'
                    : 'text-success'
                }`}
              >
                {item.transactionType === 'debit' ? (
                  <BsArrowDownCircle className="me-2" size="20" />
                ) : (
                  <BsArrowUpCircle className="me-2" size="20" />
                )}
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
                  }}
                />
                <BsTrash
                  className="text-danger action-btn action-btn-delete"
                  onClick={() => {
                    navigate(`delete-transaction/${item._id}`, {
                      state: 'Delete',
                    })
                  }}
                />
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
      </div>
    </>
  )
}

export default DataTable
