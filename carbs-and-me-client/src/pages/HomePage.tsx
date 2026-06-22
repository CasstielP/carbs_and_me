// function HomePage() {
//   return <h1>Home / Video Feed</h1>;
// }

// export default HomePage;

import { useAppSelector } from "../app/hooks";

function HomePage() {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  return (
    <main>
      <h1>Home / Video Feed</h1>

      <p>Auth loading: {isLoading ? "Yes" : "No"}</p>
      <p>Current user: {user ? user.username : "Not logged in"}</p>
      <p>Auth error: {error ?? "None"}</p>
    </main>
  );
}

export default HomePage;