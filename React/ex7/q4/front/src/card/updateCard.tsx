import '../App.css'
import Form from '../form/form'
import { useState, useContext } from 'react'
import UserContext from '../app/context'
import { IApiRequest } from '../interfaces/interface'
import Modal from '../modal/modal'

function Update() {
    const [error, setError] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [erase, setErase] = useState(false)
    const { setUser } = useContext(UserContext)

  async function formSubmitted (event: React.FormEvent<HTMLFormElement>, body: IApiRequest){
      event.preventDefault()
      try{
        const response = await connectionPatch( body.email, body.password)
        if(response.error[0]!=null){
          setErase(false);
          setModalIsOpen(true);
          setError(response.error[0]);
        }else{
          setErase(true);
          setUser(response.data);
        }
      }catch(error){
        console.log(error)
      }
  }

  async function connectionPatch( _email:string, _password:string){
    const body = {email: _email, password: _password}
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
      {modalIsOpen  && <Modal close={closeModal} error={error}/>}
        <h3>Atualizar</h3>
        <Form onSubmit={formSubmitted} erase={erase}/>
    </div>
  )
}

export default Update