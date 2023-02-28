import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const VerProyecto = ( {proyecto} ) => {

    const { auth} = useAuth() 
    const { nombre, _id, cliente, creador } = proyecto

  return (
    <div className="border-b p-5 flex flex-col md:flex-row gap-2 justify-between last-of-type:border-b-0">
        
          <p className="flex-1"> <span className="font-bold">Proyecto: </span> 
              <span className="uppercase">{nombre}</span>
              <span className="text-gray-400 ml-2 select-none capitalize">{cliente}</span>
          </p>
          
       
        <div className="md:flex justify-between items-center md:gap-3">
          {auth._id !== creador && (
              <p className="py-1 px-2 text-sm rounded-lg bg-green-500 font-semibold uppercase text-white select-none w-32">Colaborador</p>
            )}
          <Link to={`${_id}`} 
          className="text-gray-600 hover:text-gray-800 uppercase text-sm font-semibold">Ver Proyecto</Link>
         </div>
    </div>
  )
}

export default VerProyecto
