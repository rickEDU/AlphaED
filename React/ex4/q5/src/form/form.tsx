
import '../App.css'

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function Form(props: FormProps) {

  return (
    <div className="App">
        <form onSubmit={props.onSubmit}>
          <label >email:</label>
          <input type="text" placeholder='email'/>
          <br />
          <label>senha:</label>
          <input type="text" placeholder='senha' />
          <br />
          <button type='submit'>Enviar</button>
        </form>
    </div>
  )
}

export default Form
