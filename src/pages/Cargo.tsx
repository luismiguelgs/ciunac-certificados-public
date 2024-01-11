import { Alert, Box, Button } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Itexto } from '../interfaces/Itexto';
import pdf from '../assets/pdf.png'
import PDFService from '../services/PdfService';

type Props = {
  textos:Itexto[]
}

export default function Cargo({textos}:Props) 
{
    const location = useLocation()
    const data = location.state?.data || []

    const descargarPDF = (item:any) =>{
      PDFService.exportar(textos,{
        solicitud:item.solicitud,
        creado:item.creado,
        apellidos:item.apellidos,
        nombres:item.nombres,
        dni:item.dni,
        idioma:item.idioma,
        nivel:item.nivel,
        pago: item.pago,
        voucher: item.numero_voucher
      })
    }
    
    return (
      <React.Fragment>
          <Box sx={{m:3}}>
            <Alert sx={{mt:2, mb:2}}  severity="success">Se ha completado el procedimiento puede descargar su cargo!</Alert>
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {data.map((item:any)=>(
                    <div key={item.id}  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={pdf} alt={item.id}  width='50px' style={{margin:'5px'}} onClick={()=>descargarPDF(item)}></img>
                        <Button size="large" onClick={()=>descargarPDF(item)}>{`${item.dni}-${item.idioma}-${item.nivel}.PDF`}</Button>
                    </div>
                  ))}
              </Box>
              <Alert sx={{mt:2}} severity="warning">
                  {textos.find(objeto=> objeto.titulo === 'texto_1_final')?.texto}
              </Alert>
              <Alert sx={{mt:2}} severity="info">
                  {textos.find(objeto=> objeto.titulo === 'texto_1_disclamer')?.texto}
              </Alert>
              <Alert sx={{mt:2}} severity="info">
                  {textos.find(objeto=> objeto.titulo === 'texto_2_disclamer')?.texto}
              </Alert>
          </Box>
      </React.Fragment>
    )
}
