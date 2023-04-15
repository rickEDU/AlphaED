import { useState } from 'react'
import '../App.css'
import Form from '../form/form'
import Modal from '../modal/modal'

function LoginPage() {
  const [modalIsOpen , setOpenModal] = useState(false);

  function formSubmitted (event){
    event.preventDefault();
    setOpenModal(true)
  }
  function closeModal(){
    setOpenModal(false)
  }

  return (
    <div className="App">
      {modalIsOpen  && <Modal click={closeModal} />}
        <h1>FORM</h1>
        <Form onSubmit={formSubmitted(event)}/>
    </div>
  )
}

export default LoginPage
