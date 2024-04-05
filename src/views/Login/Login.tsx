import { useState } from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";

interface IProps {
  updateLoginState: (newValue: boolean) => void;
  setUser: (user: {username: string, email: string, token: string}) => void
}

const Login: React.FC<IProps> = ({ updateLoginState, setUser}) => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
      });

      if (!response.ok) {
        setError("Incorrct Username or Password");
        return;
      }
      setShowMessage(() => true);
      setTimeout(async () => {
        navigate("/");
        console.log('data.message :>> ', await response.json());
      }, 1500);
      const data = await response.json()
      console.log('data :>> ', data);
      setUser(data.user)
      localStorage.setItem('email', data.user.email)
      localStorage.setItem('user_id', data.user.user_id)
      localStorage.setItem('first_name', data.user.first_name)
      localStorage.setItem('last_name', data.user.last_name)


      updateLoginState(true)
    } catch (error) {
      setError("Error logging in");
    }
  };

  return (
    <>
      {showMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Welcome Back!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}
      <div className="my-login-form-container">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) =>
                setLoginUser({ ...loginUser, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Password"
              onChange={(e) =>
                setLoginUser({ ...loginUser, password: e.target.value })
              }
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <span>Don't have an account? <Link to={"/signup"}>Sign up here</Link> </span>
          <br />
          <button
            type="submit"
            className="btn btn-primary login-btn"
            onClick={(e) => handleLogin(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
  
};

export default Login;
