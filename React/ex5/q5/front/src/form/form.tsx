import { useState , ChangeEvent } from 'react'
import '../App.css'

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, _username:string, _password:string) => void
}

function Form(props: FormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
          <input 
            type="text" 
            placeholder='Username' 
            required 
            value = {username}
            onChange = {onChangeUsername}
            />
          <br />
          <label>Senha: </label>
          <input 
            type="text" 
            placeholder='Senha' 
            required 
            value = {password}
            onChange = {onChangePassword}
            />
          <br />
          <button type='submit'>Enviar</button>
        </form>
    </div>
  )
}

export default Form
