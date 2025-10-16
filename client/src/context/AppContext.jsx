import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true;

  // const backendUrl = "https://auth-app-p7nv.onrender.com"
  const backendUrl = "https://auth-app-1oqm.vercel.app"
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [userData, setUserData] = useState(null)

  const getAuthState = async() => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth', { withCredentials: true })
      if(data.success){
        setIsLoggedin(true)
        getUserdata()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const getUserdata = async() => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/data', { withCredentials: true })
      data.success ? setUserData(data.userData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getAuthState();
  },[])

  const value = {
    backendUrl,
    isLoggedin, setIsLoggedin,
    userData, setUserData,
    getUserdata
  }

  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}
