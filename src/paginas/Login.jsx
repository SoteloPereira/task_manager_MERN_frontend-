import { Link } from "react-router-dom"
import { useState} from 'react'
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
//import axios from "axios"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState(false)
    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if([email, password].includes("") ){
            setAlerta({ msg: "Todos los campos son obligatorios", error: true})
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', {email, password})
            console.log(data);
            //la respuesta desde el backend es un json con la data del usuario, guardamos en localStorage el token
            localStorage.setItem('token', data.token)
            setAuth(data)
            setAlerta({}) // limpiamos la alerta para que se borren los msg en pantalla
            navigate("/proyectos")
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true})
        }
    }

    //extraemos error, si existe lo mostramos en pantalla
    const { msg } = alerta

  return (
    <>
        <h1 className="text-sky-600 font-black text-center text-3xl capitalize md:text-5xl md:text-left">
            Inicia sesión y administra tus 
            <span className="text-slate-700"> proyectos</span>
        </h1>
        {msg && <Alerta alerta={alerta} />}
        <form className="my-10 bg-white shadow rounded-md px-10 py-5"
            onSubmit={handleSubmit}>
            <div className="my-5">
                <label htmlFor="email"
                className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input type="email" placeholder="Email de registro" id="email"
                className="w-full mt-3 outline-none border p-3 rounded-xl bg-gray-100"
                value={email} onChange={e => setEmail(e.target.value)}/>
            </div>

            <div className="my-5">
                <label htmlFor="email"
                className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                <input type="password" placeholder="Password de usuario" id="email"
                className="w-full mt-3 outline-none border p-3 rounded-xl bg-gray-100"
                value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            <input type="submit" value="Iniciar sesión" 
            className="bg-sky-700 w-full py-3 text-white rounded uppercase font-bold hover:bg-sky-900 transition-colors cursor-pointer mb-5"/>
        </form>
        
        <nav className="lg:flex lg:justify-between">
            <Link to="/registrar" 
            className="uppercase my-5 block text-center text-slate-500 text-sm">
            ¿No tienes cuenta? Regístrate</Link>

            <Link to="/olvide-password" 
            className="uppercase my-5 block text-center text-slate-500 text-sm">
            Olvide mi contraseña</Link>

        </nav>
    </>
  )
}

export default Login
