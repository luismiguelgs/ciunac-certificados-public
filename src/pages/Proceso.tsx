import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Finish from './Finish'
import Control from '../components/Control'
import BasicData from '../components/BasicData'
import UnacWork from '../components/UnacWork'
import FinInfo from '../components/FinInfo'
import Before2010 from '../components/Before2010'
import { STEPS } from '../services/Constantes'
import { IfinData, IfinVal } from '../interfaces/IfinData'
import { Irow } from '../interfaces/Irow'
import { IstudentData, IstudentVal } from '../interfaces/IstudentData'
import uploadLogo from '../assets/upload.svg'
import {IbasicInfo } from '../interfaces/IbasicInfo'
import { validationBasicData, validationFinData } from '../services/validation'
import { Itexto } from '../interfaces/Itexto'
import { Ifacultad } from '../interfaces/Ifacultad'
import { Icurso } from '../interfaces/Icurso'

type Props = {
  basicInfo: IbasicInfo
  textos:Itexto[],
  facultades:Ifacultad[],
  cursos:Icurso[]
}

export default function Proceso({basicInfo, textos, facultades, cursos}:Props)
{

  //estado de snackbar informativo
  const [open, setOpen] = React.useState(false);
  //cerrar el snackbar informativo
  const handleClose = () => setOpen(false);
 

  //información básica *****************************************************************
  const [basicData, setBasicData] = React.useState<IstudentData>({
    apellidos: '',
    nombres: '',
    celular:'',
    idioma:'INGLES',
    nivel:'BASICO',
    facultad:'PAR',
    codigo:''
  })
  const [basicVal, setBasicVal] = useState<IstudentVal>({
    apellidos:false,nombres:false,celular:false,codigo:false
  })
  
  //datos de alumno unac
  const [checked, setChecked] = useState<boolean>(false)

  //validar
  const validateBasicData = ():boolean =>{
    return validationBasicData(basicData,setOpen,checked,setBasicVal)
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

const [finData, setFinData] = useState<IfinData>({imagen:uploadLogo, voucher:'', fecha:'',pago:'0'})
const [finVal, setFinVal] = useState<IfinVal>({imagen:false, voucher:false, fecha:false,pago:false})

const handleChangeFinData = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {name, value} = event.target
  setFinData((prevFormData)=>({...prevFormData, [name]:value}))
}
const handleChangeImg = (img:string) =>{
  setFinData((prevFormData)=>({...prevFormData, imagen:img}))
}
//validar
const validateInfoFin = () => {
  return validationFinData(finData,setOpen,setFinVal,basicInfo.trabajador)
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

// Control del Stepper *************************************************************************
const [activeStep, setActiveStep] = useState<number>(0)
const [skipped, setSkipped] = useState(new Set<number>())

const isStepSkipped = (step:number) => {
  return skipped.has(step)
}
const isStepOptional = (step:number):boolean => {
  return step === 1 || step === 2
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
            setActiveStep={setActiveStep}
            basicInfo={basicInfo} 
            studentData={basicData} 
            finData={finData} 
            textos={textos}
            constancia={constanciaTU}
            data2010={rows} />
        ) : (
          <React.Fragment>
            { activeStep === 0 && 
              <BasicData
                facultades={facultades}
                data={basicData} 
                cursos={cursos}
                setData={setBasicData}
                validation={basicVal} 
                checked={checked}
                textos={textos}
                setChecked={setChecked}
              />}
            { activeStep === 1 && 
              <UnacWork 
                dataStr={constanciaTU} 
                changeDataStr={changeDataStr} 
                open={open} 
                basicInfo={basicInfo}
                textos={textos}
                handleClose={handleClose} 
                basicData={basicData}/>}
           
            { activeStep === 2 && 
              <Before2010 
                data={basicData} 
                rows={rows} 
                setRows={setRows}
                textos={textos}
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
                textos={textos}
                open={open}
                basicInfo={basicInfo}
                handleClose={handleClose}
              />}
            
            <Control 
              activeStep={activeStep} 
              setActiveStep={setActiveStep}
              setSkipped={setSkipped}
              isStepOptional={isStepOptional} 
              handleNext={handleNext}
              trabajador={basicInfo.trabajador}
              antiguo={basicInfo.antiguo}
            />
          </React.Fragment>
        )
      }
    </Box>
  )
}
