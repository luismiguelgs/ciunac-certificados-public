import './App.css'
import Proceso from './pages/Proceso'
import Start from './pages/Start'
import { Box } from '@mui/material'
import { useState } from 'react'
import Preloader from './components/Preloader';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PrivateRoutes from './pages/PrivateRoutes'
import Cargo from './pages/Cargo'
import Reporte from './pages/Reporte'
import { Isolicitud } from './interfaces/Isolicitud'
import uploadLogo from './assets/upload.svg'
import MyAppBar, { IconMenu } from './components/MUI/MyAppBar'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useStateContext } from './context/ContextProvider'
import Manual from "./components/Manual";

function App() 
{
    const { setOpenManual } = useStateContext()

    //variable de datos iniciales
    const [auth, setAuth] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('CIUNAC - Solicitudes')
    const [solicitud, setSolicitud] = useState<Isolicitud>({
        solicitud:'CERTIFICADO_DE_ESTUDIO',
        email:'',
        dni:'',
        codigo:'',
        facultad:'PAR',
        trabajador:false,
        antiguo:false,
        apellidos: '',
        nombres: '',
        celular: '',
        idioma: 'INGLES',
        nivel: 'BASICO',
        pago: '',
        voucher: uploadLogo,
        numero_voucher:'',
        fecha_pago: '',
    })

  //icono de menu
  const iconos:IconMenu[] = [
    {
      label:'Ver Manual',
      icon: <MenuBookIcon />,
      handleClick: () => setOpenManual((prevVal)=> !prevVal)
    }
  ]
  
  return(
      <Box sx={{ flexGrow: 1 }}>
        <Preloader />
        <MyAppBar title={`SOLICITUD: ${title}`} icons={iconos} />
        {/*   Router   */ }
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Start 
                data={solicitud} 
                setAuth={setAuth}
                setTitle={setTitle}
                setData={setSolicitud}/> 
            } /> 
            <Route element={<PrivateRoutes auth={auth}/>}>
              <Route path='/proceso' element={
                <Proceso 
                  data={solicitud} 
                  setData={setSolicitud}
                />
              } />
              <Route path='/cargo' element={<Cargo />} />
            </Route>
            <Route path='/reporte' element={<Reporte />} />
            <Route path="*" element={<div><p>Página no disponible: 404!</p><Link to={'/'} >Inicio</Link></div>} />
          </Routes>
        </BrowserRouter>
        <Manual />
    </Box>
  )
}

export default App
