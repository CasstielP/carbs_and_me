import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthButton from "./Authbutton";
import {
  login,
  signup,
  logout,
  clearError,
} from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  //   const {isRhydrating, isAuthenticated} = useSelector((state)=> state.auth)
  const error = useSelector((state) => state.auth.error);

  const handleLogin = () => {
    dispatch(clearError());
    dispatch(
      login({
        username: "casstielpi",
        password: "casstielpi129",
      })
    );
  };

  const handleSignup = () => {
    dispatch(clearError());
    dispatch(
      signup({
        username: "newuser",
        email: "newuser@example.com",
        password: "password123",
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading && !user) {
    return (
      <nav>
        <h1>My App</h1>

        {/* <p>is loading...</p> */}
      </nav>
    );
  }

  return (
    <nav>
      <h1>My App</h1>

      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <AuthButton type="logout" onClick={handleLogout} />
        </>
      ) : (
        <>
          <AuthButton type="login" onClick={handleLogin} />
          <AuthButton type="signup" onClick={handleSignup} />
        </>
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error.msg || error}</p>}
    </nav>
  );
};

export default Navbar;
