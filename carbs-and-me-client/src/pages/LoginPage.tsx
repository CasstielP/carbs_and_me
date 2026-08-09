import {useState } from "react";
import type {FormEvent} from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  }

  return (
    <main>
      <h1>Login</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;