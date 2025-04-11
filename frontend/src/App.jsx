import Navbar from "./components/Navbar/Navbar"
import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { rehydrateSession } from "./features/auth/authSlice"

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(rehydrateSession())
  }, [dispatch])


  return(
    <>
    <Navbar />
      <div>hello world</div>
      <div>

      </div>
    </>
  )
}


export default App