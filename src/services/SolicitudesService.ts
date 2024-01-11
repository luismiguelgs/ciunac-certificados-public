import { IbasicInfo } from '../interfaces/IbasicInfo';
import { IfinData } from '../interfaces/IfinData';
import { Irow } from '../interfaces/Irow';
import { IstudentData } from '../interfaces/IstudentData';
import { firestore } from '../services/firebase';
import { collection, query, where, getDocs ,serverTimestamp, addDoc} from 'firebase/firestore'

export default class SolicitudesService
{
    private static db = collection(firestore, 'solicitudes')
    private static db_2010 = collection(firestore, 'solicitudes_2010')

    public static async fetchRecord(idioma:string,nivel:string,dni:string,solicitud:string){
        const q = query(
            this.db,
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
    public static async newItem(basicInfo:IbasicInfo,studentData:IstudentData, finData:IfinData, constancia:string, data2010:Irow[]){
        const data = {
            solicitud:basicInfo.solicitud,
            estado:'NUEVO',
            pago:+finData.pago,
            dni:basicInfo.dni,
            email:basicInfo.email,
            trabajador:basicInfo.trabajador,
            antiguo:basicInfo.antiguo,
            nombres:studentData.nombres,
            apellidos:studentData.apellidos,
            celular:studentData.celular,
            idioma:studentData.idioma,
            nivel:studentData.nivel,
            facultad:studentData.facultad,
            codigo:studentData.codigo,
            certificado_trabajo:constancia,
            voucher:finData.imagen,
            numero_voucher:finData.voucher,
            fecha_pago: finData.fecha,
            manual:false,
            creado:serverTimestamp(),
            modificado:serverTimestamp()
          }
          let docRef = null
          try{
            docRef = await addDoc(this.db, data)
          }catch(err){
            console.log(err);
          }
          let newID = null
          if(docRef) newID = docRef.id;
          if(data2010){
            for (let index = 0; index < data2010.length; index++) {
              const data = {
                documento:newID,
                ciclo:data2010[index].ciclo,
                anno: data2010[index].anno,
                mes: data2010[index].mes,
                profesor: data2010[index].profesor
              }
              try{
                let docRef1 = await addDoc(this.db_2010, data)
                console.log(docRef1);
                
              }catch(err){
                console.log(err);
              }            
            } 
          }
    }
}