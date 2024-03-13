import {useLocation} from 'react-router-dom'
import Sidebar from '../../common-components/sidebar'
import './index.css'
import NavigationBar from '../../common-components/navbar'
import {useContext, useEffect, useState} from 'react'
import {AppContext} from '../../context/AppContext'
import Cookies from 'js-cookie'
import axios from 'axios'

const AuthenticatedRoute = ({children}) => {
  const location = useLocation()
  const [profileData, setProfileData] = useState({})
  useEffect(() => {
    const getData = async () => {
      const accessToken = Cookies.get('accessToken')
      try {
        const accessToken = Cookies.get('accessToken')
        const {data} = await axios.get(
          'http://localhost:4500/api/user/profile',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        setProfileData(data)
      } catch (e) {
        console.error(e)
      }
    }
    getData()
  }, [])
  return (
    <AppContext.Provider value={{profileData, setProfileData}}>
      <div className="d-lg-flex display-page">
        <NavigationBar />
        <Sidebar path={location.pathname} />
        <div className="main-page">{children}</div>
      </div>
    </AppContext.Provider>
  )
}
export default AuthenticatedRoute
