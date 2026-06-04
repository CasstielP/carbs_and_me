import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { authenticate } from "./features/auth/authSlice";   
import { useAppDispatch } from "./app/hooks";


function App() {
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(authenticate())
  }, [dispatch])



  return <AppRouter />;
}

export default App;