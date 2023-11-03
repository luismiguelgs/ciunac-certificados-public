import { Box, Alert, Button, TextField,Grid, Snackbar, LinearProgress, Card, CardMedia, CardContent } from '@mui/material'
import { VisuallyHiddenInput } from '../Constantes';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useState} from 'react';
import { useMask } from '@react-input/mask';
import { IfinData, IfinVal } from '../interfaces/IfinData';
import {storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import FolderIcon from '@mui/icons-material/Folder';
import { IstudentData } from '../interfaces/IstudentData';

type Props = {
    basicData: IstudentData
    finData: IfinData,
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void,
    changeImgFin(img:string):void
    validation: IfinVal,
    open:boolean,
    handleClose():void
}

export default function FinInfo({finData,basicData,handleChange, changeImgFin, validation, open, handleClose}:Props)
{
    const [data,setData] = useState<any>([])
    const [progress, setProgress] = useState<number>(0)
    const [enviar, setEnviar] = useState<boolean>(true)

    const voucherRef = useMask({ mask: '_______________', replacement: { _: /\d/ } });

    const handleClick = () => {
        const name = data.name.split('.')
        const storageRef = ref(storage, `vouchers/${basicData.celular}-${basicData.idioma}-${basicData.nivel}.${name[1]}`);
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
                changeImgFin(downloadUrl)
                console.log('Archivo disponible en... ', downloadUrl);
            });
          });
    }
    const handleChangeFile = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { files } = e.target as HTMLInputElement
        const selectedFiles = files as FileList;
        setData(selectedFiles?.[0])  
        setEnviar(false)
    }

    return (
        <Box sx={{m:2,alignContent:'center'}}>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Alert severity="warning">
                        Recibo ORIGINAL de SCOTIABANK. En caso de pagar por ventanilla SERA AL SERVICIO 112, y si el pago 
                        será por aplicativo PONDRA EMPRESA: UNIV DEL CALLAO / SERVICIO: CENTRO DE IDIOMAS EN CASO SEA VIRTUAL 
                        PRESENTARÁ 2 IMPRESIONES.
                    </Alert>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LinearProgress variant="determinate" value={progress} sx={{mt:2}} />
                    <Button 
                        component="label"
                        sx={{m:1, width:'80%'}}
                        variant="contained"
                        startIcon={<FolderIcon />}>
                            Buscar Archivo
                            <VisuallyHiddenInput type="file" accept='image/* , application/pdf,' onChange={e=> handleChangeFile(e)}/>
                    </Button>
                    {validation.imagen ?
                        <Alert severity="error" sx={{mt:1}}>
                            Luego de buscar el archivo <FolderIcon /> puede subirlo al servidor para su revisión <CloudUploadIcon />
                        </Alert>
                        :
                        <Alert severity="info" sx={{mt:1}}>
                        Luego de buscar el archivo <FolderIcon /> puede subirlo al servidor para su revisión <CloudUploadIcon />
                        </Alert>
                    }
                    
                    <Button 
                        sx={{m:1, width:'80%'}} 
                        color='secondary' 
                        variant="contained" 
                        startIcon={<CloudUploadIcon />}
                        onClick={handleClick} 
                        disabled={enviar}>
                        Subir Archivo
                    </Button>
                    <TextField
                        inputRef={voucherRef}
                        sx={{mt:1,width:'80%'}}
                        required
                        error={validation.voucher}
                        value={finData.voucher}
                        onChange={e=>handleChange(e)}
                        name="voucher"
                        label="Número de Voucher"
                        helperText="Ingrese el número de voucher"
                    />
                    <TextField
                        type='date'
                        sx={{mt:1, width:'80%'}}
                        required
                        error={validation.fecha}
                        value={finData.fecha}
                        onChange={e=>handleChange(e)}
                        name="fecha"
                        helperText="Ingrese la fecha de pago válida"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ maxWidth: 345, p:1 }}>
                        <CardMedia
                            component="img"
                            alt="documento"
                            image={finData.imagen}
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