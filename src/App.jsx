import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Transactions from './pages/Transactions'
import Login from './pages/Login'
import ProtectedRoute from './routes/protectedRoute'
import AuthenticatedRoute from './routes/authenticatedRoute'
import ModalBtn from './common-components/modal'
import ActionModal from './common-components/action-modal'
import SignUp from './pages/SignUp'
import ProfileModal from './common-components/profile-modal'

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          exact
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <AuthenticatedRoute>
              <Transactions />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <AuthenticatedRoute>
              <ModalBtn />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/edit-transaction/:transactionId"
          element={
            <AuthenticatedRoute>
              <ModalBtn />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/delete-transaction/:transactionId"
          element={
            <AuthenticatedRoute>
              <ActionModal />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <AuthenticatedRoute>
              <ProfileModal />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/sign-out"
          element={
            <AuthenticatedRoute>
              <ActionModal />
            </AuthenticatedRoute>
          }
        />
      </Route>
      <Route element={<Login />} path="/login" />
      <Route element={<SignUp />} path="/sign-up" />
    </Routes>
  )
}

export default App
