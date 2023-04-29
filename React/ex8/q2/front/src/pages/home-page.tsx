import { Navigate, useNavigate } from 'react-router-dom';
import '../App.css'
import Profile from '../components/profileCard';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../components/context';



function Home() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  return (
    <div className="App">
      {user == null && <Navigate to='/'/>}
      <h1>Home: sua página logada</h1>
      <div>
        { user==null ?  <Navigate to='/'/> : <Profile /> }
      </div>
      <button onClick={()=> navigate('/')} className='button'>Sair</button>
      <button onClick={()=> navigate('/update')} className='button'>Atualizar cadastro</button>
    </div>
  )
}

export default Home