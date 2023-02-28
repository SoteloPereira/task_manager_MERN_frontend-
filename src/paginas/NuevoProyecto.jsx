import { Link } from "react-router-dom"
import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
    return (
      <>
          <h1 className="text-3xl font-black">Nuevo Proyecto</h1>
          <Link to="../">Volver</Link>
          <div className="mt-10 flex justify-center">
            <FormularioProyecto />
              
          </div>
      </>
    )
  }
  
  export default NuevoProyecto
  