import {useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../../common-components/Header'
import creditImage from '../../assets/Group.svg'
import './index.css'
import DataTable from '../../common-components/data-table'
import LoaderView from '../../common-components/loader'
import BarChartView from '../../common-components/bar-chart'
import debitImage from '../../assets/debit.svg'

const groupArrayItemsByDate = arr => {
  const groupedItems = {}

  arr.forEach(item => {
    const date = item.date.split('T')[0]

    if (!groupedItems[date]) {
      groupedItems[date] = [item]
    } else {
      groupedItems[date].push(item)
    }
  })

  return groupedItems
}

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [amountData, setAmountData] = useState([])
  const [graphData, setGraphData] = useState([])
  const [error, setError] = useState(false)
  const errorMsg = useRef('')
  const [transactionsData, setTransactionsData] = useState([])
  const getData = useCallback(async () => {
    const userId = Cookies.get('user_id')
    const user = Cookies.get('user')
    try {
      const {data} = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/all-transactions',
        {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret':
              'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': user,
            'x-hasura-user-id': userId,
          },
          params: {
            limit: 100,
            offset: 0,
          },
        },
      )
      const res = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days',
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
      const amountRes = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals',
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
      const amountInfo = amountRes.data.totals_credit_debit_transactions
      setAmountData(amountInfo)

      const responseData = res.data.last_7_days_transactions_credit_debit_totals

      const arr = groupArrayItemsByDate(responseData)
      const dates = Object.keys(arr)
      const modifiedData = []
      dates.forEach(element => {
        modifiedData.push({
          date: element,
          credit: arr[element].filter(item => item.type === 'credit')[0]?.sum,
          debit: arr[element].filter(item => item.type === 'debit')[0]?.sum,
        })
      })
      setGraphData(modifiedData)

      const {transactions} = data
      const sortedArr = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
      setTransactionsData(sortedArr)
    } catch (e) {
      setError(true)
      errorMsg.current = e.message
      console.error(e)
      toast.error('Something Went Wrong')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    console.log('home')

    getData()
  }, [getData])

  let weekDebit = 0
  let weekCredit = 0

  graphData.forEach(item => {
    weekDebit += item.debit ? item.debit : 0
    weekCredit += item.credit ? item.credit : 0
  })
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
              <div className="d-lg-flex col-lg-6 mb-5 ">
                <div className="w-lg-50 col-12 d-flex justify-content-around">
                  <p className="amount-text text-success">
                    ${amountData?.filter(item => item.type === 'credit')[0].sum}{' '}
                    <br />
                    <span>Credit</span>
                  </p>
                  <img
                    src={creditImage}
                    alt="credit"
                    className="dashboard-image"
                  />
                </div>
                <div className="w-lg-50 d-flex col-12 justify-content-around">
                  <p className="amount-text text-danger">
                    ${amountData?.filter(item => item.type === 'debit')[0].sum}{' '}
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
              <p className="week-amount-text mb-0">
                <span>${weekDebit}</span> Debited & <span>${weekCredit}</span>{' '}
                Credited in this Week
              </p>
              <BarChartView graphData={graphData} />
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
export default Home
