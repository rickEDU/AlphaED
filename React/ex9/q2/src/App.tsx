import { useState, useRef } from 'react'
import './App.css'

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus(){
    inputRef.current!.focus();
  }

  return (
    <div className="App">
      <input type='text' ref={inputRef} />
      <button onClick={handleFocus}>Focar</button>
    </div>
  )
}

export default App
