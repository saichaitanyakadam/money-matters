/* eslint-disable react/prop-types */
import {useLocation} from 'react-router-dom'
import Sidebar from '../../common-components/sidebar'
import './index.css'
import NavigationBar from '../../common-components/navbar'
import {useEffect, useState} from 'react'
import {AppContext} from '../../context/AppContext'
import Cookies from 'js-cookie'
import axios from 'axios'

const AuthenticatedRoute = ({children}) => {
  const location = useLocation()
  const [profileData, setProfileData] = useState({})
  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = Cookies.get('accessToken')
        const {data} = await axios.get(
          'https://money-matters-backend.onrender.com/api/user/profile',
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
