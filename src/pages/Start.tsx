import { Box, Button, Grid, TextField, InputAdornment, Skeleton } from "@mui/material";
import {IbasicInfo, IbasicVal} from "../interfaces/IbasicInfo";
import { useMask } from '@react-input/mask';
import React, { useState } from 'react'
import Icertificado from "../interfaces/Icertificado";
import { Itexto } from "../interfaces/Itexto";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import TableSimple from "../components/start/TableSimple";
import MySelect from "../components/MUI/MySelect";
import MySnackBar from "../components/MUI/MySnackBar";
import { EmailIcon, PlayCircleFilledIcon } from "../services/icons";
import Warning from "../components/start/Warning";
import { validationBasicData } from "../services/validation";

const columns: IColumn[] = [
    { id: 'label', label: 'Certificado', minWidth: 150 },
    { id: 'precio', label: 'Precio S/', minWidth: 120 },
];

type Props = {
    certificados:Icertificado[],
    data:IbasicInfo,
    textos:Itexto[],
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void,
    handleChangeSwitch(event: React.ChangeEvent<HTMLInputElement>):void,
}

export default function Start({certificados, data, textos, handleChange, handleChangeSwitch, setTitle, setAuth}:Props)
{
    const navigate = useNavigate()
    const captchaRef = React.useRef<ReCAPTCHA>(null)
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
    let emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

    const [val, setVal] = useState<IbasicVal>({
        dni:false,email:false
    })
    //estado de snackbar informativo
    const [open, setOpen] = useState<boolean>(false);

    //iniciar proceso
    const startProcess = () =>{
        const _title = data.solicitud.split('_')
        setTitle(_title[0] + ' ' + _title[1] + ' ' + _title[2])
        setAuth(true) 
        console.log(data);
        navigate("/proceso")
        //navigate("/test")
    }

    const handleClick = () => {
        if(validationBasicData(data,setOpen,setVal,emailRegex,captchaRef)){
            startProcess()
        }
        return
    }
    //Recaptcha
    const onChange =(value:any) =>{
        console.log("Captcha value:" + value);
    }

    return (
        <Box component="form" sx={{p:2}} noValidate autoComplete="off">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                { 
                    certificados.length > 0 ? (
                    <MySelect 
                        data={certificados}
                        sx={{width:'70%'}}
                        label="Tipo de Solicitud"
                        name="solicitud"
                        value={data.solicitud}
                        handleChange={e=>handleChange(e)}
                        helperText="Seleccione el tipo de solicitud"
                    />):
                    ( <Grid container justifyContent="center">
                    <Skeleton variant="rectangular" width={'70%'} height={60} />
                  </Grid>)
                }
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
                            startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>),
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
                    <Warning
                        texto={textos.find(objeto=> objeto.titulo === 'texto_1_inicio')?.texto}
                        checked={data.trabajador}
                        handleChange={handleChangeSwitch}
                        label="Trabajador UNAC"
                        name="trabajador" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Warning
                        texto={textos.find(objeto=> objeto.titulo === 'texto_2_inicio')?.texto}
                        checked={data.antiguo}
                        handleChange={handleChangeSwitch}
                        label="Matriculado anterior al año 2010"
                        name="antiguo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ alignContent:'center',alignItems:'center', p:3, display:'flex', flexDirection:'column'}} >
                        <ReCAPTCHA sitekey={import.meta.env.VITE_APP_SITE_KEY} onChange={onChange} ref={captchaRef} />
                        <Button onClick={handleClick} variant="contained" size="large" endIcon={<PlayCircleFilledIcon />} sx={{m:3}}>
                            Avanzar
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}  sm={6}>
                    <TableSimple columns={columns} rows={certificados} action={false} />
                </Grid>
            </Grid>
            <MySnackBar 
                open= {open}
                content="Ingresar los datos solicitados"
                setOpen={setOpen}
                severity="error" />
        </Box>
    )
}