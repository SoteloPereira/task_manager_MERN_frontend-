import { formatearFecha } from "../helpers/formatearFecha"
import useAdmin from "../hooks/useAdmin"
import useProyectos from "../hooks/useProyectos"

const Tarea = ( {tarea} ) => {

    const {nombre, descripcion, prioridad, fechaEntrega, estado, _id, completado} = tarea
    const { hanldeModalEditarTarea, handleModalEliminarTarea, completarTarea}= useProyectos()
    const admin = useAdmin()

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className="text-xl">{nombre}</p>
            <p className="text-sm text-gray-500 uppercase mb-1">{descripcion}</p>
            {/* agregar formato de fecha */}
            <p className="text-sl mb-1">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
            {estado && <p>Completada por: {completado?.nombre} </p>}
        </div>

        <div className="flex flex-col md:flex-row gap-2">
        {admin && (
            <button
             className="bg-indigo-600 px-4 py-3 text-white uppercase font-semibold text-sm rounded-lg"             
             onClick={() => hanldeModalEditarTarea(tarea)}>
                    Editar
            </button>
        )}
      {/* habian 2 botones, es mejor usar el condicional para modificar el texto del boton */}
                <button
                className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-semibold text-sm rounded-lg`}
                onClick={()=> completarTarea(_id)}>
                       {estado ? 'Completa' : 'Incompleta'}
               </button>
            
             {admin && (
            <button
             className="bg-red-600 px-4 py-3 text-white uppercase font-semibold text-sm rounded-lg"
             onClick={()=> handleModalEliminarTarea(tarea)}>
                    Eliminar
            </button>
             )}
        </div>
    </div>
  )
}

export default Tarea
