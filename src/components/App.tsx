import { Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import Home from "../views/Home"
import Signup from "../views/Signup"
import Login from "../views/Login"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="login" element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
