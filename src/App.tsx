import './App.css'
import Proceso from './pages/Proceso'
import Start from './pages/Start'
import { Toolbar, Box, AppBar, Typography } from '@mui/material'
import { useState } from 'react'
import Preloader from './components/Preloader';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PrivateRoutes from './pages/PrivateRoutes'
import Cargo from './pages/Cargo'
import Reporte from './pages/Reporte'
import { Icertificado, Icurso, Ifacultad, Itexto } from './interfaces/Types'
import { Isolicitud } from './interfaces/Isolicitud'
import uploadLogo from './assets/upload.svg'
//import Test from './pages/Test'

function App() 
{
  //variable de datos iniciales
  const [certificados, setCertificados] = useState<Icertificado[]>([]);
  const [textos, setTextos] = useState<Itexto[]>([])
  const [facultades, setFacultades] = useState<Ifacultad[]>([])
  const [cursos, setCursos] = useState<Icurso[]>([])
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
  
  return(
      <Box sx={{ flexGrow: 1 }}>
        <Preloader setCertificados={setCertificados} setTextos={setTextos} setFacultades={setFacultades} setCursos={setCursos} />
        <AppBar position="static" style={{width:'100%',marginBottom:'12px'}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SOLICITUD: {title}
            </Typography>
          </Toolbar>
        </AppBar>
        {/*   Router   */ }
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Start 
                certificados={certificados}
                data={solicitud} 
                textos={textos}
                setAuth={setAuth}
                setTitle={setTitle}
                setData={setSolicitud}/> 
            } /> 
            <Route element={<PrivateRoutes auth={auth}/>}>
              <Route path='/proceso' element={
                <Proceso 
                  data={solicitud} 
                  setData={setSolicitud}
                  textos={textos} 
                  facultades={facultades} 
                  cursos={cursos} 
                  certificados={certificados}/>
              } />
              <Route path='/cargo' element={<Cargo textos={textos} />} />
            </Route>
            <Route path='/reporte' element={<Reporte />} />
            {/*<Route path='/test' element={<Test basicInfo={basicInfo} textos={textos} facultades={facultades} cursos={cursos} certificados={certificados}/>} />*/}
            <Route path="*" element={<div><p>Página no disponible: 404!</p><Link to={'/'} >Inicio</Link></div>} />
          </Routes>
        </BrowserRouter>
    </Box>
  )
}

export default App
