import { Navigate, Route, Routes } from 'react-router-dom'
import '../App.css'
import { useEffect, useState } from 'react'
import UserContext from '../components/context'
import { IUser } from '../components/interfaces/interface'

// Componentes:
import LoginPage from '../pages/login-page'
import Home from '../pages/home-page'
import SignUp from '../pages/signUp-page'
import Update from '../pages/update-page'


function App() {
  const [user, setUser] = useState<IUser | null>(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/update' element={<Update />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App