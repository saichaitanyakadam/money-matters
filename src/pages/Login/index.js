import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Cookies from 'js-cookie'
import './index.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const onFormSubmit = async credential => {
    try {
      const {data} = await axios.post(
        'https://bursting-gelding-24.hasura.app/api/rest/get-user-id',

        {
          email: credential.email,
          password: credential.password,
        },
        {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret':
              'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          },
        },
      )
      const userId = data?.get_user_id[0]?.id
      if (userId) {
        Cookies.set('user_id', userId, {expires: 30})
        Cookies.set('user', credential.user, {expires: 30})
        navigate('/')
      }
    } catch (error) {
      toast.warn('Enter Valid Credentials')
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 login-page">
      <form
        className="w-lg-25 p-3 form-card"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="row d-flex flex-column justify-content-center">
          <div className="d-flex">
            <div className="me-3">
              <label htmlFor="user" className="label-text me-1">
                User
              </label>
              <input
                {...register('user', {required: true})}
                type="radio"
                value="user"
                id="user"
                checked
              />
            </div>
            <div>
              <label htmlFor="admin" className="label-text me-1">
                Admin
              </label>
              <input
                {...register('user', {required: true})}
                type="radio"
                value="admin"
                id="admin"
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="email">Transaction Name</label>{' '}
            <span className="error">*</span>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Email"
              {...register('email', {required: true, maxLength: 20})}
            />
            {errors.email && <p className="error mb-0">Email is required</p>}
          </div>
          <div className="col-12">
            <label htmlFor="password">Password</label>{' '}
            <span className="error">*</span>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              {...register('password', {required: true, maxLength: 20})}
            />
            {errors.password && (
              <p className="error mb-0">Password is required</p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-primary align-self-center">
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
export default Login
