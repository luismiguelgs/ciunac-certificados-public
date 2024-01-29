import React from 'react'
import SolicitudesService from '../services/SolicitudesService';
import { Isolicitud } from '../interfaces/Isolicitud';
import { Alert } from '@mui/material';
import FiltroNombre from '../components/FiltroNombre';
import DataTable from '../components/MUI/DataTable';

const columns: IColumn[] = [
    { id: 'apellidos', label: 'Apellidos', minWidth: 150 },
    { id: 'nombres', label: 'Nombres', minWidth: 120 },
    { id: 'idioma', label: 'Idioma', minWidth: 25, align: 'left' },
    { id: 'nivel', label: 'Nivel', minWidth: 25, align: 'left' },
  ];

export default function Reporte() 
{
    const [data, setData] = React.useState<Isolicitud[]>([]);
    const [tempData, setTempData] = React.useState<Isolicitud[]>([]);

    React.useEffect(()=>{
        SolicitudesService.fetchItemsQuery(setData,setTempData)   
    },[])

    return (
        <React.Fragment>
            { data && (
            <div>
                <Alert sx={{mb:1, p:1}} severity="info">
                    Lista de certificados listos para recoger en mesa de partes, si figura su nombre y apellido ya se puede acercar.
                </Alert>
                <FiltroNombre data={tempData} setData={setTempData} aux={data}/>
                <DataTable columns={columns} rows={tempData} />
            </div>
            )}
        </React.Fragment>
    )
}
