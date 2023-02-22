import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setIsLoggedIn }) {

  const nav = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        sessionStorage.setItem("token", null);
        sessionStorage.removeItem("username");
        setIsLoggedIn(false);
        nav("login");
      } catch (error) {
        console.error(error);
      }
    };

    logout();
  }, [nav, setIsLoggedIn]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>

  );
}
