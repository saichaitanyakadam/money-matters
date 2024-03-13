import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Cookie from 'js-cookie'
import './index.css'
import toast, {Toaster} from 'react-hot-toast'

const SignUp = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const onFormSubmit = async credential => {
    const formData = new FormData()
    formData.append('username', credential.username)
    formData.append('email', credential.email)
    formData.append('password', credential.password)
    formData.append('profilePic', credential.profilePic[0])
    try {
      await axios.post('http://localhost:4500/api/user/register', formData)
      navigate('/login')
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data)
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 login-page">
      <form
        className="d-flex flex-column gap-3 p-3 form-card"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="row d-flex  flex-column gap-3 justify-content-center">
          <div className="col-12">
            <label htmlFor="username">Username</label>{' '}
            <span className="error">*</span>
            <input
              id="username"
              type="text"
              autoComplete="username"
              className="form-control mt-1"
              placeholder="Enter Username or Email"
              {...register('username', {required: true, maxLength: 20})}
            />
            {errors.username && (
              <p className="error mb-0">Username is required</p>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="email">Email</label>{' '}
            <span className="error">*</span>
            <input
              id="email"
              type="email"
              className="form-control mt-1"
              placeholder="Enter Username or Email"
              {...register('email', {required: true, maxLength: 20})}
            />
            {errors.email && <p className="error mb-0">Email is required</p>}
          </div>

          <div className="col-12">
            <label htmlFor="password">Password</label>{' '}
            <span className="error">*</span>
            <input
              id="password"
              autoComplete="new-password"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              {...register('password', {required: true, maxLength: 20})}
            />
            {errors.password && (
              <p className="error mb-0">Password is required</p>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="profilePic">Select Profile Pic</label>{' '}
            <input
              id="profilePic"
              type="file"
              className="form-control mt-1"
              {...register('profilePic')}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary ">
          Sign Up
        </button>
        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
      <Toaster />
    </div>
  )
}
export default SignUp
