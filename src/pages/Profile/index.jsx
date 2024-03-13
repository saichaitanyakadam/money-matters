import {useState, useContext} from 'react'
import Header from '../../common-components/Header'
import './index.css'
import {AppContext} from '../../context/AppContext'
import ProfileModal from '../../common-components/profile-modal'

const Profile = () => {
  const [show, setShow] = useState(false)
  const {profileData} = useContext(AppContext)

  return (
    <div className="">
      <Header heading="Profile" edit handleEdit={() => setShow(true)} />
      {
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
          {show && (
            <ProfileModal show={show} handleHide={() => setShow(false)} />
          )}
        </div>
      }
    </div>
  )
}
export default Profile
