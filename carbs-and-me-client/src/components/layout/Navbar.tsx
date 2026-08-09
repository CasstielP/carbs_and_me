import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useAppSelector((state) => state.auth);

  async function handleLogout() {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate("/login");
    }
  }

  return (
    <nav>
      <Link to="/">Carbs & Me</Link>

      <div>
        {user ? (
          <>
            <span>Logged in as {user.username}</span>
            <Link to="/upload">Upload</Link>
            <Link to={`/users/${user.id}`}>Profile</Link>
            <button type="button" onClick={handleLogout} disabled={isLoading}>
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;