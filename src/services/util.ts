import { Timestamp } from "firebase/firestore";

export const changeDate = (date:Timestamp, hora=true):string|undefined => {
    if(date === null) return
    const fecha:Date  = date?.toDate()
    // Obtener diferentes partes de la fecha y hora
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, se suma 1
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    // Formatear los valores para que tengan dos dígitos si es necesario
    
    const diaFormateado = String(dia).padStart(2, '0');
    const mesFormateado = String(mes).padStart(2, '0');
    if(hora){
      const horasFormateadas = String(horas).padStart(2, '0');
      const minutosFormateados = String(minutos).padStart(2, '0');
      const segundosFormateados = String(segundos).padStart(2, '0');
      // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
      const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio} ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
      return fechaFormateada
    }else{
      // Generar la cadena con el formato deseado (por ejemplo, dd/mm/aaaa hh:mm:ss)
      const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;
      return fechaFormateada
    }
} 
  