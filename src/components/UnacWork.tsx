import { Box, Alert, Button, LinearProgress, Card, CardMedia, CardContent, Grid } from '@mui/material'
import { VisuallyHiddenInput } from '../services/Constantes';
import { IstudentData } from '../interfaces/IstudentData';
import { IbasicInfo } from '../interfaces/IbasicInfo';
import React from 'react';
import SolicitudesService from '../services/SolicitudesService';
import { useNavigate } from 'react-router-dom';
import MySnackBar from './MUI/MySnackBar';
import StorageService from '../services/StorageService';
import { CloudUploadIcon, FolderIcon } from '../services/icons';
import { Itexto } from '../interfaces/Types';

type Props = {
    basicData: IstudentData,
    dataStr: string,
    setConstancia: React.Dispatch<React.SetStateAction<string>>
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    textos:Itexto[],
    basicInfo:IbasicInfo
}

export default function UnacWork({dataStr, setConstancia, open, setOpen, basicData, textos, basicInfo}:Props)
{
    const [data,setData] = React.useState<any>([])
    const [progress, setProgress] = React.useState<number>(0)
    const [enviar, setEnviar] = React.useState<boolean>(true)
    //router
    const navigate = useNavigate()
    
    // Validar si hay registros anteior *****************************************************************
    React.useEffect(()=>{
        const fetchData = async() =>{
            const result = await SolicitudesService.fetchRecord(basicData.idioma,basicData.nivel,basicInfo.dni,basicInfo.solicitud)
            
            if(result.length > 0){
                console.log('existe registro anterior');
                navigate('/cargo',{state:{data:result}})
            }
        }
        fetchData()
    },[])

    const handleClick = () => {
        let name = data.name.split('.')
        name = `${basicInfo.dni}-${basicData.idioma}-${basicData.nivel}.${name[1]}`
        StorageService.uploadTrabajador(name,data,setEnviar,setProgress,setConstancia)
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { files } = e.target as HTMLInputElement
        const selectedFiles = files as FileList;
        setData(selectedFiles?.[0])  
        setEnviar(false)
    }

    return(
        <Box sx={{mt:1}}>
            <Grid justifyContent={'center'} container spacing={2} >
                <Grid item xs={12} sm={6}>
                    <Alert severity="warning">
                        {textos.find(objeto=> objeto.titulo === 'texto_1_trabajador')?.texto}
                    </Alert>
                    <LinearProgress variant="determinate" value={progress} sx={{mt:1}} />
                    <Button 
                        component="label"
                        sx={{m:2, width:'80%'}}
                        variant="contained"
                        startIcon={<FolderIcon />}>
                            Buscar Archivo
                            <VisuallyHiddenInput type="file" accept='image/* , application/pdf,' onChange={e=> handleChange(e)}/>
                    </Button>
                    <Alert severity="info" sx={{mt:1}}>
                        Luego de buscar el archivo <FolderIcon /> puede subirlo al servidor para su revisión 
                        <CloudUploadIcon /> se acepta formatos *.jpg *.png *.pdf
                    </Alert>
                    <Button 
                        sx={{mt:1, width:'80%'}} 
                        color='secondary' 
                        variant="contained" 
                        startIcon={<CloudUploadIcon />}
                        onClick={handleClick} 
                        disabled={enviar}>
                        Subir Archivo
                    </Button>
                    <Alert severity="info" sx={{mt:1}}>
                        En caso usted no sea trabajador puede <b>OMITIR</b> este paso.
                    </Alert>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Card sx={{ maxWidth: 345, p:2 }}>
                        <CardMedia
                            component="img"
                            alt="documento"
                            image={dataStr}
                        />
                        <CardContent>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <MySnackBar  
                content='Ingresar los datos solicitados, subir el archivo correspondiente'
                open={open}
                setOpen={setOpen}
                severity='error'
            />
        </Box>
    )
}