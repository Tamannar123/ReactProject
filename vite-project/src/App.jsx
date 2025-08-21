import './css/App.css'
import Favorites from './Pages/Favorites'
import Home from './Pages/Home'
import { Routes, Route } from "react-router-dom"
import{MovieProvider} from "./contexts/MovieContext"
import Navbar from './components/NavBar'

function App() {
  return (
    <div>
      <MovieProvider>
      <Navbar/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Favorites" element={<Favorites/>}/>
        </Routes>
      </main>
      </MovieProvider>
    </div>
  )
}

export default App
