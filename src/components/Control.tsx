import React from "react"
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type Props = {
    handleBack: React.MouseEventHandler,
    activeStep:number,
    isStepOptional: (activeStep:number) =>boolean,
    handleSkip:React.MouseEventHandler,
    handleNext:React.MouseEventHandler,
    steps: string[]
  }

export default function Control({activeStep, handleBack,isStepOptional,handleSkip,handleNext,steps}:Props)
{
    
    return(
        <Box sx={{display:'flex', flexDirection:'row',pt:2}}>
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
          {activeStep === steps.length - 1 ? 'TERMINAR':'SIGUENTE'}
        </Button>
      </Box>
    )
}