import '../App.css'
import Form from '../components/forms/form'
import { useState, useContext } from 'react'
import UserContext from '../components/context'
import { IApiRequest } from '../components/interfaces/interface'
import Modal from '../components/modal'
import { useNavigate, Navigate } from 'react-router'
import FormApi from '../components/forms/formApi'

function Update() {
    const [error, setError] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [erase, setErase] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

  async function formSubmitted (event: React.FormEvent<HTMLFormElement>, body: IApiRequest){
      event.preventDefault()
      try{
        const response = await connectionPatch( body.name!, body.email, body.password)
        if(response.error[0]!=null){
          setErase(false);
          setModalIsOpen(true);
          setError(response.error[0]);
        }else{
          setErase(true);
          setUser(response.data);
          navigate('/home')
        }
      }catch(error){
        console.log(error)
      }
  }

  async function connectionPatch( _name:string, _email:string, _password:string){
    const body = {name:_name, email: _email, password: _password}
    try{
      const options : RequestInit = {
        credentials: 'include',
        method: "PATCH",
        headers: {"Content-Type":"Application/json"},
        body: JSON.stringify(body)
      }
      const ApiReponse = await fetch(`http://localhost:8000/accounts/`, options);
      const jsonResponse = await ApiReponse.json();
      return jsonResponse;
    }catch(error){
      console.log(error)
    }
  }

  function closeModal(event: React.MouseEvent<HTMLDivElement>){
    event.preventDefault()
    setModalIsOpen(false)
  }


  return (
    
    <div style={{border: "1px solid black", padding: "10px", margin: "10px"}}>
      {user == null && <Navigate to='/' />}
      {modalIsOpen  && <Modal close={closeModal} error={error}/>}
        <h3>Atualizar</h3>
        <FormApi onSubmit={formSubmitted} erase={erase}/>
    </div>
  )
}

export default Update