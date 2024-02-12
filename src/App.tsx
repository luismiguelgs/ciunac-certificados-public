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
import MyAppBar, { IconMenu } from './components/MUI/MyAppBar'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useStateContext } from './context/ContextProvider'
import Finish from './pages/Finish'

function App() 
{
    const { setOpenManual } = useStateContext()

    //variable de datos iniciales
    const [auth, setAuth] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('CIUNAC - Solicitudes')
    
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
                <Route path='/' element={<Start setAuth={setAuth} setTitle={setTitle} /> } /> 
                <Route element={<PrivateRoutes auth={auth}/>}>
                    <Route path='/proceso' element={<Proceso />} />
                    <Route path='/cargo' element={<Cargo />} />
                    <Route path='/final' element={<Finish />} />
                </Route>
                <Route path='/reporte' element={<Reporte />} />
                <Route path="*" element={<div><p>Página no disponible: 404!</p><Link to={'/'} >Inicio</Link></div>} />
          </Routes>
        </BrowserRouter>
        
    </Box>
  )
}

export default App