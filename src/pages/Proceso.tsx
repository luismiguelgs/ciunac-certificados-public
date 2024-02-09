import { Box } from '@mui/material'
import React from 'react'
import Finish from '../components/Process/Finish'
import BasicData from '../components/Process/BasicData'
import UnacWork from '../components/Process/UnacWork'
import FinInfo from '../components/Process/FinInfo'
import Before2010 from '../components/Process/Before2010'
import { validationFinData, validationStudentData } from '../services/validation'
import { Irow } from '../interfaces/Types'
import MyStepper, { MyStep } from '../components/MUI/MyStepper'
import uploadLogo from '../assets/upload.svg'
import { IfinVal, IstudentVal } from '../interfaces/Ivalidation'
import { useStateContext } from '../context/ContextProvider'

export default function Proceso()
{
  const {textos, certificados,data, setData} = useStateContext()
  
  const [open, setOpen] = React.useState(false); //snackbar

  //página de datos básicos ******************************************************************************
  const [basicVal, setBasicVal] = React.useState<IstudentVal>({apellidos:false, nombres:false, celular:false, codigo:false})
  //datos de alumno unac
  const [checked, setChecked] = React.useState<boolean>(false)

  //arreglo de cursos con fechas antes del 2010 (opcional) **********************************************
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
  
  //información de pago *************************************************************************
  React.useEffect(()=>{
    const precio = certificados.filter((cer)=> cer.value === data.solicitud)[0].precio
    if(data.trabajador){
      setData((prevData)=>({...prevData, pago:(precio-precio*0.8).toString(), voucher:uploadLogo}))
    }else{
      setData((prevData)=>({...prevData, pago:precio.toString(), voucher:uploadLogo}))
    }
    
  },[data.solicitud, data.trabajador])
 
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
        if (validationStudentData(data,checked,setBasicVal)) {
          if(!checked) setData((prevFormData)=>({...prevFormData, facultad:''}))
          setOpen(false)
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setSkipped(newSkipped)
        } else{
          setOpen(true)
        }
      break;
      case 1:
        if (validate2010()) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setSkipped(newSkipped)
        }
      break
      case 2:
        if (validationFinData(data,setFinVal)) {
          setOpen(false)
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setSkipped(newSkipped)
        }else{
          setOpen(true)
        }
      break
      case 3:
        if (validateUnacWork()) {
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
      data={data} 
      constancia={constanciaTU}
      data2010={rows} />
  )
  const stepBasicData = (
    <BasicData
      data={data} 
      setData={setData}
      validation={basicVal} 
      checked={checked}
      open={open}
      setOpen={setOpen}
      setChecked={setChecked} />
  )
  const stepUnacWork = (
    <UnacWork 
      imagen={constanciaTU} 
      setConstancia={setConstanciaTU}
      open={open} 
      textos={textos}
      setOpen={setOpen}
      data={data} />
  )
  const stepBefore2010 = (
    <Before2010 
      data={data} 
      rows={rows} 
      setRows={setRows}
      open={open}
      setOpen={setOpen} />
  )
  const stepFinInfo = (
    <FinInfo 
      data={data}
      setData={setData}
      validation={finVal}
      open={open}
      setOpen={setOpen} />
  )
  const stepComponents:MyStep[] = [
    {caption:"Información Básica", component:stepBasicData, optional:false},
    {caption:"Matricula anterior al 2010", component:stepBefore2010, optional:true, optParam: data.antiguo},
  ]
  if(data.trabajador){
    stepComponents.push(
      {caption:"Información de pago", component:stepFinInfo, optional:false},
      {caption:"Trabajador UNAC", component:stepUnacWork, optional:true, optParam: data.trabajador}
    )
  }else{
    stepComponents.push(
      {caption:"Información de pago", component:stepFinInfo, optional:false}
    )
  }
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
