import {useLocation} from 'react-router-dom'
import Sidebar from '../../common-components/sidebar'
import './index.css'
import NavigationBar from '../../common-components/navbar'

const AuthenticatedRoute = ({children}) => {
  const location = useLocation()
  return (
    <div className="d-lg-flex display-page">
      <NavigationBar />
      <Sidebar path={location.pathname} />
      <div className="main-page">{children}</div>
    </div>
  )
}
export default AuthenticatedRoute
