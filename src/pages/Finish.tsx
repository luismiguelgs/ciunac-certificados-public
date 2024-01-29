import React from "react"
import { Box, Button, Alert } from '@mui/material'
import {IbasicInfo} from "../interfaces/IbasicInfo"
import { IstudentData } from "../interfaces/IstudentData"
import { IfinData } from "../interfaces/IfinData"
import DataDisplay from "../components/DataDisplay"
import PDFService from "../services/PdfService"
import SolicitudesService from "../services/SolicitudesService"
import pdf from '../assets/pdf.png'
import MySwitch from "../components/MUI/MySwitch"
import DialogAlert from "../components/MUI/DialogAlert"
import { Irow, Itexto } from "../interfaces/Types"
import { ArrowBackIcon, AssignmentTurnedInIcon, CloudDownloadIcon } from "../services/icons"

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
      const blobPdf = PDFService.exportar(textos,{
        solicitud:basicInfo.solicitud,
        creado:new Date().toLocaleString(),
        apellidos: studentData.apellidos,
        nombres: studentData.nombres,
        dni: basicInfo.dni,
        idioma: studentData.idioma,
        nivel: studentData.nivel,
        pago:finData.pago,
        voucher:finData.voucher
      }, false)

      const blobUrl = URL.createObjectURL(blobPdf);

      // Crear un enlace (hipervínculo) invisible
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = blobUrl
      a.download = `${basicInfo.dni}-${studentData.idioma}-${studentData.nivel}.pdf`

      // Agregar el enlace al documento y hacer clic para iniciar la descarga
      document.body.appendChild(a);
      a.click();

      // Limpiar el enlace después de la descarga
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
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
          <MySwitch 
            label="Los datos proporcionados son los correctos"
            name="data"
            checked={condiciones.data}
            handleChange={handleChangeSwitch}
            disabled={success}
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
            <MySwitch 
              label="Acepta todos los términos y condiciones"
              name="aceptar"
              checked={condiciones.aceptar}
              handleChange={handleChangeSwitch}
              disabled={success}
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
            </Box>)
          }
        </Box>
      </Box>
      <DialogAlert 
        title={basicInfo.solicitud}
        content={`Enviar datos correspondientes a su solicitud: ${basicInfo.solicitud}`}
        open={open}
        setOpen={setOpen}
        actions={true}
        actionFunc={handleFinish}
      />
    </React.Fragment>
  )
}