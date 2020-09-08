import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter email or username"
        required
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
      <br />
      <br />
      <Link to="/signup">Don't have an account?</Link>
    </form>
  );
}

export default LoginForm;
