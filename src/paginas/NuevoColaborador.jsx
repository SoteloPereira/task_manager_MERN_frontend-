import Alerta from "../components/Alerta"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"

const NuevoColaborador = () => {

    const { proyecto, colaborador, cargando, agregarColaborador, alerta} = useProyectos()

    //if(!proyecto._id) return <Alerta alerta={alerta} />

  return (
    <>
        <h1 className="text-3xl font-bold">Añadir colaborador al proyecto: 
            </h1><span className=" text-4xl block font-black mt-3">{proyecto.nombre}</span> 
        <div className="flex items-center mt-10 justify-center">
            <FormularioColaborador />
        </div>
        {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
            <div className="flex justify-center">
                <div className="bg-white py-10 px-5 w-full md:w-4/6 rounded-lg shadow my-10 mr-5 md:mr-0">
                 
                    <h2 className="text-center mb-10 text-2xl font-semibold">Resultado:</h2>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">{colaborador.nombre}</p>
                        <button
                        className="rounded-lg text-center bg-slate-500 px-5 py-2 uppercase text-white font-semibold text-sm"
                        onClick={() => agregarColaborador({
                            email: colaborador.email
                        })}>
                            Agregar al proyecto</button>
                    </div>
                </div>
            </div>
        )} 
    </>
  )
}

export default NuevoColaborador
