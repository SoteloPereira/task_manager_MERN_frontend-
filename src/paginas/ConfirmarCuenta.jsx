import { useEffect, useState } from "react"
//import axios from 'axios'
import clienteAxios from "../config/clienteAxios"
import { useParams, Link} from "react-router-dom"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const param = useParams() //extraer el id(segun se nombró en App.jsx en la ruta dinamica)
  const { id } = param
  console.log(id);

  useEffect( () => {
      const confirmarCuenta = async () => {
          try { 
            const {data} = await clienteAxios(`usuarios/confirmarCuenta/${id}`)
            console.log(data);
            setAlerta({
              msg: data.msg,
              error:false
            })
            setCuentaConfirmada(true)
          } catch (error) {
            console.log(error);
            setAlerta({
              msg: error.response.data.msg,
              error:true
            })
            setCuentaConfirmada(false)
          }
      }

      confirmarCuenta()
  }, [])

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-center text-3xl capitalize md:text-5xl ">
            Confirma tu cuenta y comienza a crear tus 
            <span className="text-slate-700"> proyectos</span>
      </h1>
      <div>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada ? <Link to="/" 
            className="uppercase my-5 block text-center text-slate-500 text-sm">
            Ya puedes Iniciar sesión</Link> : ""}
      </div>
    </>
  )
}

export default ConfirmarCuenta
