
import '../App.css'

interface IPropsModal{
  click: ()=>void
}

function Modal(props: IPropsModal) {


  function stopPropagation (event: React.MouseEvent<HTMLDivElement>){
    event.stopPropagation()
  }


  return (
    <div className="modal-backgound" onClick={props.click}>
        <div className="modal-content" onClick={(e)=> stopPropagation(e)}>Form enviado com sucesso !</div>
    </div>
  )
}

export default Modal
