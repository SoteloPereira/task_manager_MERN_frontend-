import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
//import axios from 'axios'
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if([nombre, email, password, repetirPassword].includes("")){
            setAlerta({msg:"Todos los campos son obligatorios", error: true});
            return
        }
        if(password !== repetirPassword){
            setAlerta({msg:"Las contraseñas debe coincidir", error: true});
            return
        }
        if(password.length < 6){
            setAlerta({msg:"La contraseña debe ser mínimo de 6 caractéres", error: true});
            return
        }
        setAlerta({}) //borramos mensaje ya que deja de ser true
        //todo validado, CREAR USUARIO EN LA API
        try {
            const {data} = await clienteAxios.post(`/usuarios`, {
                nombre,
                password,
                email
            })
            console.log(data);
            setAlerta({msg: data.msg, error:false})
            //si llega aqui es que se ejecutó todo bien, seteamos los state
            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            console.log(error.response.data);
            setAlerta({msg: error.response.data.msg, error:true})
        }



    }
    //extraemos el valor de msg, si tiene algo.. la validacion abajo
    const { msg } = alerta

  return (
    <>
        <h1 className="text-sky-600 font-black text-center text-3xl capitalize md:text-5xl md:text-left">
            Ingresa tus datos para acceder a la gestión de
            <span className="text-slate-700"> proyectos</span>
        </h1>
        {/* si msg tiene algo/existe, le pasamos a Alerta las props (con el objeto con el boolean y texto) */}
        {msg && <Alerta alerta={alerta}/>}
        <form className="my-10 bg-white shadow rounded-md px-10 py-5"
         onSubmit={handleSubmit}>

            <div className="my-5">
                <label htmlFor="nombre"
                className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                <input type="text" placeholder="Tu nombre" id="nombre"
                className="w-full mt-3 outline-none border p-3 rounded-xl bg-gray-100"
                value={nombre} onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label htmlFor="email"
                className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input type="email" placeholder="Email de registro" id="email"
                className="w-full mt-3 outline-none border p-3 rounded-xl bg-gray-100"
                value={email} onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="my-5" >
                <label htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
                <input type="password" placeholder="Password de usuario" id="password"
                className="w-full mt-3 outline-none border p-3 rounded-xl bg-gray-100"
                value={password} onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="my-5" >
                <label htmlFor="password2"
                className="uppercase text-gray-600 block text-xl font-bold">Repetir Contraseña</label>
                <input type="password" placeholder="Repite tu contraseña" id="password2"
                className="w-full mt-3 outline-none border p-3 rounded-xl bg-gray-100"
                value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

            <input type="submit" value="Crear cuenta" 
            className="bg-sky-700 w-full py-3 text-white rounded uppercase font-bold hover:bg-sky-900 transition-colors cursor-pointer mb-5"/>
        </form>
        
        <nav className="lg:flex lg:justify-between">
            <Link to="/" 
            className="uppercase my-5 block text-center text-slate-500 text-sm">
            Ya tienes cuenta? Inicia sesión</Link>

            <Link to="/olvide-password" 
            className="uppercase my-5 block text-center text-slate-500 text-sm">
            Olvide mi contraseña</Link>

        </nav> 
    </>
  )
}

export default Registrar
