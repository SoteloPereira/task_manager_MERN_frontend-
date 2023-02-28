import { useEffect, useState, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

//rodea todo, children = todos los componentes, para que esten disponibles
const AuthProvider = ({children}) =>{
    
    const navigate = useNavigate()
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true) //para que espere que termine la req y valida la data de usuario desde perfil
    
    //para validar si existe un token en LS
    useEffect( ()=>{
        const autenticarUsuario = async () =>{
                const token = localStorage.getItem('token')
                if(!token){
                    setCargando(false) 
                    return 
                }
                //configuracion para enviar el Token (Bearer)
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                try {
                    const { data } = await clienteAxios('/usuarios/perfil', config)
                    setAuth(data) //la guardamos en el state global (en AuthProvider)
                    setCargando(false)
                    navigate('/proyectos') //para redireccionar si altiro si ya esta logueado - opcional
                } catch (error) {
                    console.log(error);
                }
                setCargando(false) //para cuando termine
                
        }
        autenticarUsuario()
    },[])

    const cerrarSesionUsuario =() =>{
        setAuth({})
    }
    return(
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando,
                cerrarSesionUsuario
            }}>
                {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider}

export default AuthContext