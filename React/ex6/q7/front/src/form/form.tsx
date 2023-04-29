import { useState , ChangeEvent } from 'react'
import '../App.css'
import styled from 'styled-components';
import { Input} from '@mui/material'

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, _username:string, _password:string) => void
}


function Form(props: FormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const StyledButton = styled.button `
  background-color: blue;
  margin-top: 10px;
  color: white;
  border: 2px solid blue;
  font-size: 16px;
  padding: 10px 20px; 
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color:white;
    color:blue;
  }
  `;

  function onChangeUsername(event: ChangeEvent<HTMLInputElement>){
    setUsername(event.target.value)
  }
  function onChangePassword(event: ChangeEvent<HTMLInputElement>){
    setPassword(event.target.value)
  }
  return (
    <div className="App">
        <form onSubmit={(e)=>props.onSubmit( e, username, password )}>
          <label >Username: </label>
          <Input 
            type="text" 
            placeholder='Username' 
            required 
            value = {username}
            onChange = {onChangeUsername}
            />
          <br />
          <label>Senha: </label>
          <Input 
            type="password" 
            placeholder='Senha' 
            required 
            value = {password}
            onChange = {onChangePassword}
            />
          <br />
          <StyledButton type='submit'> Enviar </StyledButton>
        </form>
    </div>
  )
}

export default Form
