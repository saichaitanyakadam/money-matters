import {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Header from '../../common-components/Header'
import DataTable from '../../common-components/data-table'
import {tableHeader, transactionTypes} from '../../constants/AppConstants'
import LoaderView from '../../common-components/loader'

const Transactions = () => {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    try {
      const accessToken = Cookies.get('accessToken')
      const {data} = await axios.get('http://localhost:4500/api/transactions', {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setTableData(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="w-100">
      <Header
        heading="Transactions"
        transactionTypes={transactionTypes}
        getData={getData}
      />
      <div className="px-4 py-3">
        {loading ? (
          <LoaderView />
        ) : (
          <div>
            <DataTable
              tableHeader={tableHeader}
              tableData={tableData}
              pagination
              getData={getData}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Transactions
