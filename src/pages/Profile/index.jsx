import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../../common-components/Header'
import './index.css'
import LoaderView from '../../common-components/loader'
import profile from '../../assets/pexels-christina-morillo-1181690 1.png'
import {profileForm} from '../../constants/AppConstants'

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const errorMsg = useRef('')

  const [error, setError] = useState(false)
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        const user = Cookies.get('user')
        const userId = Cookies.get('user_id')
        const {data} = await axios.get(
          'https://bursting-gelding-24.hasura.app/api/rest/profile',
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
        const {users} = data
        setProfileData(...users)
      } catch (e) {
        setError(true)
        errorMsg.current = e.message
      }
      setLoading(false)
    }
    getData()
  }, [])

  return (
    <div className="w-lg-100 row">
      <Header heading="Profile" addTransactionBtn />
      {loading ? (
        <LoaderView />
      ) : (
        <div className="px-4 py-3">
          {error ? (
            <p>{errorMsg}</p>
          ) : (
            <div className="d-lg-flex align-items-center p-3">
              <div className="w-100 w-lg-25 d-flex justify-content-center">
                <img
                  src={profile}
                  alt="profile"
                  className="rounded-circle me-3 mb-3"
                  width={150}
                />
              </div>
              <form className="">
                <div className="row">
                  <div className="col-6  mb-3">
                    <label htmlFor="yourName">{profileForm.name}</label>{' '}
                    <p id="yourName" className="form-control">
                      {profileData.name}
                    </p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="userName">{profileForm.userName}</label>{' '}
                    <p id="userName" className="form-control">
                      {profileData.name}
                    </p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="email">{profileForm.email}</label>{' '}
                    <p id="email" className="form-control">
                      {profileData.email}
                    </p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="password">{profileForm.password}</label>{' '}
                    <p
                      id="password"
                      className="form-control"
                    >{` ********** `}</p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="dateOfBirth">
                      {profileForm.dateOfBirth}
                    </label>{' '}
                    <p id="dateOfBirth" className="form-control">
                      {format(
                        new Date(profileData.date_of_birth),
                        'dd MMMM yyyy',
                      )}
                    </p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="presentAddress">
                      {profileForm.presentAddress}
                    </label>{' '}
                    <p id="presentAddress" className="form-control">
                      {profileData.present_address === null
                        ? 'San Jose, California, USA'
                        : profileData.present_address}
                    </p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="permanentAddress">
                      {profileForm.permanentAddress}
                    </label>{' '}
                    <p id="permanentAddress" className="form-control">
                      {profileData.permanent_address === null
                        ? 'San Jose, California, USA'
                        : profileData.permanent_address}
                    </p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="city">{profileForm.city}</label>{' '}
                    <p id="city" className="form-control">
                      {profileData.city === null ? 'San Jos' : profileData.city}
                    </p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="postalCode">{profileForm.postalCode}</label>{' '}
                    <p id="postalCode" className="form-control">
                      {profileData.postal_code === null
                        ? '45962'
                        : profileData.postal_code}
                    </p>
                  </div>
                  <div className="col-6  mb-3">
                    <label htmlFor="country">{profileForm.country}</label>{' '}
                    <p id="country" className="form-control">
                      {profileData.country === null
                        ? 'USA'
                        : profileData.country}
                    </p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default Profile
