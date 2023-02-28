import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Sidebar = () => {
  //obtenemos los datos del perfil del usuario
  const { auth } = useAuth()

    return (
      <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
          <p className="text-xl font-semibold">Hola: <span className="text-xl font-bold">{auth.nombre}</span></p>
          <Link to="crear-proyecto"
            className="bg-sky-600 w-full p-3 mt-5 text-white uppercase block text-center rounded-md font-bold">
              Nuevo Proyecto</Link>
      </aside>
    )
  }
  
  export default Sidebar