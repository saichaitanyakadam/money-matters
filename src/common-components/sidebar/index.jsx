import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './index.css'
import {FiLogOut} from 'react-icons/fi'
import Logo from '../../assets/Logo.png'
import {SIDEBAR} from '../../constants/AppConstants'
import profilePic from '../../assets/Avatar.svg'
import ActionModal from '../action-modal'

const Sidebar = ({path}) => {
  const [profileData, setProfileData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
<<<<<<< HEAD

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
=======
  useEffect(() => {
    const getData = async () => {
      try {
        const userId = Cookies.get('user_id')
        const user = Cookies.get('user')
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
        setProfileData(users[0])
      } catch (e) {
        console.error(e.message)
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
      }
    }
    getData()
  }, [])

<<<<<<< HEAD
=======
  const onLogout = () => {
    Cookies.remove('user_id')
    Cookies.remove('user')
    navigate('/login')
  }

>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
  return (
    <div className="sidebar d-flex flex-column justify-content-between position-fixed d-none d-lg-flex">
      <div>
        <Link to="/">
          <img src={Logo} alt="company-logo" className="m-3 col-10" />
        </Link>
        <div>
          {SIDEBAR.map(item => (
            <Link
              to={item.path}
              className={`nav-link ${
                path === item.path &&
                'border-start border-3 border-primary text-primary'
              }`}
              key={item.key}
            >
              <div>{item.icon}</div>
              <p className="ms-3 sidebar-label">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
<<<<<<< HEAD
      <div className="d-flex align-items-center gap-2 mb-3 p-3">
        <img
          src={profileData.profilePic}
          alt="profile"
          width={50}
          onError={event => {
            event.target.src =
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
          }}
          className="object-fit-cover rounded-circle"
          height={50}
        />
        <div className="flex-grow-1">
          <p className="m-0 ">{profileData?.username}</p>
=======
      <div className="d-flex align-items-center justify-content-between mb-3 p-3">
        <img src={profilePic} alt="profile" width={40} />
        <div>
          <p className="m-0 ">{profileData?.name}</p>
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
          <p className="m-0 ">{profileData?.email}</p>
        </div>
        <FiLogOut
          className="action-btn"
          onClick={() => {
<<<<<<< HEAD
            navigate('/sign-out', {state: 'Logout'})
          }}
        />
=======
            setShowModal(true)
          }}
        />
        {showModal && (
          <ActionModal
            handleHide={setShowModal}
            show={showModal}
            type="Logout"
            handleEvent={onLogout}
          />
        )}
>>>>>>> 2f0fdb8a5317f7a953eeaca0d885142be7a55de8
      </div>
    </div>
  )
}

export default Sidebar
