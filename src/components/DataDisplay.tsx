import { Grid, Typography } from '@mui/material'
import { IbasicInfo } from '../interfaces/IbasicInfo'
import { IstudentData } from '../interfaces/IstudentData'
import { IfinData } from '../interfaces/IfinData'

type Props = {
    basicInfo:IbasicInfo,
    studentData:IstudentData,
    finData:IfinData
}

export default function DataDisplay({basicInfo,studentData,finData}:Props)
{
    return(
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item xs={12} sm={6} >
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px' }}>
              Tipo de solicitud: {basicInfo.solicitud}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Email: {basicInfo.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              DNI: {basicInfo.dni}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Trabajador UNAC: {basicInfo.trabajador ? 'si':'no'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'10px'}}>
              Matrícula anterior al 2010: {basicInfo.antiguo ? 'si':'no'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Celular: {studentData.celular}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Apellidos: {studentData.apellidos}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Nombres: {studentData.nombres}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Idioma: {studentData.idioma}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
              Nivel: {studentData.nivel}
            </Typography>
          </Grid>
          {
            studentData.facultad && 
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Facultad: {studentData.facultad}
              </Typography>
            </Grid>
          }
          {
            studentData.codigo &&
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Código: {studentData.codigo}
              </Typography>
            </Grid>
          }
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Código de voucher: {finData.voucher}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Fecha de Pago: {finData.fecha}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left',marginLeft:'10px' }}>
                Monto Pagado: S/{finData.pago}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
        </Grid>
      ) 
}