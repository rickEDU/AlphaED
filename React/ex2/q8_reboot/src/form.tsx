import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Form() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <form action="">
            <input type="text" placeholder='email'/>
            <input type="text" placeholder='senha' />
        </form>
    </div>
  )
}

export default Form
