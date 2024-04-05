import { useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    company_name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // console.log('selectedFile :>> ', selectedFile);


  // const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
  // console.log('apiKey :>> ', apiKey);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      try {
        const response = await fetch("http://127.0.0.1:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: user.firstName,
            last_name: user.lastName,
            company_name: user.company_name,
            email: user.email,
            phone_number: user.phoneNumber,
            password: user.password,
          }),
        });
        console.log(response);

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
          return;
        } else {
          setShowMessage(() => true);
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } catch (error) {
        setError("Error signing up.. Please try again");
      }
    } else {
      setError("Passwords do not match");
    }
  };

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     // Perform upload logic here, such as sending the file to a server
  //     console.log(selectedFile);
  //   }
  // };

  return (
    <>
      {showMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Thank you for signing up!</strong>
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
      <div className="my-signup-form-container">
        <h1>Sign up</h1>
        <form onSubmit={(e) => handleSignup(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputName4">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName4"
                placeholder="First Name"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                required
              />
            </div>
  
            <div className="form-group col-md-6">
              <label htmlFor="inputName1">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName1"
                placeholder="Last Name"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail5">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail5"
                placeholder="Company Name"
                onChange={(e) => setUser({ ...user, company_name: e.target.value })}
                required
              />
            </div>
  
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail8">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail8"
                placeholder="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Phone Number</label>
            <input
              type="tel"
              placeholder="123-454-6789"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              required
              className="form-control"
              id="inputAddress"
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="inputPassword4"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword5">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              id="inputPassword5"
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary login-btn">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
  
};

export default Signup;
