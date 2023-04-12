import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface IUser{
  firstName:string;
  lastName:string;
  idade: number
}
const dataNascimento = new Date(1993,8,23)

function calcularIdade(dataDeNascimento: Date):number {
  const dataAtual: Date = new Date();
  const diferencaEmMilissegundos = dataAtual.getTime() - dataDeNascimento.getTime();
  const idadeEmAnos = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25));
  return idadeEmAnos;
}
const user: IUser = {
  firstName:'Eduardo',
  lastName: 'Santos',
  idade: calcularIdade(dataNascimento)
}
function formatName(user:IUser){
  return user.firstName+' '+user.lastName;
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Olá, meu nome é {formatName(user)}, tenho  {user.idade} anos e este é meu primeiro contato com JSX.</h1>
    </div>
  )
}

export default App
