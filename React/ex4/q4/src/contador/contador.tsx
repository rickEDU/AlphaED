import { useState } from 'react'

import '../App.css'

interface IProps {
  onRemove: ()=>void;
}

function Counter(props: IProps) {
  const [count, setCount] = useState(0)

  const id = 1;

  function upCount(){
    setCount(count+1)
  }
  function lowCount(){
    setCount(count-1)
  }

  return (
    <div className="App">
        <p>{count}</p>
        <br />
        <button onClick={upCount}>+</button>
        <button onClick={lowCount}>-</button>
        <br />
        <button onClick={()=>props.onRemove()}>Remover</button>
    </div>
  )
}

function App(){
  const [counterList, setCounter] = useState([1,2,3])

  function removeCounter(id:number) {
    setCounter(counterList.filter((counter) => counter !== id));
  }

  return (
    <div className="App">
      {counterList.map(id => (
        <div>
          <h2>Contador {id}</h2>
          <Counter onRemove={() => removeCounter(id)}/>
        </div>
      ))}
    </div>
  );
}


// // Segunda implementação com o props.id:
//

// interface IProps {
//   id: number;
//   onRemove: (id:number)=>void;
// }

// function Counter(props: IProps) {
//   const [count, setCount] = useState(0)

//   const id = 1;

//   function upCount(){
//     setCount(count+1)
//   }
//   function lowCount(){
//     setCount(count-1)
//   }

//   return (
//     <div className="App">
//         <p>{count}</p>
//         <br />
//         <button onClick={upCount}>+</button>
//         <button onClick={lowCount}>-</button>
//         <br />
//         <button onClick={()=>props.onRemove(props.id)}>Remover</button>
//     </div>
//   )
// }

// function App(){
//   const [counterList, setCounter] = useState([1,2,3])

//   function removeCounter(id:number) {
//     setCounter(counterList.filter((counter) => counter !== id));
//   }

//   return (
//     <div className="App">
//       {counterList.map(id => (
//         <div>
//           <h2>Contador {id}</h2>
//           <Counter id={id} onRemove={()=>removeCounter(id)}/>
//         </div>
//       ))}
//     </div>
//   );
// }
export default App


