import React, { createContext, useContext, useState } from 'react'
import * as userService from '../services/userService.js';
import { toast } from 'react-toastify'; 

const AuthContext= createContext(null);

const AuthProvider = ({children}) => {

  const [user,setUser]= useState(userService.getUser());

  const login= async(email, password)=>{
    try {
      const user=await userService.logIn(email, password); 
      setUser(user);
      toast.success('Login Successful')
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  const register= async(data)=>{
    try {
      const user=await userService.register(data)
      setUser(user)
      toast.success('Registered Successfully')
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  const logout=()=>{
    userService.logOut();
    setUser(null);
    toast.success('Logout Successful')
  }

  return (
    <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
export const useAuth=()=> useContext(AuthContext);





