import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

interface IUser{
  firstName:string;
  lastName:string;
  idade: number
}
const dataNascimento = new Date(1993,8,23)

function calcularIdade(dataDeNascimento: Date):number {
  const dataAtual: Date = new Date();
  const diferencaMilisegundo = dataAtual.getTime() - dataDeNascimento.getTime();
  const idadeEmAnos = Math.floor(diferencaMilisegundo / (1000 * 60 * 60 * 24 * 365.25));
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
const element:JSX.Element = <h1>Olá, meu nome é {formatName(user)}, tenho  {user.idade} anos e este é meu primeiro contato com JSX.</h1>
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(element);
