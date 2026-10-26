import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentDataService } from "../services/studentDataService.js";

export default function LoginPage() {
  const navigateToPage = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const handleLoginSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    try {
      const { jwtToken } = await studentDataService.loginWithUsernameAndPassword(
        username,
        password
      );
      localStorage.setItem("jwtToken", jwtToken); // JWT token storage
      navigateToPage("/dashboard");
    } catch (loginError) {
      setLoginErrorMessage(loginError.message);
    }
  };

  return (
    <form className="login-card" onSubmit={handleLoginSubmit}>
      <h2>Student Portal Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(changeEvent) => setUsername(changeEvent.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(changeEvent) => setPassword(changeEvent.target.value)}
        required
      />
      {loginErrorMessage && <p className="error-message">{loginErrorMessage}</p>}
      <button>Login</button>
    </form>
  );
}
