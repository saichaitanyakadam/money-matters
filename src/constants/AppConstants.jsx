import {AiFillHome} from 'react-icons/ai'
import {MdAttachMoney} from 'react-icons/md'
import {BsPersonFill} from 'react-icons/bs'

export const tableHead = ['Transaction Name', 'Category', 'Date', 'Amount', ' ']

export const SIDEBAR = [
  {
    id: 1,
    key: 'dashboard',
    label: 'Dashboard',
    icon: <AiFillHome size="25" />,
    path: '/',
  },
  {
    id: 2,
    key: 'transactions',
    label: 'Transactions',
    icon: <MdAttachMoney size="25" />,
    path: '/transactions',
  },
  {
    id: 1,
    key: 'profile',
    label: 'Profile',
    icon: <BsPersonFill size="25" />,
    path: '/profile',
  },
]

export const transactionTypes = [
  {
    id: 1,
    type: 'all',
    label: 'All Transactions',
  },
  {
    id: 2,
    type: 'debit',
    label: 'Debit',
  },
  {
    id: 3,
    type: 'credit',
    label: 'Credit',
  },
]

export const TransactionsTypeDropdown = [
  {
    id: 1,
    value: 'debit',
    label: 'Debit',
  },
  {
    id: 2,
    value: 'credit',
    label: 'Credit',
  },
]
export const CategoryDropdown = [
  {
    id: 1,
    value: 'shopping',
    label: 'Shopping',
  },
  {
    id: 2,
    value: 'transfer',
    label: 'Transfer',
  },
]

export const tableHeader = {
  transaction: 'Transaction Name',
  category: 'Category',
  date: 'Date',
  amount: 'Amount',
}
export const profileForm = {
  name: 'Your Name',
  userName: 'User Name',
  email: 'Email',
  dateOfBirth: 'Date of Birth',
  permanentAddress: 'Parmanent Address',
  postalCode: 'Postal Code',
  city: 'City',
  country: 'Country',
  presentAddress: 'Present Address',
  password: 'Password',
}
export const heading = 'hello world'
