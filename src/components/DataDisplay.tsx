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
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left', marginLeft:'4px' }}>
              Tipo de solicitud: {basicInfo.solicitud}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              Email: {basicInfo.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              DNI: {basicInfo.dni}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              Trabajador UNAC: {basicInfo.trabajador ? 'si':'no'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              Matrícula anterior al 2010: {basicInfo.antiguo ? 'si':'no'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              Celular: {studentData.celular}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              Apellidos: {studentData.apellidos}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              Nombres: {studentData.nombres}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              Idioma: {studentData.idioma}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
              Nivel: {studentData.nivel}
            </Typography>
          </Grid>
          {
            studentData.facultad && 
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
                Facultad: {studentData.facultad}
              </Typography>
            </Grid>
          }
          {
            studentData.codigo &&
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
                Código: {studentData.codigo}
              </Typography>
            </Grid>
          }
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
                Código de voucher: {finData.voucher}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
                Fecha de Pago: {finData.fecha}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'left' }}>
                Monto Pagado: S/{finData.pago}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
        </Grid>
      ) 
}