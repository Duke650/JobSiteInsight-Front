import { Routes, Route } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import Home from "../views/Home"
import Signup from "../views/Signup/Signup"
import Login from "../views/Login/Login"
import { useEffect, useState } from "react"


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({username: "", email: "", token: ""})
  console.log('isLoggedIn :>> ', isLoggedIn);
  // const apiKey = window.env.REACT_APP_API_KEY;
  useEffect(() => {
    checkLoginStatus()
    // loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`, () => {
    //   // Script has loaded, you can now use the Google Maps API
    // });
  }, [])


  const checkLoginStatus = async () => {
    const response = await fetch(`http://127.0.0.1:5000/login_status/${localStorage.getItem("email")}`)
    const data = await response.json()
    console.log('log in status :>> ', data);
    if (data) {
      setIsLoggedIn(data.logged_in)
    }
  }

  const updateLoginState = (newValue: boolean) => {
    setIsLoggedIn(newValue)
  }


  return (
    <>
      <Navbar updateLoginState={updateLoginState} isLoggedIn={isLoggedIn} user={user}/>
      <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="login" element={<Login updateLoginState={updateLoginState} setUser={setUser}/>}/>
      </Routes>
    </>
  )
}

export default App
