import React from 'react'
import Icertificado from '../interfaces/Icertificado';
import { firestore } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Itexto } from '../interfaces/Itexto';
import { Ifacultad } from '../interfaces/Ifacultad';
import { Icurso } from '../interfaces/Icurso';


type Props = {
    setCertificados:React.Dispatch<React.SetStateAction<Icertificado[]>>,
    setTextos:React.Dispatch<React.SetStateAction<Itexto[]>>,
    setFacultades:React.Dispatch<React.SetStateAction<Ifacultad[]>>
    setCursos:React.Dispatch<React.SetStateAction<Icurso[]>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Preloader({setCertificados, setTextos, setFacultades, setCursos, setOpen}:Props) 
{
    const db1 = collection(firestore, 'certificados');
    React.useEffect(()=>{
      setOpen(true)
      const getData = async()=>{
        const data = await getDocs(db1);
        
        setCertificados(data.docs.map((item)=>{
            return { ...item.data(), id:item.id} as Icertificado
        }));
      }
      getData()
    },[])
    
    const db2 = collection(firestore, 'textos');
    React.useEffect(()=>{
      const getData = async()=>{
        const data = await getDocs(db2);
        
        setTextos(data.docs.map((item)=>{
            return { ...item.data(), id:item.id} as Itexto
        }));
      }
      getData()
    },[])

    const db3 = collection(firestore, 'facultades');
    React.useEffect(()=>{
      const getData = async()=>{
        const data = await getDocs(db3);
        setFacultades(data.docs.map((item)=>{
            return { ...item.data(), id:item.id} as Ifacultad
        }));
      }
      getData()
    },[])

    const db4 = collection(firestore, 'cursos');
    React.useEffect(()=>{
      const getData = async()=>{
        const data = await getDocs(db4);
        setCursos(data.docs.map((item)=>{
            return { ...item.data(), id:item.id} as Icurso
        }));
      }
      setOpen(false);
      getData()
    },[])

    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}
