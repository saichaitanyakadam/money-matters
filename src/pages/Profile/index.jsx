<<<<<<< HEAD
import {useState, useEffect} from 'react'
=======
import {useState, useEffect, useRef} from 'react'
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
import axios from 'axios'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../../common-components/Header'
import './index.css'
import LoaderView from '../../common-components/loader'
import profile from '../../assets/pexels-christina-morillo-1181690 1.png'
import {profileForm} from '../../constants/AppConstants'
<<<<<<< HEAD
import {MdOutlineModeEdit} from 'react-icons/md'

const Profile = () => {
  const [loading, setLoading] = useState(true)

=======

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const errorMsg = useRef('')

  const [error, setError] = useState(false)
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
<<<<<<< HEAD
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
=======
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
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
      }
      setLoading(false)
    }
    getData()
  }, [])

  return (
<<<<<<< HEAD
    <div className="">
=======
    <div className="w-lg-100 row">
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
      <Header heading="Profile" addTransactionBtn />
      {loading ? (
        <LoaderView />
      ) : (
<<<<<<< HEAD
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
=======
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
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
        </div>
      )}
    </div>
  )
}
export default Profile
