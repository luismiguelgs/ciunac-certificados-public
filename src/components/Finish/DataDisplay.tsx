import { Grid, Typography } from '@mui/material'
import { Isolicitud } from '../../interfaces/Isolicitud'

type Props = {
    data:Isolicitud
}

export default function DataDisplay({data}:Props)
{
    return(
        <Grid container spacing={1} justifyContent={'center'}>
          <Grid item xs={12} sm={6} >
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
              Tipo de solicitud: <b>{data.solicitud}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Email: <b>{data.email}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              DNI: <b>{data.dni}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Trabajador UNAC: <b>{data.trabajador ? 'SI':'NO'}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Matrícula anterior al 2010: <b>{data.antiguo ? 'SI':'NO'}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Celular: <b>{data.celular}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Apellidos: <b>{data.apellidos}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Nombres: <b>{data.nombres}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Idioma: <b>{data.idioma}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Nivel: <b>{data.nivel}</b>
            </Typography>
          </Grid>
          {
            data.facultad && 
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Facultad: <b>{data.facultad}</b>
              </Typography>
            </Grid>
          }
          {
            data.codigo &&
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Código: <b>{data.codigo}</b>
              </Typography>
            </Grid>
          }
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Código de voucher: <b>{data.numero_voucher}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Fecha de Pago: <b>{data.fecha_pago}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Monto Pagado: <b>S/{data.pago}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
        </Grid>
      ) 
}