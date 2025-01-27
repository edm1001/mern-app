import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const BACKEND_URL = process.env.APP_URL || "http://localhost:4000";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Successful login
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true);
      } else if (response.status === 400) {
        // Specific error for wrong credentials
        alert("Invalid username or password. Please try again.");
      } else {
        // General error for other issues
        alert("Login failed. Please try again later.");
      }
    } catch (err) {
      console.error("Error during login. Please try again");
      alert("An unexpected error occurred. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="block text-center" onSubmit={login}>
        <h1 className="font-bold mb-10 text-3xl text-gray-500">
          Welcome Back!
        </h1>
        <input
          type="text"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          placeholder="username"
          className="w-full mb-2 px-3 py-2 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="password"
          className="w-full mb-4 px-3 py-2 border rounded-lg items-center"
        />
        <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
