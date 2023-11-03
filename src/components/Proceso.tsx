import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Finish from '../pages/Finish'
import Control from './Control'
import BasicData from './BasicData'
import UnacWork from './UnacWork'
import FinInfo from './FinInfo'
import Before2010 from './Before2010'
import { STEPS } from '../Constantes'
import { IfinData, IfinVal } from '../interfaces/IfinData'
import { Irow } from '../interfaces/Irow'
import { IstudentData, IstudentVal } from '../interfaces/IstudentData'
import uploadLogo from '../assets/upload.svg'
import {IbasicInfo } from '../interfaces/IbasicInfo'

type Props = {
  basicInfo: IbasicInfo
}

export default function Proceso({basicInfo}:Props)
{
  //estado de snackbar informativo
  const [open, setOpen] = React.useState(false);
  //cerrar el snackbar informativo
  const handleClose = () => setOpen(false);

  const [activeStep, setActiveStep] = useState<number>(0)
  const [skipped, setSkipped] = useState(new Set<number>())

  //información básica *****************************************************************
  const [basicData, setBasicData] = React.useState<IstudentData>({
    apellidos: '',
    nombres: '',
    celular:'',
    idioma:'INGLES',
    nivel:'BASICO',
    facultad:'CIENCIAS_DE_LA_SALUD',
    codigo:''
  })
  const [basicVal, setBasicVal] = useState<IstudentVal>({
    apellidos:false,nombres:false,celular:false,codigo:false
  })
  const handleChangeBasicData = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setBasicData((prevFormData)=>({...prevFormData, [name]:value}))
  }
  //datos de alumno unac
  const [checked, setChecked] = useState<boolean>(false)

  const handleChangeSwitch = () => setChecked(!checked)
  //validar
  const validateBasicData = ():boolean =>{
    let nombres:boolean    
    let apellidos:boolean
    let celular:boolean
    let codigo: boolean

    if(basicData.nombres === ''){
      nombres = false
      setOpen(true)
      setBasicVal((prevBasicVal)=>({...prevBasicVal, nombres:true}))
    }else{
      setOpen(false)
      nombres = true
      setBasicVal((prevBasicVal)=>({...prevBasicVal, nombres:false}))
    }
    if(basicData.apellidos === ''){
      setOpen(true)
      apellidos = false
      setBasicVal((prevBasicVal)=>({...prevBasicVal, apellidos:true}))
    }else{
      setOpen(false)
      apellidos = true
      setBasicVal((prevBasicVal)=>({...prevBasicVal, apellidos:false}))
    }
    if(basicData.celular === '' || basicData.celular.length <11){
      setOpen(true)
      celular = false
      setBasicVal((prevBasicVal)=>({...prevBasicVal, celular:true}))
    }else{
      setOpen(false)
      celular = true
      setBasicVal((prevBasicVal)=>({...prevBasicVal, celular:false}))
    }
    if(checked){
      if(basicData.codigo === ''){
        codigo = false
        setOpen(!codigo)
        setBasicVal((prevBasicVal)=>({...prevBasicVal, codigo:true}))
      }
      else{
        codigo = true
        setOpen(!codigo)
        setBasicVal((prevBasicVal)=>({...prevBasicVal, codigo:false}))
      }
      return nombres && apellidos && celular && codigo
    }
    setBasicVal((prevBasicVal)=>({...prevBasicVal, codigo:false}))
    return nombres && apellidos && celular
    
  }

  //información del trabajador (opcional) ************************************************
  const [constanciaTU, setconstanciaTU] = useState<string>(uploadLogo)

  const changeDataStr = (data:string) =>{
    setconstanciaTU(data)
  }

  const validateUnacWork = () =>{
    if(constanciaTU === uploadLogo){
      setOpen(true)
      return false
    }
    setOpen(false)
    return true
  }
//información de pago *************************************************************************

const [finData, setFinData] = useState<IfinData>({imagen:uploadLogo, voucher:'', fecha:''})
const [finVal, setFinVal] = useState<IfinVal>({imagen:false, voucher:false, fecha:false})

const handleChangeFinData = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {name, value} = event.target
  setFinData((prevFormData)=>({...prevFormData, [name]:value}))
}
const handleChangeImg = (img:string) =>{
  setFinData((prevFormData)=>({...prevFormData, imagen:img}))
}
//validar
const validateInfoFin = () => {
  console.log('informacion financiera');
  let imagen:boolean
  let voucher:boolean
  let fecha:boolean

  if(finData.imagen === uploadLogo){
    console.log(finData.imagen);
    imagen = false
    setOpen(true)
    setFinVal((pfv)=>({...pfv, imagen:true}))
  }else{
    imagen = true
    setOpen(true)
    setFinVal((pfv)=>({...pfv, imagen:false}))
  }
  if(finData.voucher === '' || finData.voucher.length < 15){
    voucher = false
    setOpen(true)
    setFinVal((pfv)=>({...pfv, voucher:true}))
  }
  else{
    voucher = true
    setOpen(false)
    setFinVal((pfv)=>({...pfv, voucher:false}))
  }
  if(finData.fecha === ''){
    fecha = false
    setOpen(true)
    setFinVal((pfv)=>({...pfv, fecha:true}))
  }
  else{
    if(new Date() < new Date(finData.fecha)){
      fecha = false
      setOpen(true)
      setFinVal((pfv)=>({...pfv, fecha:true}))
    }
    else{
      setOpen(false)
      fecha = true
      setFinVal((pfv)=>({...pfv, fecha:false}))
    }
  }
  return imagen && voucher && fecha
}

//arreglo de cursos con fechas antes del 2010 (opcional) *******************************
const [rows, setRows] = React.useState<Irow[]>([])
const agregarRows = (row:Irow):void =>{
  setRows([...rows,row])
}
const eliminarRows = (id:number):void =>{
  setRows(rows.filter(r=>r.id !== id))
}
//validacion
const validate2010 = () =>{
  if(rows.length > 0){
    setOpen(false)
    console.log(rows);
    return true
  }
  setOpen(true)
  return false
}

const isStepOptional = (step:number):boolean => {
  return step === 1 || step === 2
}

const isStepSkipped = (step:number) => {
  return skipped.has(step)
}

const handleNext = () => {

  let newSkipped = skipped
  if(isStepSkipped(activeStep)){
    newSkipped = new Set(newSkipped.values())
    newSkipped.delete(activeStep)
  }
    switch (activeStep) {
      case 0:
        if (validateBasicData()) {
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
        if (validateInfoFin()) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setSkipped(newSkipped)
        }
      break
      default:
        break;
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if(!isStepOptional(activeStep)){
      throw new Error("No puede saltar este paso no es opcional.")
    }
    console.log(isStepOptional(activeStep));
    setActiveStep((prevActiveStep) => prevActiveStep + 1)

    setSkipped((prevSkipped)=>{
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }
  
  return (
    <Box sx={{width:'100%', mt:2}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {
          STEPS.map((label,index) => {
            const stepProps: {completed? : boolean} = {}
            const labelProps : {opcional? : React.ReactNode} = {}

            if(isStepOptional(index)){
              labelProps.opcional = (<Typography variant='caption'>Opcional</Typography>)
            }
            if(isStepSkipped(index)){
              stepProps.completed = false
            }
            return(
              <Step key={label}{...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })
        }
      </Stepper>
      {
        activeStep === STEPS.length ? (
          <Finish
            handleBack={handleBack} 
            basicInfo={basicInfo} 
            studentData={basicData} 
            finData={finData} 
            constancia={constanciaTU}
            data2010={rows} />
        ) : (
          <React.Fragment>
            { activeStep === 0 && 
              <BasicData
                data={basicData} 
                handleChange={handleChangeBasicData}
                val={basicVal} 
                checked={checked}
                handleChangeSwitch={handleChangeSwitch}
              />}
            { activeStep === 1 && 
              <UnacWork dataStr={constanciaTU} changeDataStr={changeDataStr} open={open} handleClose={handleClose} basicData={basicData}/>}
           
            { activeStep === 2 && 
              <Before2010 
                data={basicData} 
                rows={rows} 
                agregarRows={agregarRows} 
                eliminarRows={eliminarRows}
                open={open}
                handleClose={handleClose}
              />}
            
            { activeStep === 3 && 
              <FinInfo 
                finData={finData} 
                basicData={basicData}
                changeImgFin={handleChangeImg}
                handleChange={handleChangeFinData} 
                validation={finVal}
                open={open}
                handleClose={handleClose}
              />}
            
            <Control 
              activeStep={activeStep} 
              handleBack={handleBack} 
              isStepOptional={isStepOptional} 
              handleSkip={handleSkip}
              handleNext={handleNext}
              steps={STEPS}
            />
          </React.Fragment>
        )
      }
    </Box>
  )
}
