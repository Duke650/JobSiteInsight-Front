import { Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"

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
