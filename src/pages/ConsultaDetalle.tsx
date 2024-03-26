import {Avatar, Paper, Grid, Typography, Card, Stack, CardHeader, CardMedia, CardContent } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useLocation } from 'react-router-dom';
import { Isolicitud } from '../interfaces/Isolicitud';
import { Timestamp } from 'firebase/firestore';
import proceso1 from '../assets/2.png'
import proceso2 from '../assets/3.png'

export default function ConsultaDetalle() 
{
    const location = useLocation()
    const data:Isolicitud[] = location.state?.data || [] 
    
    return (
        <Grid container component="main" sx={{ height: '80vh' }}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square sx={{p:3}}>
                {
                    data && (<>
                        <Typography variant='h5'>{data[0].apellidos} {data[0].nombres}</Typography>
                            <Stack spacing={2}>
                            {
                                data.map((item)=>(
                                        <Card key={item.id}>
                                            <CardHeader avatar={
                                                <Avatar>
                                                    {
                                                        item.estado === 'NUEVO' ? 
                                                        (<HourglassBottomIcon color='info'/>) : 
                                                        item.estado === 'ELABORADO' ?
                                                        (<CheckCircleIcon  color='success'/>) : 
                                                        (<ThumbUpOffAltIcon />)
                                                    }
                                                </Avatar>}
                                                title={item.solicitud}
                                                subheader={(new Date((item.creado as Timestamp).seconds * 1000)).toLocaleDateString()}>
                                            </CardHeader>
                                            {
                                                item.estado === 'NUEVO' ? 
                                                (<CardMedia
                                                    component="img"
                                                    height="184"
                                                    sx={{p:2}}
                                                    image={proceso1}
                                                    alt="Proceso"
                                                />) : 
                                                item.estado === 'ELABORADO' ?
                                                (<CardMedia
                                                    component="img"
                                                    height="184"
                                                    sx={{p:2}}
                                                    image={proceso2}
                                                    alt="Proceso2"
                                                />) : null
                                            }
                                            <CardContent>
                                                <Typography variant="h6" color="text.secondary">
                                                    Idioma: {item.idioma} Nivel: {item.nivel}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))
                            }
                            </Stack>
                    </>)
                }
            </Grid> 
        </Grid>
    )
}
