import { Alert, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom'
import pdf from '../assets/pdf.png'
import PDFService from '../services/PdfService';
import { useStateContext } from '../context/ContextProvider';
import Disclamer from '../components/Finish/Disclamer';

export default function Cargo() 
{
    const {textos} = useStateContext()
    const location = useLocation()
    const data = location.state?.data || []

    const descargarPDF = (item:any) =>{
        const blobPDF =  PDFService.exportar(textos,{
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
        const blobUrl = URL.createObjectURL(blobPDF);

        // Crear un enlace (hipervínculo) invisible
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = blobUrl
        a.download = `${item.dni}-${item.idioma}-${item.nivel}.pdf`

        // Agregar el enlace al documento y hacer clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Limpiar el enlace después de la descarga
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    }
    
    return (
        <Box sx={{m:3}}>
            <Alert sx={{mt:2, mb:2}}  severity="success">Se ha completado el procedimiento puede descargar su cargo!</Alert>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {data.map((item:any)=>(
                    <div key={item.id}  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/**
                         * 
                        <a href='https://www.google.com' target="_blank" rel="noopener noreferrer">
                            <img src={pdf} alt={item.id}  width='50px' style={{margin:'5px'}} ></img>
                        </a>
                        */}
                        <img src={pdf} alt={item.id}  width='50px' style={{margin:'5px', cursor:'pointer'}} onClick={()=>descargarPDF(item)} ></img>
                        <Button size="large" onClick={()=>descargarPDF(item)}>{`${item.dni}-${item.idioma}-${item.nivel}.PDF`}</Button>
                    </div>
                ))}
            </Box>
            <Disclamer textoFinal={true} />
        </Box>
    )
}
