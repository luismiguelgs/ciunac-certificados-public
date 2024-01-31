import { Box, Alert, Button, TextField,Grid, LinearProgress, Card, CardMedia, CardContent } from '@mui/material'
import { VisuallyHiddenInput } from '../services/Constantes';
import React from 'react';
import { useMask } from '@react-input/mask';
import { IfinData, IfinVal } from '../interfaces/IfinData';
import { IstudentData } from '../interfaces/IstudentData';
import { IbasicInfo } from '../interfaces/IbasicInfo';
import MySnackBar from './MUI/MySnackBar';
import StorageService from '../services/StorageService';
import { CloudUploadIcon, FolderIcon } from '../services/icons';
import { Icertificado, Itexto } from '../interfaces/Types';
import MySelect from './MUI/MySelect';

type Props = {
    basicData: IstudentData,
    finData: IfinData,
    setFinData: React.Dispatch<React.SetStateAction<IfinData>>,
    validation: IfinVal,
    open:boolean,
    textos:Itexto[],
    basicInfo:IbasicInfo,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    certificados : Icertificado[]
}

export default function FinInfo({finData,basicData, setFinData, validation, open, setOpen, textos, basicInfo, certificados}:Props)
{
    const [data,setData] = React.useState<any>([])
    const [progress, setProgress] = React.useState<number>(0)
    const [enviar, setEnviar] = React.useState<boolean>(true)

    const precio = +certificados.filter((cer)=> cer.value === basicInfo.solicitud)[0].precio

    const myData:any[] = [
        {value:precio.toString(), label:`S/${precio.toFixed(2)} - precio normal`},
        {value:(precio - precio*0.8).toString(), label:`S/${(precio - precio*0.8).toFixed(2)} - presentar certificado de trabajo`},
        {value:(precio*0).toString(), label:`S/${(precio*0).toFixed(2)} - presentar certificado de trabajo(CAS)`},
    ]

    const voucherRef = useMask({ mask: '_______________', replacement: { _: /\d/ } });

    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setFinData((prevFormData)=>({...prevFormData, [name]:value}))
    }
      const handleChangeImg = (img:string) =>{
        setFinData((prevFormData)=>({...prevFormData, imagen:img}))
      }

    const handleClick = () => {
        let name = data.name.split('.')
        name = `${basicInfo.dni}-${basicData.idioma}-${basicData.nivel}.${name[1]}`

        StorageService.uploadVoucher(name,data,setEnviar,setProgress,handleChangeImg)
    }
    const handleChangeFile = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { files } = e.target as HTMLInputElement
        const selectedFiles = files as FileList;
        setData(selectedFiles?.[0])  
        setEnviar(false)
    }

    return (
        <Box sx={{m:1,alignContent:'center'}}>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Alert severity="warning">
                        {textos.find(objeto=> objeto.titulo === 'texto_1_pago')?.texto}
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
                        autoComplete='off'
                        inputRef={voucherRef}
                        sx={{mt:2,width:'80%'}}
                        required
                        error={validation.voucher}
                        value={finData.voucher}
                        onChange={e=>handleChange(e)}
                        name="voucher"
                        label="Número de Voucher"
                        helperText={ validation.voucher && "Ingrese el número de voucher"}
                    />
                    <MySelect 
                        sx={{mt:2,width:'80%'}}
                        handleChange={e=>handleChange(e)}
                        name='pago'
                        error={validation.pago}
                        value={finData.pago}
                        label='Monto pagado'
                        helperText={validation.pago && "Ingrese el monto pagado / monto inválido"}
                        data={myData}
                    />
                    <TextField
                        type='date'
                        sx={{mt:2, width:'80%'}}
                        required
                        error={validation.fecha}
                        value={finData.fecha}
                        onChange={e=>handleChange(e)}
                        name="fecha"
                        InputLabelProps={{shrink: true,}}
                        label="Fecha de pago"
                        helperText={ validation.fecha && "Ingrese la fecha de pago válida"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ maxWidth: 345, p:2 }}>
                        <CardMedia
                            component="img"
                            alt="documento"
                            image={finData.imagen}
                        />
                        <CardContent>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <MySnackBar 
                open={open}
                setOpen={setOpen}
                content='Ingresar los datos solicitados'
                severity='error'
            />
        </Box>
    )
}