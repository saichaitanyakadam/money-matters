/* eslint-disable react/prop-types */
import {Link, useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import './index.css'
import {FiLogOut} from 'react-icons/fi'
import Logo from '../../assets/Logo.png'
import {SIDEBAR} from '../../constants/AppConstants'
import {AppContext} from '../../context/AppContext'

const Sidebar = ({path}) => {
  const {profileData} = useContext(AppContext)
  const navigate = useNavigate()

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
          <p className="m-0 ">{profileData?.email}</p>
        </div>
        <FiLogOut
          className="action-btn"
          onClick={() => {
            navigate('/sign-out', {state: 'Logout'})
          }}
        />
      </div>
    </div>
  )
}

export default Sidebar
