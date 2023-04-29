import { useState , ChangeEvent, useEffect } from 'react'
import '../../App.css'
import styled from 'styled-components';
import { Input} from '@mui/material'
import { IApiRequest } from '../interfaces/interface';

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, body: IApiRequest) => void;
  id?: string|number;
  erase: boolean;
}


function Form(props: FormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [body, setBody] = useState({
      email: '',
      password: '',
      id: props.id
    })

  useEffect(()=>{
    setBody({
      email: email,
      password: password,
      id: props.id
    })
  }, [email, password])

  useEffect(()=>{
    if(props.erase){
      eraseInputs()
    }
  },[props.erase])

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

  function eraseInputs(){
    setEmail('');
    setPassword('');
  }

  function onChangeEmail(event: ChangeEvent<HTMLInputElement>){
    setEmail(event.target.value)
  }
  function onChangePassword(event: ChangeEvent<HTMLInputElement>){
    setPassword(event.target.value)
  }
  return (
    <div className="App">
        <form onSubmit={(e)=>{ props.onSubmit( e, body )}}>
          <label >E-mail: </label>
          <Input 
            type="text" 
            placeholder='E-mail' 
            required 
            value = {email}
            onChange = {onChangeEmail}
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
