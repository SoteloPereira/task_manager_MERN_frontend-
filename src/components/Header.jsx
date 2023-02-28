import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./Busqueda"

const Header = () => {

  const {handleBuscador, cerrarSesion} = useProyectos()
  const {cerrarSesionUsuario} = useAuth()

  const handleCerrarSesion = () =>{
    cerrarSesion()
    cerrarSesionUsuario()
    localStorage.removeItem('token')
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
          <h2 className="text-3xl text-sky-600 font-black text-center mb-5 md:mb-0">Task Manager</h2>
          <input type="search" placeholder="Buscar Proyecto" 
            className="border p-2 rounded-lg block lg:w-96 text-center outline-none mb-5 w-full md:w-auto"/>

            {/* hacer la busqueda desde el input (agregando un boton o con enter) */}
            <button type="button" value="Buscar"
            className="bg-slate-400 text-white font-semibold uppercase px-5 text-sm rounded-lg"
            onClick={handleBuscador}>
              Buscar</button>

            {/* este nos permite volver a la raiz de proyectos */}
            <div className="flex items-center gap-4 justify-between">

                <Link to="/proyectos" className="font-black uppercase">Proyectos</Link>

                <button type="button"
                  className="text-white bg-sky-600 font-semibold p-2 rounded-md uppercase text-sm hover:bg-sky-900 cursor-pointer transition-colors"
                  onClick={handleCerrarSesion}
                >Cerrar sesión</button>
            </div>
      </div>
      <Busqueda />
    </header>
  )
}

export default Header
