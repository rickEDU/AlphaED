import { useState } from 'react'
import '../App.css'
import Form from '../form/form'
import Modal from '../modal/modal'

function LoginPage() {
  const modalIsOpen = true; // true/false para o modal aparecer/desaparecer;

  function formSubmitted (){
    alert("Na próxima aula, clicar aqui vai abrir o modal!")
  }

  return (
    <div className="App">
      {modalIsOpen  && <Modal />}
        <h1>FORM</h1>
        <Form onSubmit={formSubmitted}/>
    </div>
  )
}

export default LoginPage
