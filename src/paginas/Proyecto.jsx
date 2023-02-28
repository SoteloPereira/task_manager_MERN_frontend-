import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Tarea from "../components/Tarea";
import useProyectos from "../hooks/useProyectos"
import useAdmin from '../hooks/useAdmin'
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import io from 'socket.io-client'

let socket;

const Proyecto = () => {

    const param = useParams()
    //const [modal, setModal] = useState(false)
    const {obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareasProyecto, eliminarTareaProyecto, editarTareaProyecto, cambiarEstado} = useProyectos()
    const admin = useAdmin()

    useEffect(()=>{
        obtenerProyecto(param.id)
    },[])

    //se ejecuta una sola vez, para entrar al proyecto/habitacion/room e identificar el id de este
    useEffect(()=>{
        socket= io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir proyecto', param.id)
    },[])

    useEffect(()=>{
        socket.on("tarea agregada", tareaNueva =>{
            console.log(tareaNueva);
            if(tareaNueva.proyecto === proyecto._id){
                submitTareasProyecto(tareaNueva)
            }
        })
        socket.on("tarea eliminada", tareaEliminada => {
            console.log(tareaEliminada);
            if(tareaEliminada.proyecto === proyecto._id){
                eliminarTareaProyecto(tareaEliminada)
            }
        })
        socket.on("tarea editada", tareaEditada => {
            console.log(tareaEditada);
            if(tareaEditada.proyecto._id === proyecto._id){
                editarTareaProyecto(tareaEditada)
            }
        })
        socket.on("estado cambiado", tareaCambiada =>{
            if(tareaCambiada.proyecto._id === proyecto._id){
                cambiarEstado(tareaCambiada)
            }
        })
    })

    const { nombre } = proyecto

    if(cargando) return 'Cargando...'

    const {msg} = alerta

  return (
    msg && alerta.error ? <Alerta alerta={alerta}/> :( 
    <>
        <div className="flex justify-between p-4 border-t">
            <h1 className="font-black text-3xl">{nombre}</h1>
            {admin && (
            <div className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}   stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <Link to={`/proyectos/editar/${param.id}`} className="uppercase font-bold">Editar</Link>
            </div>
            )}
        </div>
        {admin && (
        <button className="text-sm px-5 py-3 w-full bg-sky-400 text-white uppercase text-center rounded-lg font-bold flex gap-2 items-center justify-center mt-5 mr-10"
        onClick={handleModalTarea}>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
        </svg>
            Nueva Tarea
        </button>
        )}
        <div className="flex justify-center">
            <div className=" w-full md:w-1/3 lg:w-2/4">
                {msg && <Alerta alerta={alerta} />}
            </div>
        </div>
        <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
        <div className="bg-white shadow mt-10 rounded-lg" >
            {proyecto.tareas?.length ? 
                proyecto.tareas.map(tarea => 
                <Tarea 
                    tarea={tarea} 
                    key={tarea._id} 
                />) : 
            <p className="p-10 text-center my-5 font-semibold">No hay tareas asociadas al proyecto</p>}
        </div>
        {admin && (
        <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl">Colaborares</p>
            <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className="text-gray-400 uppercase font-bold hover:text-black transition-colors mr-5" >
                Añadir
            </Link>
        </div>
        )}
        {admin && (
        <div className="bg-white shadow mt-10 rounded-lg mb-10" >
            {proyecto.colaboradores?.length ? 
                proyecto.colaboradores.map(colaborador => 
                <Colaborador 
                    colaborador={colaborador} 
                    key={colaborador._id} 
                />) : 
            <p className="p-10 text-center my-5 font-semibold">No hay colaboradores asociadas al proyecto</p>}
        </div>
        )}
        <ModalFormularioTarea 
            //modal={modal} -> los manejamos desde el context
            //setModal={setModal} //porque se cerrará desde el modal
        />
        <ModalEliminarTarea />
        <ModalEliminarColaborador />
    </>  
    )
  )
}

export default Proyecto
