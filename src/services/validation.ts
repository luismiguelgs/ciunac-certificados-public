import React from 'react'
import uploadLogo from '../assets/upload.svg'
import { firestore } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore'
import ReCAPTCHA from 'react-google-recaptcha';
import { Isolicitud } from '../interfaces/Isolicitud';
import { IbasicVal, IfinVal, IstudentVal } from '../interfaces/Ivalidation';

export function validationBasicData(
  data:Isolicitud, 
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
    data:Isolicitud,
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
export function validationFinData(data:Isolicitud, setOpen:React.Dispatch<React.SetStateAction<boolean>>, 
  setValidation:React.Dispatch<React.SetStateAction<IfinVal>>,
):boolean{
    let imagen:boolean
    let voucher:boolean
    let fecha:boolean
    
    //validacion de imagen del voucher
    const validarVoucherImagen = ():boolean => {
        if(data.voucher === uploadLogo){
            setOpen(true)
            setValidation((pfv)=>({...pfv, imagen:true}))
            return false
        }else{
            setOpen(false)
            setValidation((pfv)=>({...pfv, imagen:false}))
            return true
        }
    }
    //validación del número de voucher
    const validarVoucherNumero = ():boolean => {
        if(data.numero_voucher === '' || (data.numero_voucher as string).length < 15){
            setOpen(true)
            setValidation((pfv)=>({...pfv, voucher:true}))
            return false
          }
          else{
            setOpen(false)
            setValidation((pfv)=>({...pfv, voucher:false}))
            return true
          }
    }
    //validación de la fecha del voucher
    const validarVoucherFecha = ():boolean =>{
        if(data.fecha_pago === ''){
            setOpen(true)
            setValidation((pfv)=>({...pfv, fecha:true}))
            return false
          }
          else{
            if(new Date() < new Date(data.fecha_pago as string)){
                setOpen(true)
                setValidation((pfv)=>({...pfv, fecha:true}))
                return false
            }
            else{
                setOpen(false)
                setValidation((pfv)=>({...pfv, fecha:false}))
                return true
            }
          }
    }

    if(data.trabajador){
        if(+data.pago === 0){
            imagen = true
            voucher = true
            fecha = true
            setOpen(false)
            setValidation((pfv)=>({...pfv, imagen:false, voucher:false, fecha:false}))
        }
        else{
            imagen = validarVoucherImagen()
            voucher = validarVoucherNumero()
            fecha = validarVoucherFecha()
        } 
    }else{
      imagen = validarVoucherImagen()
      voucher = validarVoucherNumero()
      fecha = validarVoucherFecha()
    }
   
    return imagen && voucher && fecha
}
export function validarRegistroAnterior(data:Isolicitud)
{
    //buscar registro en la base de datos
    const dni = data.dni
    const idioma = data.idioma
    const nivel = data.nivel
    const documento = data.solicitud
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