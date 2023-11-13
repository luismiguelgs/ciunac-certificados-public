import React from 'react'
import Icertificado from '../interfaces/Icertificado';
import { firestore } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

type Props = {
    data?:Icertificado[],
    setData:React.Dispatch<React.SetStateAction<Icertificado[]>>
}

export default function Preloader({setData}:Props) 
{
    const db = collection(firestore, 'certificados');
    React.useEffect(()=>{
        onSnapshot(db, (data)=>{
          setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id  } as Icertificado
          }));
        });
    },[]);
    
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}
