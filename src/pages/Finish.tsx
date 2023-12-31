import React from "react"
import { Box, Button, Alert, FormControlLabel, Switch, Dialog, DialogTitle,DialogContent, DialogContentText, 
  DialogActions, CircularProgress } from '@mui/material'
import {IbasicInfo} from "../interfaces/IbasicInfo"
import { IstudentData } from "../interfaces/IstudentData"
import { IfinData } from "../interfaces/IfinData"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DataDisplay from "../components/DataDisplay"
import { firestore } from '../services/firebase';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore'
import { Irow } from "../interfaces/Irow"
import { Itexto } from "../interfaces/Itexto"


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
  //base de datos
  const db_solicitudes = collection(firestore, 'solicitudes');
  const db_2010 = collection(firestore, 'solicitudes_2010')

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
    newItem()
    setLoading(false)
    setSuccess(true)
    setOpen(false)
  }
  //guardar nuevo registro
  const newItem  = async() =>{
    const data = {
      solicitud:basicInfo.solicitud,
      estado:'NUEVO',
      pago:+finData.pago,
      dni:basicInfo.dni,
      email:basicInfo.email,
      trabajador:basicInfo.trabajador,
      antiguo:basicInfo.antiguo,
      nombres:studentData.nombres,
      apellidos:studentData.apellidos,
      celular:studentData.celular,
      idioma:studentData.idioma,
      nivel:studentData.nivel,
      facultad:studentData.facultad,
      codigo:studentData.codigo,
      certificado_trabajo:constancia,
      voucher:finData.imagen,
      numero_voucher:finData.voucher,
      fecha_pago: finData.fecha,
      creado:serverTimestamp(),
      modificado:serverTimestamp()
    }
    let docRef = null
    try{
      docRef = await addDoc(db_solicitudes, data)
    }catch(err){
      console.log(err);
    }
    let newID = null
    if(docRef) newID = docRef.id;
    if(data2010){
      for (let index = 0; index < data2010.length; index++) {
        const data = {
          documento:newID,
          ciclo:data2010[index].ciclo,
          anno: data2010[index].anno,
          mes: data2010[index].mes,
          profesor: data2010[index].profesor
        }
        try{
          let docRef1 = await addDoc(db_2010, data)
          console.log(docRef1);
          
        }catch(err){
          console.log(err);
        }            
      } 
    }
    
  }
    return(
        <React.Fragment>
            <Box sx={{m:3}}>
              {
                success && <Alert sx={{mt:2, mb:2}}  severity="success">Se ha completado el procedimiento</Alert>
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

              <Alert sx={{mt:2}} severity="warning">
                {textos.find(objeto=> objeto.titulo === 'texto_1_final')?.texto}
              </Alert>
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
                    <Button 
                      color='primary' 
                      onClick={handleBack} 
                      sx={{mr:1}} 
                      variant="outlined"
                      startIcon={<ArrowBackIcon />}>
                      REGRESAR
                    </Button>
                    <Button 
                      disabled={!(condiciones.data && condiciones.aceptar)}
                      color='primary' 
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