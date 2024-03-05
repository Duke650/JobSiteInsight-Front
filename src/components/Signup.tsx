// import "signup" from "../static/styles/signup.css"

const Signup = () => {




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
              />
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Username</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="Username"
              />
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputPassword4"
                placeholder="Email"
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="inputPassword4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              id="inputPassword4"
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
  /* <form>
              <input type="text" placeholder="Username"/>
              <input type="text" placeholder="First Name"/>
              <input type="text"  placeholder="Last Name"/>
              <input type="text" placeholder="Email"/>
              <input type="tel" placeholder="123-45-6789" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required/>
              <input type="password" placeholder="Password"/>
              <input type="password" placeholder="Confirm Password"/>

          </form> */
}
export default Signup;
