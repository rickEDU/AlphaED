import React, { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import './App.css'

function App(){
  const cart =[
    {id: 20113, name: "sabonete", price: 3},
    {id: 1214, name: "creme dental", price: 10},
    {id: 55543, name: "espelho", price: 15},
    {id: 112, name: "torneira", price: 5},
  ]
  const balance = 30;

  function ListCart(){
    const itens = cart.map((iten)=>{
      return <li>{iten.name}</li> 
    })
    return itens
  }

  function Saldo(){
    let valor = 0;
    for(let iten of cart){
      valor += iten.price;
    }
    if(valor>balance){
      return <p> Saldo insuficiente </p>;
    }
    return;
  }

  return (
    <div className="App">
      <h1>Meu carrinho</h1>
      <ul>
        {ListCart()}
      </ul>
      {Saldo()}
    </div>
  );

};


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
