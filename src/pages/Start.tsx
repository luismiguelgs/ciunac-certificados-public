import { Box, Button, Grid, TextField, MenuItem, InputAdornment, Snackbar, Alert, Switch } from "@mui/material";
import {IbasicInfo, IbasicVal} from "../interfaces/IbasicInfo";
import EmailIcon from '@mui/icons-material/Email';
import { useMask } from '@react-input/mask';
import { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Icertificado from "../interfaces/Icertificado";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Itexto } from "../interfaces/Itexto";
import { Dialog, DialogContent, CircularProgress, Typography } from '@mui/material';

type Props = {
    certificados:Icertificado[],
    data:IbasicInfo,
    textos:Itexto[],
    startProcess(): void,
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void,
    handleChangeSwitch(event: React.ChangeEvent<HTMLInputElement>):void,
    openL:boolean
}

export default function Start({certificados, data, textos, startProcess, handleChange, handleChangeSwitch, openL}:Props)
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
                { certificados.length > 0 && (<TextField 
                    select 
                    name='solicitud'
                    label="Tipo de Solicitud" 
                    value={data.solicitud}
                    //defaultValue={data.solicitud}
                    onChange={e=>handleChange(e)}
                    helperText="Seleccione el tipo de solicitud">
                    { 
                        certificados?.map((option)=>(
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))
                    }
                </TextField>)}
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
                    {textos.find(objeto=> objeto.titulo === 'texto_1_inicio')?.texto}
                </Alert>
                <FormControlLabel
                    control={<Switch onChange={handleChangeSwitch} checked={data.trabajador} name="trabajador"/>}
                    label="Trabajador UNAC" 
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Alert severity="warning">
                    {textos.find(objeto=> objeto.titulo === 'texto_2_inicio')?.texto}
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
        <Button onClick={handleClick} variant="contained" size="large" endIcon={<PlayCircleFilledIcon />}>Avanzar</Button>
        <Dialog open={openL} onClose={() => setOpen(false)}>
            <DialogContent>
              <CircularProgress />
                {/* Opcional: Agregar un mensaje de carga */}
                {<Typography>Cargando...</Typography> }
            </DialogContent>
        </Dialog>
    </Box>
    )
}