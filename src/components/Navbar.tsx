import { Link } from "react-router-dom";
import "../static/styles/navbar.css"

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            
            <Link to="/" className="nav-item nav-link">
          Home
        </Link>
            <Link to="/login" className="nav-item nav-link">
          {" "}
          Login
        </Link>
            <Link to="signup" className="nav-item nav-link">
          Signup
        </Link>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
