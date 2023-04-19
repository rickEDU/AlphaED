import React, { useState } from 'react'
import { useEffect } from 'react';

interface ICartIten {
    category:string;
    description:string;
    id:number;
    image:string;
    price:number;
    rating:{rate:number, count:number};
    title:string;
};

function App(){
    const [ cart, setCart] = useState<ICartIten[]>([])

    const balance = 30;
    
    // // implementação com .then:
    useEffect(() => {
       fetch('https://fakestoreapi.com/products?limit=5')
          .then(response => response.json())
          .then(data => setCart(data))
          .catch(error => console.error(error));
    }, []);

    // // implementação com async, await:
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('https://fakestoreapi.com/products?limit=5');
    //         const data = await response.json();
    //         setCart(data);
    //     }
    //     fetchData()
    // }, []);

    function ListCart(){
        const itens = cart.map((iten)=>{
        return <li>{iten.title}<button onClick={()=>{remove_Product_Alert(iten.id)}}>remover</button></li> 
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