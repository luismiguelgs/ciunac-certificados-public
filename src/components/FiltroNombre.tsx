import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { Isolicitud } from '../interfaces/Isolicitud'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type Props = {
    data: Isolicitud[],
    setData: React.Dispatch<React.SetStateAction<Isolicitud[]>>,
    aux: Isolicitud[]
}

export default function FiltroNombre({data,setData,aux}:Props) 
{
    const [busqueda,setBusqueda] = React.useState<string>('')

    const handleChangeBusqueda = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBusqueda(event.target.value);
    };
    React.useEffect(() => {
        // Filtrar los datos cuando cambia el término de búsqueda
        const filtered = data.filter(item => {
          // Puedes ajustar las propiedades que deseas incluir en la búsqueda
          return (
            item.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.apellidos.toLowerCase().includes(busqueda.toLowerCase())
          );
        });
        
        if(busqueda === ''){
            resetFiltro()
        }else{
            setData(filtered);
        }
    }, [data, busqueda]);

    const resetFiltro = () =>{
        setData(aux)
        setBusqueda('')
    }
    
    return (
        <Grid container spacing={2} sx={{mb:2}}>
            <Grid item xs={12} sm={7}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    fullWidth
                    value={busqueda}
                    onChange={(e)=>handleChangeBusqueda(e)}
                    helperText='Ingresar Apellidos y/o nombres'
                    sx={{ margin: '20px 0' }}
                />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Button variant="contained" endIcon={<RestartAltIcon />} fullWidth size='large' sx={{p:1.5,margin:'20px 0'}} onClick={()=>resetFiltro()}>
                    Resetear
                </Button>
            </Grid>
        </Grid>
    )
}
