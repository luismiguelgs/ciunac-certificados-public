import React from "react"
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { STEPS } from "../services/Constantes";
import DialogAlert from "./DialogAlert";

type Props = {
    activeStep:number,
    setActiveStep:React.Dispatch<React.SetStateAction<number>>
    setSkipped:React.Dispatch<React.SetStateAction<Set<number>>>
    handleNext:React.MouseEventHandler,
    isStepOptional(s:number):boolean
    trabajador:boolean,
    antiguo:boolean
}

export default function Control({activeStep, setActiveStep,setSkipped,handleNext, isStepOptional, trabajador, antiguo}:Props)
{
  //estado del alert
  const [openA, setOpenA] = React.useState(false);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  
  const handleSkip = () => {
    if(isStepOptional(activeStep) && trabajador && activeStep==1){
      setOpenA(true)
      return
    }
    if(isStepOptional(activeStep) && antiguo && activeStep==2){
      setOpenA(true)
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  
    setSkipped((prevSkipped)=>{
        const newSkipped = new Set(prevSkipped.values())
        newSkipped.add(activeStep)
        return newSkipped
      })
    }
    
  return(
    <Box sx={{display:'flex', flexDirection:'row',pt:1}}>
      <Button 
        color='primary' 
        disabled={activeStep === 0} 
        onClick={handleBack} 
        sx={{mr:1}} 
        variant="outlined"
        startIcon={<ArrowBackIcon />}>
        REGRESAR
      </Button>
        <Box sx={{flex:'1 1 auto'}}>
          {
            isStepOptional(activeStep) && (
              <Button color='secondary' onClick={handleSkip} sx={{mr:1}} variant="outlined">
                OMITIR
              </Button>
            )
          }
        </Box>
        <Button 
          color="primary" 
          onClick={handleNext} 
          variant="outlined"
          endIcon={<ArrowForwardIcon />}>
          {activeStep === STEPS.length - 1 ? 'TERMINAR':'SIGUENTE'}
        </Button>
        <DialogAlert 
          title='Paso opcional' 
          content='Ha marcado este paso como no opcional' 
          open={openA} 
          setOpen={setOpenA} />
      </Box>
     
    )
}