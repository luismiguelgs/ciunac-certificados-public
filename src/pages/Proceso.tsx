import { Box } from '@mui/material'
import React from 'react'
import Finish from './Finish'
import BasicData from '../components/BasicData'
import UnacWork from '../components/UnacWork'
import FinInfo from '../components/FinInfo'
import Before2010 from '../components/Before2010'
import { IfinData, IfinVal } from '../interfaces/IfinData'
import { IstudentData, IstudentVal } from '../interfaces/IstudentData'
import uploadLogo from '../assets/upload.svg'
import {IbasicInfo } from '../interfaces/IbasicInfo'
import { validationFinData, validationStudentData } from '../services/validation'
import { Icurso, Ifacultad, Itexto, Irow, Icertificado } from '../interfaces/Types'
import MyStepper, { MyStep } from '../components/MUI/MyStepper'

type Props = {
  basicInfo: IbasicInfo
  textos:Itexto[],
  facultades:Ifacultad[],
  cursos:Icurso[],
  certificados: Icertificado[]
}

export default function Proceso({basicInfo, textos, facultades, cursos, certificados}:Props)
{
  //estado de snackbar informativo
  const [open, setOpen] = React.useState(false);
   
  //información básica *****************************************************************
  const [basicData, setBasicData] = React.useState<IstudentData>({
    apellidos: '', nombres: '', celular:'', idioma:'INGLES', nivel:'BASICO', facultad:'PAR', codigo:''
  })
  const [basicVal, setBasicVal] = React.useState<IstudentVal>({apellidos:false, nombres:false, celular:false, codigo:false})
  
  //datos de alumno unac
  const [checked, setChecked] = React.useState<boolean>(false)

  //información del trabajador (opcional) ************************************************
  const [constanciaTU, setConstanciaTU] = React.useState<string>(uploadLogo)

  const validateUnacWork = () =>{
    if(constanciaTU === uploadLogo){
      setOpen(true)
      return false
    }
    setOpen(false)
    return true
  }
  //arreglo de cursos con fechas antes del 2010 (opcional) *******************************
  const [rows, setRows] = React.useState<Irow[]>([])

  //validacion
  const validate2010 = () =>{
    if(rows.length > 0){
      setOpen(false)
      return true
    }
    setOpen(true)
    return false
  }

  //información de pago *************************************************************************
  const precio = certificados.filter((cer)=> cer.value === basicInfo.solicitud)[0].precio
  const [finData, setFinData] = React.useState<IfinData>({imagen:uploadLogo, voucher:'', fecha:'',pago:precio.toString()})
  const [finVal, setFinVal] = React.useState<IfinVal>({imagen:false, voucher:false, fecha:false,pago:false})

  // Control del Stepper *************************************************************************
  const [activeStep, setActiveStep] = React.useState<number>(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())

  const isStepSkipped = (step:number) => {
    return skipped.has(step)
  }
  const handleNext = () => {
    let newSkipped = skipped
    if(isStepSkipped(activeStep)){
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }
    //validar antes de pasar al proceso siguiente
    switch (activeStep) {
      case 0:
        if (validationStudentData(basicData,setOpen,checked,setBasicVal)) {
          if(!checked) setBasicData((prevFormData)=>({...prevFormData, facultad:''}))
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setSkipped(newSkipped)
        }
      break;
      case 1:
        if (validateUnacWork()) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setSkipped(newSkipped)
        }
      break
      case 2:
        if (validate2010()) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setSkipped(newSkipped)
        }
      break
      case 3:
        if (validationFinData(finData,setOpen,setFinVal,basicInfo.trabajador)) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setSkipped(newSkipped)
        }
      break
      default:
      break;
    }  
  }
  const stepFinish = (
    <Finish
      setActiveStep={setActiveStep}
      basicInfo={basicInfo} 
      studentData={basicData} 
      finData={finData} 
      textos={textos}
      constancia={constanciaTU}
      data2010={rows} />
  )
  const stepBasicData = (
    <BasicData
      facultades={facultades}
      data={basicData} 
      cursos={cursos}
      setData={setBasicData}
      validation={basicVal} 
      checked={checked}
      textos={textos}
      open={open}
      setOpen={setOpen}
      setChecked={setChecked} />
  )
  const stepUnacWork = (
    <UnacWork 
      dataStr={constanciaTU} 
      setConstancia={setConstanciaTU}
      open={open} 
      basicInfo={basicInfo}
      textos={textos}
      setOpen={setOpen}
      basicData={basicData} />
  )
  const stepBefore2010 = (
    <Before2010 
      data={basicData} 
      rows={rows} 
      setRows={setRows}
      textos={textos}
      open={open}
      setOpen={setOpen} />
  )
  const stepFinInfo = (
    <FinInfo 
      finData={finData} 
      basicData={basicData}
      setFinData={setFinData}
      validation={finVal}
      textos={textos}
      open={open}
      certificados={certificados}
      basicInfo={basicInfo}
      setOpen={setOpen} />
  )
  
  const stepComponents:MyStep[] = [
    {caption:"Información Básica", component:stepBasicData, optional:false},
    {caption:"Matricula anterior al 2010", component:stepBefore2010, optional:true, optParam: basicInfo.antiguo},
    {caption:"Trabajador UNAC", component:stepUnacWork, optional:true, optParam: basicInfo.trabajador},
    {caption:"Información de pago", component:stepFinInfo, optional:false}
  ]

  return (
    <Box sx={{width:'100%', mt:2}}>
        <MyStepper 
          stepComponents={stepComponents}
          activeStep={activeStep} 
          setActiveStep={setActiveStep}
          skipped={skipped} 
          setSkipped={setSkipped}
          handleNext={handleNext}
          stepFinish={stepFinish}
        />
    </Box>
  )
}
