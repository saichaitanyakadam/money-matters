import './App.css'
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Transactions from './pages/Transactions'
import Login from './pages/Login'
import ProtectedRoute from './routes/protectedRoute'
import AuthenticatedRoute from './routes/authenticatedRoute'
import AppContext from './context/AppContext'

const App = () => {
  const [edited, setEdited] = useState(false)
  useEffect(() => {
    setEdited(false)
  }, [edited])
  return (
    <AppContext.Provider value={{edited, setEdited}}>
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
    </AppContext.Provider>
  )
}

export default App
