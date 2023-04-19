import { Route, Routes } from 'react-router-dom'
import '../App.css'

// Componentes:
import LoginPage from '../loginPage/login-page'
import Home from '../home/home-page'


function App() {

  return (
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
    </Routes>
  )
}

export default App