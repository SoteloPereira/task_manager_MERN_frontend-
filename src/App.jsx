import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import { AuthProvider } from "./context/AuthProvider"
import Proyectos from "./paginas/Proyectos"
import Proyecto from "./paginas/Proyecto"
import NuevoProyecto from "./paginas/NuevoProyecto"
import EditarProyecto from "./paginas/EditarProyecto"
import { ProyectoProvider } from "./context/ProyectoProvider"
import NuevoColaborador from './paginas/NuevoColaborador'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectoProvider>
          <Routes>
            {/*Todo esto sera el area publica, donde cualquier usuario puede acceder
            - con element indicamos el componente que cubrirá esa ruta */}
            <Route path="/" element={<AuthLayout/>}>
              {/* index le indica que se cargará cuando este en la ruta principal */}
                <Route index element={<Login/>} />
                <Route path="registrar" element={<Registrar/>} />
                <Route path="olvide-password" element={<OlvidePassword/>} />
                {/* le pasamos el token una vez que se haya validado el usuario */}
                <Route path="olvide-password/:token" element={<NuevoPassword/>} />
                {/* para confirmar al usuario nuevo, necesitamos el id */}
                <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta/>} />
            </Route>
            
            {/* rutas protegidas con el acceso */}
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />}/>
              <Route path="nuevo-colaborador/:id" element={ <NuevoColaborador />} />
              <Route path=":id" element={<Proyecto />}/>
              <Route path="editar/:id" element={ <EditarProyecto />} />
            </Route>

          </Routes>
        </ProyectoProvider>
      </AuthProvider>
    </BrowserRouter>
   
  )
}

export default App
