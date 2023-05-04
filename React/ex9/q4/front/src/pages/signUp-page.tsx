import '../App.css'
import { useState } from 'react'
import { IApiRequest } from '../components/interfaces/interface'
import FormApi from '../components/forms/formApi'
import { useNavigate } from 'react-router'
import useModal from '../components/modal'


function SignUp() {
    const [error, setError] = useState('')
    const {EasyModal, openModal} = useModal()
    const navigate = useNavigate()


    async function formSubmitted (event: React.FormEvent<HTMLFormElement>, body: IApiRequest){
        event.preventDefault()
        try{
          const response = await connectionPatch( body.name!, body.email, body.password)
          if(response.error[0]!=null){
            openModal()
            setError(response.error[0]);
          }else{
            navigate('/')
          }
        }catch(error){
          console.log(error)
        }
    }
  
    async function connectionPatch(_name:string, _email:string, _password:string){
      const body = {name: _name, email: _email, password: _password}
      console.log(body, "boddy")
      try{
        const options : RequestInit = {
          credentials: 'include',
          method: "POST",
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

  return (
    <div className="App">
        <EasyModal error={error}/>
        <h1>SignUp Page</h1>
        <FormApi onSubmit={formSubmitted} erase={false}/>
    </div>

  )
}

export default SignUp