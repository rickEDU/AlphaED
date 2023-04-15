import React, { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'

function App(){
  const cart =[
    {id: 20113, name: "sabonete", price: 3},
    {id: 1214, name: "creme dental", price: 10},
    {id: 55543, name: "espelho", price: 15},
    {id: 112, name: "torneira", price: 5},
  ]
  const balance = 30;

  function listaCart(){
    const itens = cart.map((iten)=>{
      return <li>{iten.name}</li> 
    })
    return itens
  }

  return (
    <div>
      <h1>Meu carrinho</h1>
      <ul>
        {listaCart()}
      </ul>
    </div>
  );

};


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
