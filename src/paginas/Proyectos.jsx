import VerProyecto from '../components/VerProyecto';
import useProyectos from '../hooks/useProyectos'
import io from 'socket.io-client'
import { useEffect } from 'react';

let socket;

const Proyectos = () => {

  const {proyectos} = useProyectos() //viene como prop desde Provider
  console.log(proyectos);

  useEffect(()=>{
    //en io indicamo hacia donde nos vamos a conectar, abrimos una conexion
    socket = io(import.meta.env.VITE_BACKEND_URL)
    
    
  }) //sin dependencias para que este corriendo todo el tiempo

  return (
    <>
        <h1 className="text-3xl font-black">Proyectos</h1>
        
        <div className='bg-white shadow p-5 rounded-lg mt-5'>
          {proyectos.length > 0 ? 
            proyectos.map(proyecto => (
              <VerProyecto 
                    proyecto={proyecto} 
                    key={proyecto._id} 
              /> ))
          : <p className='text-center uppercase text-gray-600 font-semibold '>No hay proyectos</p>}  
        </div>
    </>
  )
}

export default Proyectos
