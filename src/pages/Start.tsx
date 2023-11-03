import { Box, Button, Grid, TextField, MenuItem, InputAdornment, Snackbar, Alert, Switch } from "@mui/material";
import { TIPO_SOLICITUD } from "../Constantes";
import {IbasicInfo, IbasicVal} from "../interfaces/IbasicInfo";
import EmailIcon from '@mui/icons-material/Email';
import { useMask } from '@react-input/mask';
import { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {
    data:IbasicInfo,
    startProcess(): void,
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void,
    handleChangeSwitch(event: React.ChangeEvent<HTMLInputElement>):void
}

export default function Start({data, startProcess, handleChange, handleChangeSwitch}:Props)
{
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
    let emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    let dni:boolean
    let email:boolean

    const [val, setVal] = useState<IbasicVal>({
        dni:false,email:false
    })
    //estado de snackbar informativo
    const [open, setOpen] = useState<boolean>(false);

    //cerrar el snackbar informativo
    const handleClose = () => setOpen(false);

    const handleClick = () => {
        if(validation()){
            startProcess()
        }
        return
    }
    const validation = () => {
        if(data.email === ''){
            email = false
            setOpen(!email)
            setVal((prevBasicVal)=>({...prevBasicVal, email:true}))
        }else{
            if(!emailRegex.test(data.email)){
                email = false
                setOpen(!email)
                setVal((prevBasicVal)=>({...prevBasicVal, email:true}))
            }else{
                email = true
                setOpen(!email)
                setVal((prevBasicVal)=>({...prevBasicVal, email:false}))
            }
        }
        if(data.dni === '' || data.dni.length <8){
            dni = false
            setOpen(!dni)
            setVal((prevBasicVal)=>({...prevBasicVal, dni:true}))
        }else{
            dni = true
            setOpen(!dni)
            setVal((prevBasicVal)=>({...prevBasicVal, dni:false}))
        }
        return email && dni
    }

    return (
    <Box component="form" sx={{p:2}} noValidate autoComplete="off">
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    select 
                    name='solicitud'
                    label="Tipo de Solicitud" 
                    value={data.solicitud}
                    onChange={e=>handleChange(e)}
                    helperText="Seleccione el tipo de solicitud">
                    {
                        TIPO_SOLICITUD.map((option)=>(
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))
                    }
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField      
                    required
                    name='email'
                    fullWidth
                    error={val.email}
                    value={data.email}
                    onChange={e=>handleChange(e)}
                    label="Email"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    helperText={val.email && "Campo requerido, ingresar un email válido"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    inputRef={dniRef}
                    required
                    fullWidth
                    error={val.dni}
                    value={data.dni}
                    onChange={e=>handleChange(e)}
                    name="dni"
                    label="DNI"
                    helperText={val.dni && "Campo requerido, mínimo 8 dígitos"}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Alert severity="warning">
                    En caso sea trabajador y acceder al 100% de descuento, deberá presentar la Constancia de 
                    Trabajador(Original) escaneada otorgado por la oficina de personal. En caso contrario dejar 
                    desactivado esta opción.
                </Alert>
                <FormControlLabel
                    control={<Switch onChange={handleChangeSwitch} checked={data.trabajador} name="trabajador"/>}
                    label="Trabajador UNAC" 
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Alert severity="warning">
                    En caso tenga matrículas en ciclos anteriores al año <b>2010</b> deberá proporcionar información 
                    en que año y mes, cursó dicho ciclo. En caso contrario dejar desactivado esta opción.
                </Alert>
                <FormControlLabel
                    control={<Switch onChange={handleChangeSwitch} checked={data.antiguo} name="antiguo"/>}
                    label="Matriculado anterior al año 2010" 
                />
            </Grid>
        </Grid>
        <Snackbar open={ open } autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Ingresar los datos solicitados
            </Alert>
        </Snackbar>
        <Button onClick={handleClick}>Avanzar</Button>
    </Box>
    )
}