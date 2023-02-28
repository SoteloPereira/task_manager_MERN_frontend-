import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const RutaProtegida = () => {

    //extraemos la data del usuario autenticado
    const { auth,cargando } = useAuth()
    //console.log(auth);
    if(cargando) return "Cargando..." //pasara al return solo cuando cambie


  return (
    <>
      {/* Si no esta logueado lo envia a pantalla de login */}
 
      {auth.nombre ? 
        (//  en caso que este logeado mostramos todo esto
          <div className='bg-gray-100'>
                   <Header />
                   <div className='md:flex md:min-h-screen'>
                      <Sidebar />
                  
                      <main className='flex-1 mt-3 border-l-2 pl-4'>
                          <Outlet />
                      </main>
                   </div>
          </div>
        )
      : <Navigate to="/"/>}
    </>
  )
}

export default RutaProtegida
