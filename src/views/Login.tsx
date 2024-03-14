import { useState } from "react";
import "../static/styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      }, 1500);
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
          {error && <p>{error}</p>}
          <button
            type="submit"
            className="btn btn-primary"
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
