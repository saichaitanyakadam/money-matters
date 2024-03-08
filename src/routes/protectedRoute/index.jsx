import {Navigate, Outlet} from 'react-router-dom'
<<<<<<< HEAD
import Cookie from 'js-cookie'

const ProtectedRoute = () => {
  const accessToken = Cookie.get('accessToken')
  return accessToken ? <Outlet /> : <Navigate to="/login" />
=======
import Cookies from 'js-cookie'

const ProtectedRoute = () => {
  const user = Cookies.get('user')
  //   const adminId = Cookies.get('admin_id')
  return user ? <Outlet /> : <Navigate to="/login" />
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
}

export default ProtectedRoute
