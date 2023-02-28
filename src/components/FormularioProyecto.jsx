import { useEffect, useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"
import { useParams } from "react-router-dom"

const FormularioProyecto = () => {

  const [nombre, setNombre] = useState('')
  const [id, setId] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')
  const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos()
  //validar si es edicion o nuevo proyecto
  const param = useParams()
  
  useEffect(()=>{
      if(param.id){
          setId(param.id)
          setNombre(proyecto.nombre)
          setDescripcion(proyecto.descripcion)
          setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
          setCliente(proyecto.cliente)
          console.log(proyecto.fechaEntrega);
      }

  },[])

  const handleSubmit = async e => {
      e.preventDefault();
      if( [nombre,cliente,descripcion,fechaEntrega].includes("")){
          mostrarAlerta( {msg: "Debe completar todos los campos", error:true})
          return 
      }
      //fn que esta en provider de proyecto, await para poder reiniciar los state
      //vamos a pasar el id tambien para validar si es edicion o nuevo, y asi ir a un endpoint u otro
      await submitProyecto({id, nombre, descripcion, cliente, fechaEntrega})
      if(!param.id){
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
      }
    }

  const { msg } = alerta

  //-------------------------------------------------------------------------------------------------------------
  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}>

          {msg && <Alerta alerta={alerta}/>}
      <div className="mb-5 last-of-type:mb-0">

        <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
          Nombre Proyecto
        </label>
        <input type="text" id="nombre" placeholder="Nombre del proyecto"
        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
        value={nombre} onChange={e=>setNombre(e.target.value) }/>
      </div>
      <div className="mb-5 ">

        <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">
          Fecha Entrega
        </label>
        <input type="date" id="fecha-entrega" placeholder="Nombre del proyecto"
        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
        value={fechaEntrega} onChange={e=>setFechaEntrega(e.target.value) }/>
      </div>
      <div className="mb-5 ">

        <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">
          Cliente
        </label>
        <input type="text" id="cliente" placeholder="Nombre del Cliente"
        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
        value={cliente} onChange={e=>setCliente(e.target.value) }/>
      </div>
      <div className="mb-5 ">
        <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">
          Descripcion del proyecto
        </label>
        <textarea id="descripcion" placeholder="Describe el proyecto"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={descripcion} onChange={e=>setDescripcion(e.target.value)}/>
      </div>

      <input type="submit" value={param.id ? "Modificar datos" : "Crear Proyecto"}
      className="bg-sky-600 text-white py-3 px-2 uppercase font-semibold rounded-lg text-center w-full hover:bg-sky-800 cursor-pointer transition-colors"/>
    </form>
  )
}

export default FormularioProyecto
