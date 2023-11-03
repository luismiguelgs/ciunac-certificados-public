import './App.css'
import Proceso from './components/Proceso'
import Start from './pages/Start'
import { Toolbar, Box, AppBar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react'
import {IbasicInfo} from './interfaces/IbasicInfo'

function App() 
{
  //variable de datos iniciales
  const [start, setStart] = useState<boolean>(true)
  const [title, setTitle] = useState<string>('CIUNAC - Solicitudes')
  const [basicInfo, setBasicInfo] = useState<IbasicInfo>({
    solicitud:'CERTIFICADO_DE_ESTUDIO',
    email:'',
    dni:'',
    trabajador:false,
    antiguo:false
  })
  const handleChangeBasicInfo = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setBasicInfo((prevFormData)=>({...prevFormData, [name]:value}))
  }
  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBasicInfo({
      ...basicInfo,
      [event.target.name]: event.target.checked,
    });
  };

  const startProcess = () =>{
    const _title = basicInfo.solicitud.split('_')
    setTitle(_title[0] + ' ' + _title[1] + ' ' + _title[2])
    setStart(!start) 
  }

  return(
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{width:'100%'}}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        { start && 
          <Start 
            data={basicInfo} 
            startProcess={startProcess} 
            handleChange={handleChangeBasicInfo} 
            handleChangeSwitch={handleChangeSwitch}/> 
        }
        { !start && <Proceso basicInfo={basicInfo} />}
    </Box>
  )
}

export default App
