import { useContext, useState } from 'react'
import '../App.css'
import Form from '../components/forms/form'
import Modal from '../components/modal'
import { useNavigate } from 'react-router-dom';
import { IApiRequest, IApiResponse } from '../components/interfaces/interface';
import UserContext from '../components/context';


function LoginPage() {
  const [error, setError] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()


  async function formSubmitted (event: React.FormEvent<HTMLFormElement>, body:IApiRequest){
    event.preventDefault()
    try{
      const response: IApiResponse = await connectionLogin(body.email, body.password)
      if(response.error[0]!=null){
        setModalIsOpen(true)
        setError(response.error[0])
      }else{
        setUser(response.data)
        navigate('/home')
      }
    }catch(error){
      console.log(error)
    }
  }

  function closeModal(event: React.MouseEvent<HTMLDivElement>){
    event.preventDefault()
    setModalIsOpen(false)
  }


  async function connectionLogin(_email:string, _password:string){
    const body = {email: _email, password: _password}
    try{
      const options : RequestInit = {
        credentials: 'include',
        method: "POST",
        headers: {"Content-Type":"Application/json"},
        body: JSON.stringify(body)
      }
      const ApiReponse = await fetch('http://localhost:8000/accounts/login', options);
      const jsonResponse = await ApiReponse.json();
      return jsonResponse;
    }catch(error){
      console.log(error)
    }
  }

  function signUp_page(){
    navigate('/register')
  }
  
  return (
    <div className="App">
      {modalIsOpen  && <Modal close={closeModal} error={error}/>}
        <h1>Login Page</h1>
        <Form onSubmit={formSubmitted} erase={false}/>
        <br />
        <a onClick={signUp_page} className='cadastro'>Cadastre-se</a>
    </div>
  )
}

export default LoginPage
