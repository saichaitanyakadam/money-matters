import {Navigate, Outlet} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = () => {
  const user = Cookies.get('user')
  //   const adminId = Cookies.get('admin_id')
  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
