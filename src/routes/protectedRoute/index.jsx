import {Navigate, Outlet} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = () => {
  const accessToken = Cookie.get('accessToken')
  return accessToken ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
