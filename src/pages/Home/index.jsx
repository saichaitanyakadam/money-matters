import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import Header from '../../common-components/Header'
import creditImage from '../../assets/Group.svg'
import './index.css'
import DataTable from '../../common-components/data-table'
import LoaderView from '../../common-components/loader'
import BarChartView from '../../common-components/bar-chart'
import debitImage from '../../assets/debit.svg'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [amountData, setAmountData] = useState([])
  const [weeklyData, setWeeklyData] = useState([])
  const [error, setError] = useState(false)
  const [transactionsData, setTransactionsData] = useState([])

  const getData = useCallback(async () => {
    const accessToken = Cookie.get('accessToken')
    const {data} = await axios.get('http://localhost:4500/api/transactions', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 3,
      },
    })
    setTransactionsData(data)
    const weeklyData = await axios.get(
      'http://localhost:4500/api/transactions/weekly-transactions',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    setWeeklyData(weeklyData.data)
    const amountData = await axios.get(
      'http://localhost:4500/api/transactions/amount',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    setAmountData(amountData.data)
  }, [])

  useEffect(() => {
    getData()
    setLoading(false)
  }, [])
  return (
    <div className="w-100">
      <Header heading="Accounts" addTransactionBtn getData={getData} />
      {loading ? (
        <LoaderView />
      ) : (
        <div className="px-4 py-3">
          {error ? (
            <p>{errorMsg}</p>
          ) : (
            <div className="row">
              <div className="d-flex flex-column flex-lg-row col-lg-6 mb-5 gap-2">
                <div className="w-lg-50 col-12 d-flex justify-content-between border p-3">
                  <p className="amount-text text-success">
                    $
                    {
                      amountData.filter(item => item?._id === 'credit')[0]
                        ?.value
                    }{' '}
                    <br />
                    <span>Credit</span>
                  </p>
                  <img
                    src={creditImage}
                    alt="credit"
                    className="dashboard-image"
                  />
                </div>
                <div className="w-lg-50 d-flex col-12 justify-content-between border p-3">
                  <p className="amount-text text-danger">
                    $
                    {amountData.filter(item => item?._id === 'debit')[0]?.value}{' '}
                    <br />
                    <span>Debit</span>
                  </p>
                  <img
                    src={debitImage}
                    alt="credit"
                    className="dashboard-image"
                  />
                </div>
              </div>
              <h3>Last Transactions</h3>
              <DataTable tableData={transactionsData} getData={getData} />
              <h3>Debit & Credit Overview</h3>
              <BarChartView graphData={weeklyData} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default Home
