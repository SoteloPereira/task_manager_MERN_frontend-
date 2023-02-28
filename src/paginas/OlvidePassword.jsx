import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
//import axios from 'axios'
import clienteAxios from "../config/clienteAxios"

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(email === ''){
            setAlerta({ msg: "El mail es obligatorio", error: true})
            return
        }
        if(!email.includes(".")){
            setAlerta({ msg: "Debe ingresar un mail válido", error: true})
            return
        }

        try {
            const {data} = await clienteAxios.post(`/usuarios/olvide-clave`, {email}) //endpoint y el objeto con el email
            console.log(data.msg);
            setAlerta({
                msg: data.msg,
                error: false
            })

        } catch (error) {
            console.log(error.response.data);
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

  return (
    <>
        <h1 className="text-sky-600 font-black text-center text-3xl capitalize md:text-5xl md:text-left">
            Ingresa tu email y te enviaremos las 
            <span className="text-slate-700"> instrucciones</span>
        </h1>
        {msg && <Alerta alerta={alerta}/>}
        <form className="my-10 bg-white shadow rounded-md px-10 py-5"
        onSubmit={handleSubmit}>
            <div className="my-5">
                <label htmlFor="email"
                className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input type="email" placeholder="Email de registro" id="email"
                className="w-full mt-3 outline-none border p-3 rounded-xl bg-gray-100"
                value={email} onChange={e => setEmail(e.target.value)}/>
            </div>

            <input type="submit" value="Recuperar contraseña" 
            className="bg-sky-700 w-full py-3 text-white rounded uppercase font-bold hover:bg-sky-900 transition-colors cursor-pointer mb-5"/>
        </form>
        
        <nav className="lg:flex lg:justify-between">

            <Link to="/" 
            className="uppercase my-5 block text-center text-slate-500 text-sm">
            Ya tienes cuenta? Inicia sesión</Link>
            
            <Link to="/registrar" 
            className="uppercase my-5 block text-center text-slate-500 text-sm">
            ¿No tienes cuenta? Regístrate</Link>

        </nav>
    </>
  )
}

export default OlvidePassword
