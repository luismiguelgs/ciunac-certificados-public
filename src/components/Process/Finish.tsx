import React from "react"
import { Box, Button, Alert, Grid } from '@mui/material'
import DataDisplay from "../Finish/DataDisplay"
import SolicitudesService from "../../services/SolicitudesService"
import { Irow } from "../../interfaces/Types"
import { ArrowBackIcon, AssignmentTurnedInIcon } from "../../services/icons"
import { Isolicitud } from "../../interfaces/Isolicitud"
import { useStateContext } from "../../context/ContextProvider"
import { MyDialog } from "../MUI"
import { useNavigate } from "react-router-dom"
import SwitchResaltado from "../SwitchResaltado"
import Disclamer from "../Finish/Disclamer"

type Props = {
  handleReset?: React.MouseEventHandler
  data:Isolicitud
  setActiveStep:React.Dispatch<React.SetStateAction<number>>
  constancia:string,
  data2010:Irow[],
}
interface Condiciones{
  data:boolean,
  aceptar:boolean
}

export default function Finish({ data, setActiveStep, constancia, data2010 }:Props)
{
  	const { textos } = useStateContext()

	const navigate = useNavigate()

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
    	//guardar nuevo registro
    	SolicitudesService.newItem(data,constancia,data2010)
    	//Ir a la pagina final
		navigate('/final')
    	setOpen(false)
  	}
	
	return(
		<Box sx={{m:3}}>
			<Alert sx={{mt:2, mb:2}} severity="info">
				{textos.find(objeto=> objeto.titulo === 'texto_1_final')?.texto}
			</Alert>
			<DataDisplay data={data}/>
			<Grid container spacing={1} justifyContent='center'>
				<Grid item xs={6}>
					<SwitchResaltado
					checked={condiciones.data}
					mensaje='Marcar si los datos indicados lineas arriba son los correctos' 
					label="Los datos proporcionados son los correctos"
					name="data" 
					handleChange={handleChangeSwitch}
					fullWidth={true}/>
				</Grid>
				<Grid item xs={6}>
					<SwitchResaltado
						checked={condiciones.aceptar}
						mensaje='Marcar si acepta todos los términos y condiciones líneas abajo' 
						label="Acepta todos los términos y condiciones"
						name="aceptar" 
						handleChange={handleChangeSwitch}
						fullWidth={true}/>
				</Grid>
			</Grid>
			<Disclamer />
			<Box sx={{display:'flex',flexDirection:'column',pt:2}}>
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
			</Box>
			<MyDialog 
				type="ALERT"
				title={data.solicitud}
				content={`Enviar datos correspondientes a su solicitud: ${data.solicitud}`}
				open={open}
				setOpen={setOpen}
				actionFunc={handleFinish}
			/>
		</Box>	
	)
}