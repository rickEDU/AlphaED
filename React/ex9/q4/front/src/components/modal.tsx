import '../App.css'
import { useState } from 'react';
import { IProps, IEasyModal } from './interfaces/interface';


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

function useModal(){
  const [isOpen , setIsOpen] = useState(false)

  function openModal(){
    setIsOpen(true)
  }

  function EasyModal(props: IEasyModal): JSX.Element{

    function closeModal(){
      setIsOpen(false)
    }

    return (
      <div>
        {isOpen && <Modal close={closeModal} error={props.error} />}
      </div>
    )
  }

  return {EasyModal, openModal};
}

export default useModal