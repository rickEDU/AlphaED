import '../App.css'
import Profile from '../card/profileCard';
import Update from '../card/updateCard';


function Home() {

  return (
    <div className="App">
      <h1>Home: sua página logada</h1>
      <div>
        <Profile />
      </div>
      <div>
        <Update />
      </div>
    </div>

  )
}

export default Home