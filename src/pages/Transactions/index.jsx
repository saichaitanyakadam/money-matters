import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import Cookies from 'js-cookie'
import Header from '../../common-components/Header'
import DataTable from '../../common-components/data-table'
import {tableHeader, transactionTypes} from '../../constants/AppConstants'
import LoaderView from '../../common-components/loader'
import 'react-toastify/dist/ReactToastify.css'

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(0)
  const user = Cookies.get('user')
  const errorMsg = ''
  const getData = useCallback(async () => {
    try {
      const {data} = await axios.get('http://localhost:4500/api/transactions', {
        headers: {
          'content-type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4MzgxMzU1MjE2NDVjZTlkYjRmZGMiLCJ1c2VybmFtZSI6Im1vbnUiLCJpYXQiOjE3MDg2NzU0ODcsImV4cCI6MTcwOTUzOTQ4N30.eJCWS5520blPsgkAth2oQZRTqo_-1cTBMVYJP4AEdCU',
        },
        params: {
          limit: 10,
          offset: limit * 10,
        },
      })
      setTableData(data)
    } catch (e) {
      setError(true)
      toast.error('Something Went Wrong')
      errorMsg.current = e.message
    }
    setLoading(false)
  }, [limit])
  useEffect(() => {
    getData()
  }, [getData])

  let filteredData = tableData
  if (activeTab === 'credit') {
    filteredData = tableData.filter(item => item.type === activeTab)
  } else if (activeTab === 'debit') {
    filteredData = tableData.filter(item => item.type === activeTab)
  }

  return (
    <div className="w-100">
      <Header
        heading="Transactions"
        addTransactionBtn={user === 'user'}
        transactionTypes={transactionTypes}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        getData={getData}
      />
      <div className="px-4 py-3">
        {loading ? (
          <LoaderView />
        ) : (
          <div>
            {error ? (
              <p>{errorMsg}</p>
            ) : (
              <DataTable
                tableHeader={tableHeader}
                tableData={filteredData}
                pagination
                limit={limit}
                setLimit={setLimit}
                getData={getData}
              />
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}
export default Transactions
