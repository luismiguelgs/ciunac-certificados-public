import { Box, Alert, Button, LinearProgress, Card, CardMedia, CardContent, Grid } from '@mui/material'
import { VisuallyHiddenInput } from '../../services/Constantes';
import React from 'react';
import MySnackBar from '../MUI/MySnackBar';
import StorageService from '../../services/StorageService';
import { CloudUploadIcon, FolderIcon } from '../../services/icons';
import { Itexto } from '../../interfaces/Types';
import { Isolicitud } from '../../interfaces/Isolicitud';

type Props = {
    data: Isolicitud,
    imagen: string,
    setConstancia: React.Dispatch<React.SetStateAction<string>>
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    textos:Itexto[]
}

export default function UnacWork({imagen, setConstancia, open, setOpen, data, textos}:Props)
{
    const [file,setFile] = React.useState<any>([])
    const [progress, setProgress] = React.useState<number>(0)
    const [enviar, setEnviar] = React.useState<boolean>(true)
    
    const handleClick = () => {
        let name = file.name.split('.')
        name = `${data.dni}-${data.idioma}-${data.nivel}.${name[1]}`
        StorageService.uploadTrabajador(name,file,setEnviar,setProgress,setConstancia)
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { files } = e.target as HTMLInputElement
        const selectedFiles = files as FileList;
        setFile(selectedFiles?.[0])  
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
                    <Card sx={{ p:2 }}>
                        <CardMedia
                            component="img"
                            alt="documento"
                            image={imagen}
                            style={{width:'70%',margin: '0 auto'}}
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