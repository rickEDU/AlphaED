import React, { useState } from 'react'
interface ICartIten {
    id:number;
    name:string;
    price:number;
  }
function App(){
    const [ cart, setCart] = useState([
        {id: 20113, name: "sabonete", price: 3},
        {id: 1214, name: "creme dental", price: 10},
        {id: 55543, name: "espelho", price: 15},
        {id: 112, name: "torneira", price: 5},
    ])

    const balance = 30;

    function ListCart(){
        const itens = cart.map((iten)=>{
        return <li>{iten.name}<button onClick={()=>{remove_Product_Alert(iten.id)}}>remover</button></li> 
        })
        return itens
    }

    function remove_Product_Alert(id:number){
        setCart(cart.filter(iten=>iten.id!==id))
        alert('O produto com id '+id+' foi removido')
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

export default App