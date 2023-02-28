import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import useAuth from "../hooks/useAuth";

let socket;
const ProyectoContext = createContext()

const ProyectoProvider = ({children}) =>{

    const navigate = useNavigate()
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    //para arreglar flash cuando se cambia de ver un proyecto a otro
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)
    const { auth } = useAuth()

    //alerta es un objeto que recibe la fn
    const mostrarAlerta = (alerta) => {
        setAlerta(alerta)
        setTimeout( ()=>{
            setAlerta({})
        }, 3000)
    }

    const submitProyecto = async proyecto =>{
        console.log(proyecto);
        if(proyecto.id){
           await editarProyecto(proyecto)
        }else{
           await nuevoProyecto(proyecto)
        }
        return
    }

    const editarProyecto = async (proyecto)=>{
        console.log("Editando...");
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            console.log(data);
            //Sincronizar el state proyectos, si el data(nuevo) que recibimos como respuesta esta en el array lo  guardamos, si no se guarda el que ya estaba
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setAlerta( {msg :"Proyecto actualizado", error: false })
            setProyectos(proyectosActualizados)
            setTimeout(()=>{
                setAlerta({})
                //navigate("/proyectos")
            },3000)
        }catch (error) {
            console.log(error);
        }
    }

    const nuevoProyecto = async (proyecto) =>{
        console.log("Creando...");
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/proyectos', proyecto, config)
            setAlerta({msg: "Proyecto Creado exitosamente", error: false})
            console.log(data)
            setProyectos([...proyectos, data]) //actualizar listado sin tener que refrescar pagina
            setTimeout(()=>{
                setAlerta({})
                //navigate("/proyectos")
            },2000)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        const obtenerProyectos = async () =>{
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers:{
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            const {data} = await clienteAxios('/proyectos', config)
            console.log(data);
            setProyectos(data)
            } catch (error) {
                console.log(error);
            } 
        }
        obtenerProyectos()
    },[auth])

    //SOCKET IO  - aqui nos conectamos 
    useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL)
    },[])

    const obtenerProyecto = async (id) =>{
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`/proyectos/${id}`, config)
            console.log(data);
            setProyecto(data.proyecto)
        } catch (error) {
            console.log(error);
        }
        setCargando(false)
    }

    const eliminarProyecto = async (id) =>{
        console.log(id);
       try {
        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
        console.log(data);
        //navigate("/proyectos")
        const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
        console.log(proyectosActualizados);
        setProyectos(proyectosActualizados)
       } catch (error) {
            console.log(error);
       }
    }

    const handleModalTarea = () =>{
        setModalFormularioTarea(!modalFormularioTarea)
        //lo dejamos vacio ya que con la ediciono estamos llenando los campos con los valores de la 
        //ultima tarea cargada para edicion
        setTarea({})
    }

    const submitTarea = async (tarea) =>{
        console.log(tarea);
 
        if(tarea?.id){
            await editarTarea(tarea)
        }else{
            await crearTarea(tarea)
        }
    }

    const crearTarea = async (tarea)=> {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/tareas', tarea, config)
            
            //la pasamos a la Fn submit de socket io
            // //agrega la tarea al state
            // const proyectoActualizado = {...proyecto} //asignamos una copia del proyecto
            // proyectoActualizado.tareas = [...proyecto.tareas, data] //agregamos la tarea al array tareas de ese proyecto
            // setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormularioTarea(false) //cerramos el modal de tarea

            //SOCKET IO
            socket.emit('nueva tarea', data)

        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async (tarea)=> {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
            // const proyectoActualizado = {...proyecto}
            // //recorremos las tareas
            // proyectoActualizado.tareas = proyecto.tareas.map(tareaState => 
            //     tareaState._id === data._id ? data : tareaState)
            // setProyecto(proyectoActualizado)
            setAlerta({});
            setModalFormularioTarea(false)

            //SOCKET IO
            socket.emit('editar tarea', data)

        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTarea = async () =>{
        console.log(tarea);
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            setAlerta({ msg: data.msg, error:false});
            //a SOKET IO
            // const proyectoActualizado = {...proyecto}
            // proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState =>
            //     tareaState._id !== tarea._id )
            // setProyecto(proyectoActualizado)
            handleModalEliminarTarea()
           
            //SOCKET IO 
            socket.emit('eliminar tarea', tarea)
            setTarea({})
            setTimeout(()=>{
                setAlerta({})
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEliminarTarea = (tarea) =>{
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const hanldeModalEditarTarea = (tarea) =>{
        setTarea(tarea)
        //usamos el modificador, ya que si usamos la fn handleModalTarea nos dejará la tarea vacia siempre
        setModalFormularioTarea(true) 
    }

    const submitColaborador = async (email) =>{
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos/colaboradores',{email}, config)
            console.log(data);
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            console.log(error);
            setAlerta({ msg: error.response.data.msg, error:true})
        }finally{
            setCargando(false)  
        }
      
    }

    const agregarColaborador = async (email) =>{

        try {
        const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,email, config)
            setAlerta({msg: data.msg, error: false})
            setColaborador({})
            setTimeout(()=>{
                setAlerta({})
            },3000)
            //setAlerta({})
        } catch (error) {
            mostrarAlerta({msg: error.response.data.msg, error: true});            
        }
    }

    const handleModalEliminarcolaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }

    const eliminarColaborador = async () =>{
        console.log(colaborador);
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`,{id: colaborador._id}, config)
            const proyectoActualizado = {...proyecto}
            console.log(proyectoActualizado);
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id )
            setProyecto(proyectoActualizado)
            setAlerta({msg: data.msg, error: false})
            setColaborador({})
            setModalEliminarColaborador(false)
            setTimeout(()=>{
                setAlerta({})
            },3000)
        } catch (error) {
            mostrarAlerta({msg: error.response.data.msg, error: true});            
        }
    }

    const completarTarea = async (id) =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }//revisar tareasRoutes, alli esta la ruta para cambiar el estado de la tarea
            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            // const proyectoActualizado = {...proyecto}
            // proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
            // setProyecto(proyectoActualizado)
            setTarea({})
            setAlerta({})

            //SOCKET IO
            socket.emit("cambiar estado", data)

        }catch (error){
            console.log(error.response);
        }
    }

    const handleBuscador = () =>{
        setBuscador(!buscador)
    }

    //SOCKET IO
        //recibe tarea desde Proyecto por socket io
    const submitTareasProyecto = (tarea) =>{
        //agrega la tarea al state
        const proyectoActualizado = {...proyecto} //asignamos una copia del proyecto
        //agregamos la tarea al array tareas de ese proyecto
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado)
    }

    const eliminarTareaProyecto = (tarea) =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState =>
                tareaState._id !== tarea._id )
        setProyecto(proyectoActualizado)
    }

    const editarTareaProyecto = (tarea) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => 
            tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    const cambiarEstado = (tarea) =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    const cerrarSesion = () =>{
        setProyecto({})
        setProyectos([])
        setAlerta({})
    }
    //-----------------------------------------------------------------------------------------------------
    return (
        <ProyectoContext.Provider
        value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto,
            obtenerProyecto,
            proyecto, //envia la fata del proyecto a visualizar
            cargando,
            eliminarProyecto,
            handleModalTarea,
            modalFormularioTarea,
            submitTarea,
            hanldeModalEditarTarea,
            tarea,
            handleModalEliminarTarea,
            modalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            agregarColaborador,
            handleModalEliminarcolaborador,
            modalEliminarColaborador,
            eliminarColaborador,
            completarTarea, // la llevamos a Tarea ya que ahi esta identificado el ID
            buscador,
            handleBuscador,
            submitTareasProyecto,
            eliminarTareaProyecto,
            editarTareaProyecto,
            cambiarEstado,
            cerrarSesion
        }}>
            {children}
        </ProyectoContext.Provider>
    )
}

export { ProyectoProvider }

export default ProyectoContext


