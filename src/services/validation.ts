import React from 'react'
import uploadLogo from '../assets/upload.svg'
import { IstudentData, IstudentVal } from '../interfaces/IstudentData';
import { IfinData, IfinVal } from '../interfaces/IfinData';
import { IbasicInfo, IbasicVal } from '../interfaces/IbasicInfo';
import { firestore } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore'
import ReCAPTCHA from 'react-google-recaptcha';

export function validationBasicData(
  data:IbasicInfo, 
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setVal: React.Dispatch<React.SetStateAction<IbasicVal>>,
  emailRegex:RegExp,
  captchaRef: React.RefObject<ReCAPTCHA>
  )
{
    let dni:boolean
    let email:boolean
    let captcha:boolean

    if(data.email === '')
    {
      email = false
      setOpen(!email)
      setVal((prevBasicVal)=>({...prevBasicVal, email:true}))
    }else{
      if(!emailRegex.test(data.email)){
        email = false
        setOpen(!email)
        setVal((prevBasicVal)=>({...prevBasicVal, email:true}))
      }else{
        email = true
        setOpen(!email)
        setVal((prevBasicVal)=>({...prevBasicVal, email:false}))
      }
    }
    if(data.dni === '' || data.dni.length <8){
      dni = false
      setOpen(!dni)
      setVal((prevBasicVal)=>({...prevBasicVal, dni:true}))
    }else{
      dni = true
      setOpen(!dni)
      setVal((prevBasicVal)=>({...prevBasicVal, dni:false}))
    }
    const captchaValue = captchaRef.current?.getValue()

    if(!captchaValue){
      captcha = false
      setOpen(!captcha)
    }else{
      captcha = true
      setOpen(!captcha)
    }
    return email && dni && captcha
}

export function validationStudentData(
    data:IstudentData,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    checked:boolean,
    setValidation:React.Dispatch<React.SetStateAction<IstudentVal>>
):boolean
{
    let nombres:boolean    
    let apellidos:boolean
    let celular:boolean
    let codigo: boolean

    if(data.nombres === ''){
      nombres = false
      setOpen(true)
      setValidation((prevBasicVal)=>({...prevBasicVal, nombres:true}))
    }else{
      setOpen(false)
      nombres = true
      setValidation((prevBasicVal)=>({...prevBasicVal, nombres:false}))
    }
    if(data.apellidos === ''){
      setOpen(true)
      apellidos = false
      setValidation((prevBasicVal)=>({...prevBasicVal, apellidos:true}))
    }else{
      setOpen(false)
      apellidos = true
      setValidation((prevBasicVal)=>({...prevBasicVal, apellidos:false}))
    }
    if(data.celular === '' || data.celular.length <11){
      setOpen(true)
      celular = false
      setValidation((prevBasicVal)=>({...prevBasicVal, celular:true}))
    }else{
      setOpen(false)
      celular = true
      setValidation((prevBasicVal)=>({...prevBasicVal, celular:false}))
    }
    if(checked){
      if(data.codigo === ''){
        codigo = false
        setOpen(!codigo)
        setValidation((prevBasicVal)=>({...prevBasicVal, codigo:true}))
      }
      else{
        codigo = true
        setOpen(!codigo)
        setValidation((prevBasicVal)=>({...prevBasicVal, codigo:false}))
      }
      return nombres && apellidos && celular && codigo
    }
    setValidation((prevBasicVal)=>({...prevBasicVal, codigo:false}))
    return nombres && apellidos && celular
}
export function validationFinData(
    data:IfinData,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setValidation:React.Dispatch<React.SetStateAction<IfinVal>>,
    trabajador:boolean
):boolean{
    let imagen:boolean
    let voucher:boolean
    let fecha:boolean
    let pago:boolean

    //val imagen upload
    if(trabajador){
      imagen = true
    }else{
      if(data.imagen === uploadLogo){
        imagen = false
        setOpen(true)
        setValidation((pfv)=>({...pfv, imagen:true}))
      }else{
        imagen = true
        setOpen(true)
        setValidation((pfv)=>({...pfv, imagen:false}))
      }
    }
    //val monto pagado
    if(trabajador){
      if(data.pago === '' || +data.pago < 0 || +data.pago > 100){
        pago = false
        setOpen(!pago)
        setValidation((pfv)=>({...pfv, pago:true}))
      }else{
        pago = true
        setOpen(true)
        setValidation((pfv)=>({...pfv, pago:false}))
      }
    }else{
      if(data.pago === '' || +data.pago <= 0 || +data.pago > 100){
        pago = false
        setOpen(!pago)
        setValidation((pfv)=>({...pfv, pago:true}))
      }else{
        pago = true
        setOpen(true)
        setValidation((pfv)=>({...pfv, pago:false}))
      }
    }
    //val voucher
    if(trabajador){
      voucher = true
    }else{
      if(data.voucher === '' || data.voucher.length < 15){
        voucher = false
        setOpen(true)
        setValidation((pfv)=>({...pfv, voucher:true}))
      }
      else{
        voucher = true
        setOpen(false)
        setValidation((pfv)=>({...pfv, voucher:false}))
      }
    }
    //val fecha
    if(trabajador){
      fecha = true
    }else{
      if(data.fecha === ''){
        fecha = false
        setOpen(true)
        setValidation((pfv)=>({...pfv, fecha:true}))
      }
      else{
        if(new Date() < new Date(data.fecha)){
            fecha = false
            setOpen(true)
            setValidation((pfv)=>({...pfv, fecha:true}))
        }
        else{
            setOpen(false)
            fecha = true
            setValidation((pfv)=>({...pfv, fecha:false}))
        }
      }
    }
    return imagen && voucher && fecha && pago
}
export function validarRegistroAnterior(basicInfo:IbasicInfo, basicData:IstudentData)
{
  
      //buscar registro en la base de datos
      const dni = basicInfo.dni
      const idioma = basicData.idioma
      const nivel = basicData.nivel
      const documento = basicInfo.solicitud
      //base de datos
      const db_solicitudes = collection(firestore, 'solicitudes');

      console.log(dni, idioma, nivel, documento);

      const q = query(db_solicitudes, 
        where('dni','==',dni),
        where('idioma','==',idioma),
        where('nivel','==',nivel),
        where('dni','==',documento),
        where('estado','!=','ENTREGADO')
      )
      getDocs(q).then((querySnapshot) => {
        const datos: any[] = [];
        querySnapshot.forEach((doc)=>{
          datos.push({ id: doc.id, ...doc.data() });
        })
        
      }).catch((error)=>{
        console.log('Error al buscar registros:', error);
      }) 
  
  return false
}