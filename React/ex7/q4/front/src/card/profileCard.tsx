import '../App.css'
import { useContext } from 'react'
import UserContext from '../app/context'

function Profile() {
    const {user} = useContext(UserContext)

    return (
        <div style={{border: "1px solid black", padding: "10px", margin: "10px"}}>
            <h3>Perfil</h3>
            <h3>Email: {user!.email}</h3>
        </div>
    )
}

export default Profile