import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Transactions from './pages/Transactions'
import Login from './pages/Login'
import ProtectedRoute from './routes/protectedRoute'
import AuthenticatedRoute from './routes/authenticatedRoute'

const App = () => (
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
    </Route>
    <Route element={<Login />} path="/login" />
  </Routes>
)

export default App
