import { useState } from 'react'
import '../App.css'
import Form from '../form/form'
import Modal from '../modal/modal'
import { useNavigate } from 'react-router-dom';



function LoginPage() {
  const [error, setError] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const navigate = useNavigate()

  async function formSubmitted (event: React.FormEvent<HTMLFormElement>, _username:string, _password:string){
    event.preventDefault()
    try{
      const response = await connectionLogin(_username, _password)
      if(response.error!=null){
        setModalIsOpen(true)
        setError(response.error)
      }else{
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


  async function connectionLogin(_username:string, _password:string){
    const body = {username: _username, password: _password}
    try{
      const options : RequestInit = {
        method: "POST",
        headers: {"Content-Type":"Application/json"},
        body: JSON.stringify(body)
      }
      const ApiReponse = await fetch('http://localhost:8000/login', options);
      const jsonResponse = await ApiReponse.json();
      return jsonResponse;
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="App">
      {modalIsOpen  && <Modal close={closeModal} error={error}/>}
        <h1>FORM</h1>
        <Form onSubmit={formSubmitted}/>
    </div>
  )
}

export default LoginPage
