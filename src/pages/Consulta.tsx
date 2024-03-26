import * as React from 'react';
import {Avatar, Button, TextField, Link, Paper, Box, Grid, Typography, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { VERSION } from '../services/Constantes'
import { MyDialog } from '../components/MUI';
import ReCAPTCHA from "react-google-recaptcha";
import { useMask } from '@react-input/mask';
import SolicitudesService from '../services/SolicitudesService';
import { Isolicitud } from '../interfaces/Isolicitud';
import { useNavigate } from 'react-router-dom';


type Buscar = {
    dni: string,
    remember: boolean
}
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://ciunac.unac.edu.pe/">
                CIUNAC
            </Link>
            {` ${new Date().getFullYear()}. version: ${VERSION}`}
        </Typography>
    );
}

type Props = {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Consulta({setAuth}:Props) 
{
    const navigate = useNavigate()
    const captchaRef = React.useRef<ReCAPTCHA>(null)
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
    const [buscar, setBuscar] = React.useState<Buscar>({
        dni: localStorage.getItem('texto_buscar') || '',
        remember: Boolean(localStorage.getItem('remember')) || false
    })
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [errorMsg, setErrorMsg] = React.useState<string>('') //Error Message
    const [error, setError] = React.useState<boolean>(false) //Error
    const [open, setOpen] = React.useState<boolean>(false) //Alert
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        setBuscar((prevFormData)=>({...prevFormData, [name]:value}))
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisabled(true)
        //verificacion de usuario
        if (validate()) {
            const result = await SolicitudesService.getItem(buscar.dni) as Isolicitud[];
            if(result.length > 0){   
                setAuth(true)  
                navigate('/consulta-detalle',{state:{data:result}})
            }else{
                setOpen(true)
                setDisabled(false)
                setErrorMsg('No tiene solicitudes resgistradas')
            }
        }
    };

    const validate = ():boolean => {
        let dni:boolean
        let captcha:boolean

        if(buscar.dni === '' || buscar.dni.length <8)
        {
            dni = false
        }else{
            dni = true
        }
        setError(!dni)
        const captchaValue = captchaRef.current?.getValue()

        if(!captchaValue){
            captcha = false
        }else{
            captcha = true
        }
        return dni && captcha
    }

    return (
        <Grid container component="main" sx={{ height: '80vh' }}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={6}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Buscar mi solicitud
                    </Typography>
                    <Alert severity="info" aria-haspopup="true">
                        Ingresar su DNI, y verficar si esta listo para recoger su certificado
                    </Alert>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            inputRef={dniRef}
                            required
                            fullWidth
                            value={buscar.dni}
                            label="DNI"
                            name="dni"
                            error={error}
                            autoComplete="dni"
                            autoFocus
                            onChange={handleChange}
                        />
                        <ReCAPTCHA sitekey={import.meta.env.VITE_APP_SITE_KEY} ref={captchaRef} />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={disabled}>Buscar</Button>
                                <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
            <MyDialog 
                content={errorMsg}
                open={open}
                setOpen={setOpen}
                title='Error'
                type='SIMPLE'
            />
        </Grid>
    )
}
