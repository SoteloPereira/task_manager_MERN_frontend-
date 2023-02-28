import useProyectos from "../hooks/useProyectos";

const Colaborador = (colaborador) => {
    
    const {nombre, email} = colaborador.colaborador
    const {handleModalEliminarcolaborador} = useProyectos()

    return (
        <div className='border-b p-5 flex justify-between'>
            <div>
                <p className="font-semibold">{nombre}</p>
                <p className='text-gray-700 text-sm'>{email}</p>
            </div>
            <div>
                <button type="button"
                className='uppercase, text-white bg-red-600 font-semibold rounded-lg py-3 px-4 hover:bg-red-700 transition-colors cursor-pointer'
                onClick={() => handleModalEliminarcolaborador(colaborador.colaborador)}>
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Colaborador
