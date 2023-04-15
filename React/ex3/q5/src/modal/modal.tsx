import '../App.css'


function Modal() {

  function closeModal(){
    alert("Na próxima aula, clicar aqui vai fechar o modal !")
  }

  function stopPropagation (event: React.MouseEvent<HTMLDivElement>){
    event.stopPropagation()
  }


  return (
    <div className="modal-backgound" onClick={closeModal}>
        <div className="modal-content" onClick={(e)=> stopPropagation(e)}>Form enviado com sucesso !</div>
    </div>
  )
}

export default Modal
