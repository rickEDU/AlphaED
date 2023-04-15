
import '../App.css'

type FormProps = {
  onSubmit: () => void
}

function Form(props: FormProps) {

  return (
    <div className="App">
        <form action="">
          <label >email:</label>
          <input type="text" placeholder='email'/>
          <br />
          <label>senha:</label>
          <input type="text" placeholder='senha' />
          <br />
          <button onClick={props.onSubmit}>Enviar</button>
        </form>
    </div>
  )
}

export default Form
