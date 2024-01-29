import React from 'react'
import { Icurso, Ifacultad, Itexto, Icertificado } from '../interfaces/Types';
import TypesService from '../services/TypesService';

type Props = {
    setCertificados:React.Dispatch<React.SetStateAction<Icertificado[]>>,
    setTextos:React.Dispatch<React.SetStateAction<Itexto[]>>,
    setFacultades:React.Dispatch<React.SetStateAction<Ifacultad[]>>
    setCursos:React.Dispatch<React.SetStateAction<Icurso[]>>
}

export default function Preloader({setCertificados, setTextos, setFacultades, setCursos}:Props) 
{
    React.useEffect(()=>{
      TypesService.fetchCertificados(setCertificados)
      TypesService.fetchTextos(setTextos)
      TypesService.fetchFacultades(setFacultades)
      TypesService.fetchCursos(setCursos)
    },[])
    
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}
