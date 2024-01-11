import React from "react"
import { Box, Button, Alert, FormControlLabel, Switch, Dialog, DialogTitle,DialogContent, DialogContentText, 
  DialogActions, CircularProgress } from '@mui/material'
import {IbasicInfo} from "../interfaces/IbasicInfo"
import { IstudentData } from "../interfaces/IstudentData"
import { IfinData } from "../interfaces/IfinData"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DataDisplay from "../components/DataDisplay"
import { Irow } from "../interfaces/Irow"
import { Itexto } from "../interfaces/Itexto"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PDFService from "../services/PdfService"
import SolicitudesService from "../services/SolicitudesService"
import pdf from '../assets/pdf.png'


type Props = {
  handleReset?: React.MouseEventHandler
  basicInfo:IbasicInfo,
  studentData:IstudentData,
  finData:IfinData
  setActiveStep:React.Dispatch<React.SetStateAction<number>>
  constancia:string,
  data2010:Irow[],
  textos:Itexto[]
}
interface Condiciones{
  data:boolean,
  aceptar:boolean
}

export default function Finish({ basicInfo, studentData, finData, setActiveStep, constancia, data2010, textos }:Props)
{
  
  const [success,setSuccess] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const [condiciones, setCondiciones] = React.useState<Condiciones>({data:false, aceptar:false})
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClose = () => setOpen(false)

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCondiciones({
      ...condiciones,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFinish = () =>{
    setLoading(true)
    //guardar nuevo registro
    SolicitudesService.newItem(basicInfo,studentData,finData,constancia,data2010)
    setLoading(false)
    setSuccess(true)
    setOpen(false)
  }
  const exportPDF = () => {
      PDFService.exportar(textos,{
        solicitud:basicInfo.solicitud,
        creado:new Date().toLocaleString(),
        apellidos: studentData.apellidos,
        nombres: studentData.nombres,
        dni: basicInfo.dni,
        idioma: studentData.idioma,
        nivel: studentData.nivel,
        pago:finData.pago,
        voucher:finData.voucher
      })
  }
  return(
        <React.Fragment>
            <Box sx={{m:3}}>
              <Alert sx={{mt:2, mb:2}} severity="warning">
                {textos.find(objeto=> objeto.titulo === 'texto_1_final')?.texto}
              </Alert>
              {
                success && (
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Alert sx={{mt:2, mb:2}}  severity="success">Se ha completado el procedimiento puede descargar su cargo!</Alert>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={pdf} alt='pdf' width='50px' style={{margin:'5px'}} onClick={exportPDF}></img>
                    <Button color="success" variant="contained" onClick={exportPDF} autoFocus disabled={loading} endIcon={<CloudDownloadIcon />} >
                      Descargar Cargo
                    </Button>
                  </div>
                </Box> )
              }
              {
                !success && <DataDisplay basicInfo={basicInfo} studentData={studentData} finData={finData}/>
              }
              <Box sx={{flex: '1 1 auto'}}>
                <FormControlLabel
                  control={<Switch onChange={handleChangeSwitch} checked={condiciones.data} name="data" disabled={success}/>}
                  label="Los datos proporcionados son los correctos" 
                />
              </Box>

              
              <Alert sx={{mt:2}} severity="info">
                {textos.find(objeto=> objeto.titulo === 'texto_1_disclamer')?.texto}
              </Alert>
              <Alert sx={{mt:2}} severity="info">
                {textos.find(objeto=> objeto.titulo === 'texto_2_disclamer')?.texto}
              </Alert>
              <Box sx={{display:'flex',flexDirection:'column',pt:2}}>
                <Box sx={{flex: '1 1 auto'}}>
                  <FormControlLabel
                    control={<Switch onChange={handleChangeSwitch} checked={condiciones.aceptar} name="aceptar" 
                    disabled={success}/>}
                    label="Acepta todos los términos y condiciones" 
                />
                </Box>
                {
                  !success && (
                  <Box sx={{flex: '1 1 auto'}}>
                    <Button color='primary' onClick={handleBack} sx={{mr:1}} variant="outlined" startIcon={<ArrowBackIcon />}>
                      REGRESAR
                    </Button>
                    <Button 
                      disabled={!(condiciones.data && condiciones.aceptar)} color='primary' 
                      onClick={()=>setOpen(true)} 
                      sx={{mr:1}} 
                      variant="outlined"
                      endIcon={<AssignmentTurnedInIcon />}>
                      FINALIZAR
                    </Button>
                  </Box>
                )}
                
              </Box>
            </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {basicInfo.solicitud}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Enviar datos correspondientes a su solicitud: {basicInfo.solicitud}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button color="warning" variant="contained" onClick={handleClose} disabled={loading}>
                    Cancelar
                  </Button>
                  <Button color="success" variant="contained" onClick={handleFinish} autoFocus disabled={loading}>
                    Aceptar
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </DialogActions>
              </Dialog>
        </React.Fragment>
  )
}