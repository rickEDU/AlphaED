import '../App.css'

interface IProps{
  error: string;
  close: (event:React.MouseEvent<HTMLDivElement>) => void;
  
}
function Modal(props:IProps) {

  function stopPropagation (event: React.MouseEvent<HTMLDivElement>){
    event.stopPropagation()
  }

  return (
    <div className="modal-backgound" onClick={(e)=>props.close(e)}>
        <div className="modal-content" onClick={(e)=> stopPropagation(e)}>{props.error}</div>
    </div>
  )
}

export default Modal
