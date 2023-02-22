import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp({ setIsLoggedIn }) {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const history = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newUser);
    const response = await fetch("http://localhost:3003/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      //navigate
    }
  };


  const navigate = useNavigate()

  const handleBackToLogin = () => {
    navigate('/login')
}

  return (
        <div className="signup-container">
          <h1 className="signup-title">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label className="signup-label">
              Username:
              <input
                className="signup-input"
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="signup-label">
              Email:
              <input
                className="signup-input"
                type="text"
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="signup-label">
              Password:
              <input
                className="signup-input"
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="signup-label">
              First Name:
              <input
                className="signup-input"
                type="text"
                name="firstName"
                value={newUser.firstName}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="signup-label">
              Last Name:
              <input
                className="signup-input"
                type="text"
                name="lastName"
                value={newUser.lastName}
                onChange={handleChange}
              />
            </label>
            <br />
            <button className="signup-button" type="submit">Sign Up</button>
            <button className="back-to-login-button" onClick={handleBackToLogin}>Back to Login</button>
          </form>
        </div>

  );
}
