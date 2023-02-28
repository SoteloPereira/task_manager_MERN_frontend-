//para acceder a la informacion de un context (/context/AuthProvider)
import { useContext } from "react";
import AuthContext  from "../context/AuthProvider";

const useAuth = () =>{
    //indicamos que vamos a extraer los valores 
    return useContext(AuthContext)
}

export default useAuth
