import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useForm} from 'react-hook-form'
import {useContext, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {AppContext} from '../../context/AppContext'

const ProfileModal = ({show, handleHide}) => {
  const {
    register,
    setValue,
    formState: {errors},
    handleSubmit,
  } = useForm()
  const {profileData, setProfileData} = useContext(AppContext)

  useEffect(() => {
    if (profileData) {
      setValue('username', profileData.username)
      setValue('email', profileData.email)
    }
  }, [])

  const onSubmitForm = async credential => {
    const accessToken = Cookies.get('accessToken')
    const formData = new FormData()
    formData.append('username', credential.username)
    formData.append('email', credential.email)
    if (credential.password) formData.append('password', credential.password)
    if (credential.profilePic[0])
      formData.append('profilePic', credential.profilePic[0])
    const {data} = await axios.put(
      'http://localhost:4500/api/user/profile/edit',
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    setProfileData(data)
    handleHide()
  }

  return (
    <Modal
      show={show}
      onHide={handleHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitForm)} className="w-100">
          <div className="">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="Name"
              {...register('username', {required: true, maxLength: 20})}
            />
            {errors.username && (
              <p className="error mb-0">Enter Valid Username</p>
            )}
          </div>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Email"
              {...register('email', {required: true, maxLength: 20})}
            />
            {errors.email && <p className="error mb-0">Enter Valid Email</p>}
          </div>
          <div className="">
            <label htmlFor="password">Change Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter New Password"
              {...register('password')}
            />
          </div>
          <div className="">
            <label htmlFor="profilePic">Profile Pic</label>
            <input
              id="profilePic"
              type="file"
              className="form-control"
              placeholder="ProfilePic"
              {...register('profilePic')}
            />
          </div>

          <div className="d-flex flex-column align-items-stretch mt-3">
            <Button type="submit">Save Profile</Button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProfileModal
