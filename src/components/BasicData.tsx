import { TextField, InputAdornment, Grid, Alert, Box } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NIVEL} from '../services/Constantes';
import { useMask } from '@react-input/mask';
import { IstudentData, IstudentVal } from '../interfaces/IstudentData';
import MySnackBar from './MUI/MySnackBar';
import MySelect from './MUI/MySelect';
import MySwitch from './MUI/MySwitch';
import { Icurso, Ifacultad, Itexto } from '../interfaces/Types';

type Props = {
    data: IstudentData,
    setData:React.Dispatch<React.SetStateAction<IstudentData>>,
    validation:IstudentVal,
    checked:boolean,
    setChecked:React.Dispatch<React.SetStateAction<boolean>>,
    textos:Itexto[],
    facultades:Ifacultad[],
    cursos:Icurso[],
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
}

export default function BasicData({data, setData, validation,checked,setChecked,textos,facultades, cursos, open,  setOpen}:Props)
{
    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const celularRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });

    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setData((prevFormData)=>({...prevFormData, [name]:value}))
    }
    //datos de alumno unac
    const handleChangeSwitch = () => setChecked(!checked)

    return(
        <Box component="form" sx={{pt:1,mt:1}} noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Alert severity="warning">
                        {textos.find(objeto=> objeto.titulo === 'texto_1_basico')?.texto}
                    </Alert>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        inputRef={apellidoRef}
                        sx={{width:'85%'}}
                        required
                        fullWidth
                        name='apellidos'
                        error={validation.apellidos}
                        value={data.apellidos}
                        onChange={e=>handleChange(e)}
                        label="Apellidos"
                        helperText={validation.apellidos && "Campo requerido"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        inputRef={nombreRef}
                        sx={{width:'85%'}}
                        required
                        fullWidth
                        name='nombres'
                        error={validation.nombres}
                        value={data.nombres}
                        onChange={e=>handleChange(e)}
                        label="Nombres"
                        helperText={validation.nombres && "Campo requerido"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySelect 
                        sx={{width:'85%'}}
                        name="idioma"
                        label="Idioma"
                        value={data.idioma}
                        handleChange={e=>handleChange(e)}
                        helperText="Seleccionar el idioma"
                        data={cursos}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySelect 
                        sx={{width:'85%'}}
                        name="nivel"
                        label="Nivel"
                        value={data.nivel}
                        handleChange={e=>handleChange(e)}
                        helperText="Seleccionar el nivel"
                        data={NIVEL}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        inputRef={celularRef}
                        sx={{width:'85%'}}
                        required
                        fullWidth
                        name='celular'
                        error={validation.celular}
                        value={data.celular}
                        onChange={e=>handleChange(e)}
                        type='text'
                        label="Celular"
                        InputProps={{
                            inputMode: 'numeric',
                            startAdornment: (<InputAdornment position="start"><WhatsAppIcon /></InputAdornment>),
                        }}
                        variant="outlined"
                        helperText={validation.celular && "Campo requerido, mínimo 9 dígitos"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySwitch 
                        handleChange={handleChangeSwitch}
                        checked={checked}
                        name='antiguo'
                        label='Marcar si es alumno/egresado de la UNAC'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MySelect 
                        disabled={!checked}
                        sx={{m:1,width:'85%'}}
                        name="facultad"
                        label="Facultad"
                        value={data.facultad}
                        handleChange={e=>handleChange(e)}
                        helperText="Seleccionar facultad"
                        data={facultades}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        inputRef={codigoRef}
                        disabled={!checked}
                        sx={{m:1,width:'85%'}}
                        error={validation.codigo}
                        name="codigo"
                        label="Código de Alumno"
                        value={data.codigo}
                        onChange={e=>handleChange(e)}
                        helperText={validation.codigo && "Ingresar su código de alumno"}
                    />
                </Grid>
            </Grid>
            <MySnackBar
                open={open}
                setOpen={setOpen}
                severity='error'
                content='Ingresar los datos solicitados'
            />
        </Box>
    )
}