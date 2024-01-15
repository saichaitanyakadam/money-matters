import {useState, useEffect, useRef, useCallback} from 'react'
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
  const [limit, setLimit] = useState(10)
  const user = Cookies.get('user')
  const errorMsg = useRef('')
  const getData = useCallback(async () => {
    try {
      const {data} = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/all-transactions',
        {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret':
              'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': '',
            'x-hasura-user-id': '',
          },
          params: {
            limit,
            offset: 0,
          },
        },
      )
      const {transactions} = data

      setTableData(transactions)
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
