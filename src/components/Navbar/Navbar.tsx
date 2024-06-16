import { Link } from "react-router-dom";
import "./navbar.css";
import config from "../../config/config";

interface IProps {
  isLoggedIn: boolean;
  user: { username: string; email: string; token: string };
  updateLoginState: (newValue: boolean) => void;
}

const Navbar: React.FC<IProps> = ({ isLoggedIn, updateLoginState }) => {

  const url = config.backendURL
  const handleLogout = async () => {
    try {
      const response = await fetch(`${url}/logout`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Logout Successful");
        localStorage.setItem("email", "");
        localStorage.setItem("user_id", "");
        localStorage.setItem("username", "")
        updateLoginState(false);
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      <nav id="my-navbar" className="navbar navbar-expand-lg navbar-light bg-light" >
        <Link to="/" className="navbar-brand">
        JobSiteInsight
              </Link>
        <button
          className="navbar-toggler navbar-custom"
          id="my-navbar-icon"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span  className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item navbar-custom">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
            <li className="nav-item navbar-custom">
              <Link to="/login" className="nav-item nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item navbar-custom">
              <Link to="/signup" className="nav-item nav-link">
                Signup
              </Link>
            </li>
            </>
            ) : (
            <li className="nav-item navbar-custom" id="logout">
              <Link to="/" className="nav-item nav-link" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
