import {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../../common-components/Header'
import './index.css'
import LoaderView from '../../common-components/loader'
import profile from '../../assets/pexels-christina-morillo-1181690 1.png'
import {profileForm} from '../../constants/AppConstants'
import {MdOutlineModeEdit} from 'react-icons/md'

const Profile = () => {
  const [loading, setLoading] = useState(true)

  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    const getData = async () => {
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
      setLoading(false)
    }
    getData()
  }, [])

  return (
    <div className="">
      <Header heading="Profile" addTransactionBtn />
      {loading ? (
        <LoaderView />
      ) : (
        <div className="container">
          <div className="row px-4">
            <div className="col-12 col-lg-4 p-3 d-flex justify-content-center">
              <div className="rounded-circle position-relative">
                <img
                  src={profileData?.profilePic}
                  alt="profilePic"
                  onError={event => {
                    event.target.src =
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                  }}
                  className="rounded-circle object-fit-cover"
                  height={200}
                  width={200}
                />
                <input type="file" className="d-none" />
              </div>
            </div>
            <div className="col-12 col-lg-8 p-3">
              <div className="row d-flex flex-column flex-lg-row gap-2">
                <div className="col-12 col-lg-10 m-0">
                  <p className="m-0">Username</p>
                  <div className="border border-secondary ps-2 fw-bolder d-flex align-items-center p-1">
                    {profileData.username}
                  </div>
                </div>
                <div className="col-12 col-lg-10 m-0">
                  <p className="m-0">Email</p>
                  <div className="border border-secondary ps-2 fw-bolder d-flex align-items-center p-1">
                    {profileData.email}
                  </div>
                </div>
                <div className="col-12 col-lg-10 m-0">
                  <p className="m-0">Password</p>
                  <div className="border border-secondary ps-2 fw-bolder d-flex align-items-center p-1">
                    ********
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Profile
