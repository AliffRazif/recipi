import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Login({ setIsLoggedIn, setUserData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3003/sessions", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });


    const data = await response.json();
    console.log("login:",response)

    if (response.ok) {
      setIsLoggedIn(true);
      sessionStorage.setItem("token",data.token)
      sessionStorage.setItem("username",data.user._id)
      setUserData(data.user)
    } else {
      setError(data.message);
    }

    nav('/recipes')
  };

  const handleSignup = () => {
    nav("/signup"); // navigate to the Signup page
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="input-box"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-box"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <button onClick={handleSignup} className="signup-button">Signup</button>
      </form>
    </div>
  );
}
