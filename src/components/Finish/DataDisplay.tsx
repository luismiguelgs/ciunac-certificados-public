import { Grid, Typography } from '@mui/material'
import { Isolicitud } from '../../interfaces/Isolicitud'

type Props = {
    data:Isolicitud
}

export default function DataDisplay({data}:Props)
{
    return(
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item xs={12} sm={6} >
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
              Tipo de solicitud: {data.solicitud}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Email: {data.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              DNI: {data.dni}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Trabajador UNAC: {data.trabajador ? 'si':'no'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Matrícula anterior al 2010: {data.antiguo ? 'si':'no'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Celular: {data.celular}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Apellidos: {data.apellidos}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Nombres: {data.nombres}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Idioma: {data.idioma}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Nivel: {data.nivel}
            </Typography>
          </Grid>
          {
            data.facultad && 
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Facultad: {data.facultad}
              </Typography>
            </Grid>
          }
          {
            data.codigo &&
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Código: {data.codigo}
              </Typography>
            </Grid>
          }
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Código de voucher: {data.numero_voucher}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Fecha de Pago: {data.fecha_pago}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Monto Pagado: S/{data.pago}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
        </Grid>
      ) 
}