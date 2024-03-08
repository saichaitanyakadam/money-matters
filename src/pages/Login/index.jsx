import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Cookie from 'js-cookie'
import './index.css'

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const onFormSubmit = async credential => {
    try {
      const {data} = await axios.post('http://localhost:4500/api/user/login', {
        username: credential.username,
        password: credential.password,
      })
      Cookie.set('accessToken', data, {
        expires: 15,
      })
      navigate('/')
    } catch (error) {
      console.error(error)
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
            <label htmlFor="username">Username or Email</label>{' '}
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
              <p className="error mb-0">Username or Email is required</p>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="password">Password</label>{' '}
            <span className="error">*</span>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="form-control mt-1"
              placeholder="Password"
              {...register('password', {required: true, maxLength: 20})}
            />
            {errors.password && (
              <p className="error mb-0">Password is required</p>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary ">
          Login
        </button>
        <p>
          Don't have account? <Link to="/sign-up">Sign up</Link>
        </p>
      </form>
    </div>
  )
}
export default Login