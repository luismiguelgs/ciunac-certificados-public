import { Box, Alert, Button, Snackbar, LinearProgress, Card, CardMedia, CardContent, Grid } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from '../Constantes';
import {storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import { IstudentData } from '../interfaces/IstudentData';


type Props = {
    basicData: IstudentData,
    dataStr: string,
    changeDataStr(data:string):void
    open: boolean,
    handleClose():void
}

export default function UnacWork({dataStr, changeDataStr , open, handleClose, basicData}:Props)
{
    const [data,setData] = useState<any>([])
    const [progress, setProgress] = useState<number>(0)
    const [enviar, setEnviar] = useState<boolean>(true)
    
    const handleClick = () => {
        const name = data.name.split('.')
        const storageRef = ref(storage, `trabajadores/${basicData.celular}-${basicData.idioma}-${basicData.nivel}.${name[1]}`);
        const uploadTask = uploadBytesResumable(storageRef, data);
        uploadTask.on('state_changed', (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log('Upload is ' + progress + '% done');
            setEnviar(true)
            setProgress(progress)
          },(error)=>{
            console.log(error.message);
          },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                changeDataStr(downloadUrl)
                console.log('Archivo disponible en... ', downloadUrl);
            });
          });
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { files } = e.target as HTMLInputElement
        const selectedFiles = files as FileList;
        setData(selectedFiles?.[0])  
        setEnviar(false)
    }

    return(
        <Box sx={{m:2}}>
            <Grid justifyContent={'center'} container spacing={2} >
                <Grid item xs={12}>
                    
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Alert severity="warning">
                        Trabajadores UNAC CAS y NOMBRADOS tienen un descuento del  100% presentando Constancia de 
                        Trabajador(Original) otorgado por la oficina de personal. !PRESENTAR TODA LA DOCUMENTACIÓN EN
                        FOLDER MANILA SIN FASTENERS!
                    </Alert>
                    <LinearProgress variant="determinate" value={progress} sx={{mt:2}} />
                    <Button 
                        component="label"
                        sx={{m:3, width:'80%'}}
                        variant="contained"
                        startIcon={<FolderIcon />}>
                            Buscar Archivo
                            <VisuallyHiddenInput type="file" accept='image/* , application/pdf,' onChange={e=> handleChange(e)}/>
                    </Button>
                    <Alert severity="info" sx={{mt:1}}>
                        Luego de buscar el archivo <FolderIcon /> puede subirlo al servidor para su revisión <CloudUploadIcon />
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
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="documento"
                            image={dataStr}
                        />
                        <CardContent>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
            <Snackbar open={ open } autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Ingresar los datos solicitados
                </Alert>
            </Snackbar>
        </Box>
    )
}