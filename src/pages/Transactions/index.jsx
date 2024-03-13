import {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Header from '../../common-components/Header'
import DataTable from '../../common-components/data-table'
import {tableHeader, transactionTypes} from '../../constants/AppConstants'
import LoaderView from '../../common-components/loader'
import EmptyTransactionView from '../../common-components/empty-transaction'

const Transactions = () => {
  const [tableData, setTableData] = useState([])
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const getData = async () => {
    try {
      const accessToken = Cookies.get('accessToken')
      const {data} = await axios.get(
        `http://localhost:4500/api/transactions/?type=${type}`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            offset,
          },
        },
      )
      setTableData(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [offset, type])

  return (
    <div className="w-100">
      <Header
        heading="Transactions"
        addTransactionBtn={true}
        type={type}
        setType={setType}
        getData={getData}
      />
      {transactionTypes && (
        <ul className="header-list">
          {transactionTypes.map(item => (
            <li
              onClick={() => {
                setType(item.type)
                setOffset(0)
              }}
              key={item.id}
              className={`list-item ${
                type === item.type &&
                'text-primary border-bottom border-2 border-primary'
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
      <div className="px-4 py-3">
        {loading ? (
          <LoaderView />
        ) : tableData.length < 1 ? (
          <EmptyTransactionView />
        ) : (
          <DataTable
            offset={offset}
            tableHeader={tableHeader}
            tableData={tableData}
            pagination
            setOffset={setOffset}
          />
        )}
      </div>
    </div>
  )
}
export default Transactions
