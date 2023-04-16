import { useState } from 'react'
import '../App.css'
import Form from '../form/form'
import Modal from '../modal/modal'


function LoginPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function formSubmitted (event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    setModalIsOpen(true)
  }
  function closeModal(event: React.MouseEvent<HTMLDivElement>){
    event.preventDefault()
    setModalIsOpen(false)
  }
  return (
    <div className="App">
      {modalIsOpen  && <Modal close={closeModal}/>}
        <h1>FORM</h1>
        <Form onSubmit={formSubmitted}/>
    </div>
  )
}

export default LoginPage
