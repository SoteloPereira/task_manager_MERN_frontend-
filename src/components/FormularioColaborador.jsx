import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormularioColaborador = () => {

    const [ email, setEmail] = useState('')
    const {alerta, mostrarAlerta, submitColaborador} = useProyectos()

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(email === ""){
            mostrarAlerta({msg: "El mail es obligatorio", error:true})
            return
        }
        submitColaborador(email) //pasamos el state que tendra el mail digitado por usuario
    }

    const {msg} = alerta

  return (
    <form className="shadow bg-white py-10 px-5 md:w-4/6 rounded-lg w-full mr-5 md:mr-0"
    onSubmit={handleSubmit}>
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5 ">
            <label htmlFor="email" className="text-gray-700 uppercase font-semibold text-md">
                Email Colaborador
            </label>
            <input type="email" id="email" placeholder="Email del colaborador"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email} onChange={e => setEmail(e.target.value)}/>
        </div>

        <input type="submit" value="Agregar colaborador"
      className="bg-sky-600 text-white py-3 px-2 uppercase font-semibold rounded-lg text-center w-full hover:bg-sky-800 cursor-pointer transition-colors"/>
    </form>
  )
}

export default FormularioColaborador
