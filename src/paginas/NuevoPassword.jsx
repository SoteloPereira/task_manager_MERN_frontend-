//import axios from "axios" lo quitamos porque usaremos el clienteAxios
import clienteAxios from "../config/clienteAxios"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')
  const [passwordModificada, setPasswordModificada] = useState(false) //muestra link de inicio sesion
  const param = useParams()
  const {token} = param;

  useEffect( () => {

    const comprobarToken = async () =>{
        try {
          //reemplazamos axios por clienteAxios que tiene definida la base de la URL
            const {data} = await clienteAxios(`/usuarios/olvide-clave/${token}`)
            console.log(data);
            setTokenValido(true) //si es valido muestra el formulario, si no
        } catch (error) {
          console.log(error.response);
          //si no, muestra un cuadro con un mensaje de error
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }
    }
    comprobarToken()
  },[])

  const { msg } = alerta

  const handleSubmit= async (e) =>{
      e.preventDefault()
      // if(nuevaPassword.length === 0){
      //   setAlerta({ msg: "Debe ingresar una contraseña", error: true })
      // }
      if(password.length < 6){
        setAlerta({ msg: "La contraseña debe tener un largo mínimo de 6 caractéres", error: true })
      }
      
      try {
          const { data } = await clienteAxios.post(`/usuarios/olvide-clave/${token}`, {password})
          console.log(data);
          setAlerta({ msg: data.msg, error: false})
          setPasswordModificada(true)
      } catch (error) {
        console.log(error);
        setTokenValido(false)
      }

  }


  return (
    <>
         <h1 className="text-sky-600 font-black text-center text-3xl capitalize md:text-5xl md:text-left">
            Reestablece tu 
            <span className="text-slate-700"> contraseña</span>
        </h1>
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <form className="my-10 bg-white shadow rounded-md px-10 py-5"
          onSubmit={handleSubmit} >
              <div className="my-5" >
                  <label htmlFor="password"
                  className="uppercase text-gray-600 block text-xl font-bold">Nueva Contraseña</label>
                  <input type="password" placeholder="Ingresa tu nueva contraseña" id="password"
                  className="w-full mt-3 outline-none border p-3 rounded-xl bg-gray-100"
                  value={password} 
                  onChange={e => setPassword(e.target.value) }/>
              </div>

              <input type="submit" value="Guardar nueva contraseña" 
              className="bg-sky-700 w-full py-3 text-white rounded uppercase font-bold hover:bg-sky-900 transition-colors cursor-pointer mb-5"/>

              {passwordModificada ? <Link to="/" 
                className="uppercase my-5 block text-center font-bold text-slate-500 text-sm">
                Ya puedes Iniciar sesión</Link> : ""}
          </form> 
        ) }
    </>
  )
}

export default NuevoPassword
