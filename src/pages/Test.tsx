import React from 'react'
import { firestore } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore'


const fetchRecord = async (idioma:string,nivel:string,dni:string,solicitud:string) => {
    const recordRef = collection(firestore, 'solicitudes')
    const q = query(
        recordRef, 
        where('dni','==',dni),
        where("idioma","==",idioma),
        where("nivel","==",nivel),
        where('solicitud','==',solicitud),
        where('estado','!=','ENTREGADO')
    )
    // Obtenemos los documentos que cumplen la consulta
    const querySnapshot = await getDocs(q)

    // Devolvemos un array con los datos de los documentos
    return querySnapshot.docs.map((doc)=> doc.data())
}

export default function Test() 
{
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(()=>{
        const fetchData = async() =>{
            const result = await fetchRecord("INGLES","BASICO","99999999","CERTIFICADO_DE_ESTUDIO")
            setData(result)
        }
        fetchData()
    },[])

    console.log(data);
    
    return (
        <React.Fragment>Test</React.Fragment>
    )
}
