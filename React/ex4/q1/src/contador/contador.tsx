import { useState } from 'react'

import '../App.css'

function Counter() {
  const [count, setCount] = useState(0)

  function UpCount(){
    setCount(count+1)
  }
  function LowCount(){
    setCount(count-1)
  }

  return (
    <div className="App">
        <p>{count}</p>
        <br />
        <button onClick={UpCount}>+</button>
        <button onClick={LowCount}>-</button>
    </div>
  )
}

export default Counter
