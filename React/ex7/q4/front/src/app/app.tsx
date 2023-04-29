import { Route, Routes } from 'react-router-dom'
import '../App.css'
import { useState } from 'react'

// Componentes:
import LoginPage from '../loginPage/login-page'
import Home from '../home/home-page'
import UserContext from './context'
import { IUser } from '../interfaces/interface'


function App() {
  const [user, setUser] = useState<IUser | null>(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<Home />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App