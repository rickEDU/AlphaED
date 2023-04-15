import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './form'

function LoginPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <h1>FORM</h1>
        <Form />
    </div>
  )
}

export default LoginPage
