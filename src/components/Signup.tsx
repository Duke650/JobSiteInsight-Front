import "../static/styles/signup.css"
import { useState } from "react";

const Signup = () => {

const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [phoneNumber, setPhoneNumber] = useState(0)
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")

// const signupUser = async () => {
//     const request = 
// }

  return (
    <>
      <div className="my-signup-form-container">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="First Name"
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Last Name"
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Username</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail5"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputPassword4"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Phone Number</label>
            <input
              type="tel"
              placeholder="123-45-6789" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required
              className="form-control"
              id="inputAddress"
              onChange={e => setPhoneNumber(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="inputPassword4"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              id="inputPassword4"
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

{
}
export default Signup;
