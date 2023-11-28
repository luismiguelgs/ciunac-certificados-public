import { TextField,MenuItem, InputAdornment, Grid, Alert, Snackbar, FormControlLabel, Switch } from '@mui/material'
import Box from '@mui/material/Box';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NIVEL} from '../services/Constantes';
import { useState } from 'react'
import { useMask } from '@react-input/mask';
import { IstudentData, IstudentVal } from '../interfaces/IstudentData';
import { Itexto } from '../interfaces/Itexto';
import { Ifacultad } from '../interfaces/Ifacultad';
import { Icurso } from '../interfaces/Icurso';


type Props = {
    data: IstudentData,
    setData:React.Dispatch<React.SetStateAction<IstudentData>>,
    validation:IstudentVal,
    checked:boolean,
    setChecked:React.Dispatch<React.SetStateAction<boolean>>,
    textos:Itexto[],
    facultades:Ifacultad[],
    cursos:Icurso[]
}

export default function BasicData({data, setData, validation,checked,setChecked,textos,facultades, cursos}:Props)
{
    const apellidoRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const nombreRef = useMask({ mask: '________________________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } })
    const celularRef = useMask({ mask: '___-___-___', replacement: { _: /\d/ } });
    const codigoRef = useMask({ mask: '__________', replacement: { _: /^[a-zA-Z0-9_]*$/ } });

    //estado de snackbar informativo
    const [open, setOpen] = useState<boolean>(false);

    //cerrar el snackbar informativo
    const handleClose = () => setOpen(false);

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
                    { cursos && <TextField 
                        select 
                        sx={{width:'85%'}}
                        name='idioma'
                        error={false}
                        value={data.idioma}
                        onChange={e=>handleChange(e)}
                        label="Idioma"
                        helperText="Seleccione el idioma">
                        {
                            cursos.map((option)=>(
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                    </TextField>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select 
                        sx={{width:'85%'}}
                        name='nivel'
                        error={false}
                        value={data.nivel}
                        onChange={e=>handleChange(e)}
                        label="Nivel" 
                        helperText="Seleccione el nivel">
                        {
                            NIVEL.map((option)=>(
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                    </TextField>
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
                            startAdornment: (
                                <InputAdornment position="start">
                                    <WhatsAppIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        helperText={validation.celular && "Campo requerido, mínimo 9 dígitos"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={<Switch onChange={handleChangeSwitch} checked={checked} name="antiguo"/>}
                        label="Marcar si es alumno/egresado de la UNAC" 
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {   facultades && <TextField
                            select
                            disabled={!checked}
                            sx={{m:1,width:'85%'}}
                            name="facultad"
                            label="Facultad"
                            value={data.facultad}
                            onChange={e=>handleChange(e)}
                            helperText="Seleccionar facultad"
                        >
                            {
                                facultades?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    }
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
            <Snackbar open={ open } autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Ingresar los datos solicitados
                </Alert>
            </Snackbar>
        </Box>
    )
}