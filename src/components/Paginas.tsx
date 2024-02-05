import { Typography } from '@mui/material'
import React from 'react'
import paso1 from './../assets/manual/Paso1.jpg'
import paso2 from './../assets/manual/Paso2.jpg'
import paso3 from './../assets/manual/Paso3.jpg'
import paso4 from './../assets/manual/Paso4.jpg'
import paso5 from './../assets/manual/Paso5.jpg'
import paso6 from './../assets/manual/Paso6.jpg'
import paso7 from './../assets/manual/Paso7.jpg'
import paso8 from './../assets/manual/Paso8.jpg'
import paso9 from './../assets/manual/Paso9.jpg'
import paso10 from './../assets/manual/Paso10.jpg'
import paso11 from './../assets/manual/Paso11.jpg'
import paso12 from './../assets/manual/Paso12.jpg'
import paso13 from './../assets/manual/Paso13.jpg'
import paso14 from './../assets/manual/Paso14.jpg'
import paso15 from './../assets/manual/Paso15.jpg'
import paso16 from './../assets/manual/Paso16.jpg'
import paso17 from './../assets/manual/Paso17.jpg'
import paso18 from './../assets/manual/Paso18.jpg'
import paso19 from './../assets/manual/Paso19.jpg'
import paso20 from './../assets/manual/Paso20.jpg'
import paso21 from './../assets/manual/Paso21.jpg'
import paso22 from './../assets/manual/Paso22.jpg'

export function Pagina1() 
{
  return (
    <React.Fragment>
        <Typography color='primary' variant="subtitle2" gutterBottom><b>Seleccionar el tipo de certificado a tramitar</b></Typography>
        <img src={paso1} style={{ width: '90%', height: 'auto', margin: '2px 0' }} alt="Paso1"/>
        <Typography color='primary' variant="subtitle2" gutterBottom><b>Ingresar correo y DNI(OBLIGATORIO)</b></Typography>
        <img src={paso2} style={{ width: '80%', height: 'auto', margin: '2px 0' }} alt="Paso2"/>
        <img src={paso3} style={{ width: '80%', height: 'auto', margin: '2px 0' }} alt="Paso3"/>
        <Typography color='primary' variant="subtitle2" gutterBottom><b>Marcar si es trabajador(OPCIONAL)</b></Typography>
        <img src={paso4} style={{ width: '60%', height: 'auto', margin: '2px 0' }} alt="Paso4"/>
        <Typography color='primary' variant="subtitle2" gutterBottom><b>Marcar si se matriculo antes del año 2010(OPCIONAL)</b></Typography>
        <img src={paso5} style={{ width: '60%', height: 'auto', margin: '2px 0' }} alt="Paso5"/>
        <Typography color='primary' variant="subtitle2" gutterBottom><b>Marcar la verificación(OBLIGATORIO)</b></Typography>
        <img src={paso6} style={{ width: '45%', height: 'auto', margin: '2px 0' }} alt="Paso6"/> 
    </React.Fragment>
  )
}

export function Pagina2() 
{
    return (
        <React.Fragment>
            <Typography color='primary' variant="subtitle2" gutterBottom>
                <b>Ingrese sus apellidos y nombres(OBLIGATORIO)</b>
            </Typography>
            <img src={paso7} style={{ width: '80%', height: 'auto', margin: '2px 0' }} alt="Paso1"/>
            <img src={paso8} style={{ width: '80%', height: 'auto', margin: '2px 0' }} alt="Paso2"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
                <b>Seleccione el idioma y nivel</b>
            </Typography>
            <img src={paso9} style={{ width: '80%', height: 'auto', margin: '2px 0' }} alt="Paso3"/>
            <img src={paso10} style={{ width: '80%', height: 'auto', margin: '2px 0' }} alt="Paso4"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
                <b>Ingresar su teléfono(OBLIGATORIO)</b>
            </Typography>
            <img src={paso11} style={{ width: '60%', height: 'auto', margin: '2px 0' }} alt="Paso5"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
                <b>Marcar si es alumno UNAC(OPCIONAL)</b>
            </Typography>
            <img src={paso12} style={{ width: '50%', height: 'auto', margin: '2px 0' }} alt="Paso6"/>
        </React.Fragment>
    )
}

export function Pagina3() {
    return (
      <React.Fragment>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Ingrese los datos de ciclo: año, mes, y profesor</b>
            </Typography>
            <img src={paso13} style={{ width: '90%', height: 'auto', margin: '2px 0' }} alt="Paso1"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Agrege los datos de cada ciclo</b>
            </Typography>
            <img src={paso14} style={{ width: '25%', height: 'auto', margin: '2px 0' }} alt="Paso3"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>En caso de tener matriculas luego del año 2010 puede omitir</b>
            </Typography>
            <img src={paso15} style={{ width: '25%', height: 'auto', margin: '2px 0' }} alt="Paso5"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Pulsar para guardar esta información</b>
            </Typography>
            <img src={paso16} style={{ width: '25%', height: 'auto', margin: '2px 0' }} alt="Paso6"/>
      </React.Fragment>
    )
}
export function Pagina4() {
    return (
      <React.Fragment>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Buscar el archivo y subirlo este puede ser formato PDF, JPG ó PNG (Omitir solo CAS)</b>
            </Typography>
            <img src={paso17} style={{ width: '85%', height: 'auto', margin: '2px 0' }} alt="Paso1"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Seleccione el monto pagado, si es personal CAS puede seleccionar S/0, pero deberá subir su certificado de trabajo</b>
            </Typography>
            <img src={paso18} style={{ width: '85%', height: 'auto', margin: '2px 0' }} alt="Paso3"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Ingresar el número de voucher, en caso de ser el monto S/0.00, (Omitir solo CAS)</b>
            </Typography>
            <img src={paso19} style={{ width: '85%', height: 'auto', margin: '2px 0' }} alt="Paso5"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Ingresar la fecha de pago del voucher, (Omitir solo CAS)</b>
            </Typography>
            <img src={paso20} style={{ width: '85%', height: 'auto', margin: '2px 0' }} alt="Paso6"/>
      </React.Fragment>
    )
}
export function Pagina5() {
    return (
      <React.Fragment>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Buscar el archivo y subirlo este puede ser formato PDF, JPG ó PNG (Solo para trabajadores UNAC)</b>
            </Typography>
            <img src={paso21} style={{ width: '90%', height: 'auto', margin: '2px 0' }} alt="Paso1"/>
            <Typography color='primary' variant="subtitle2" gutterBottom>
              <b>Presionar en finalizar luego de subir el archivo para terminar el proceso</b>
            </Typography>
            <img src={paso22} style={{ width: '25%', height: 'auto', margin: '2px 0' }} alt="Paso3"/>
      </React.Fragment>
    )
}