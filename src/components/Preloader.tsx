import React from 'react'
import TypesService from '../services/TypesService';
import { useStateContext } from '../context/ContextProvider';


export default function Preloader() 
{
    const { setCertificados, setTextos, setFacultades, setCursos } = useStateContext()
    
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
