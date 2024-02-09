import React from 'react'
import uploadLogo from '../assets/upload.svg'
import ReCAPTCHA from 'react-google-recaptcha';
import { Isolicitud } from '../interfaces/Isolicitud';
import { IbasicVal, IfinVal, IstudentVal } from '../interfaces/Ivalidation';

export function validationBasicData(data:Isolicitud, setVal: React.Dispatch<React.SetStateAction<IbasicVal>>, emailRegex:RegExp, 
    captchaRef: React.RefObject<ReCAPTCHA>)
{
    let dni:boolean
    let email:boolean
    let captcha:boolean

    if(data.email === '' || !emailRegex.test(data.email))
    {
        email = false
        setVal((prevBasicVal)=>({...prevBasicVal, email:true}))
    }else{ 
        email = true
        setVal((prevBasicVal)=>({...prevBasicVal, email:false}))
    }
    if(data.dni === '' || data.dni.length <8)
    {
        dni = false
        setVal((prevBasicVal)=>({...prevBasicVal, dni:true}))
    }else{
        dni = true
        setVal((prevBasicVal)=>({...prevBasicVal, dni:false}))
    }
    const captchaValue = captchaRef.current?.getValue()

    if(!captchaValue){
        captcha = false
    }else{
        captcha = true
    }
    return email && dni && captcha
}

export function validationStudentData(data:Isolicitud, checked:boolean, setValidation:React.Dispatch<React.SetStateAction<IstudentVal>>):boolean
{
    let nombres:boolean    
    let apellidos:boolean
    let celular:boolean
    let codigo: boolean

    if(data.nombres === ''){
        nombres = false
        setValidation((prevBasicVal)=>({...prevBasicVal, nombres:true}))
    }else{
        nombres = true
        setValidation((prevBasicVal)=>({...prevBasicVal, nombres:false}))
    }
    if(data.apellidos === ''){
        apellidos = false
        setValidation((prevBasicVal)=>({...prevBasicVal, apellidos:true}))
    }else{
        apellidos = true
        setValidation((prevBasicVal)=>({...prevBasicVal, apellidos:false}))
    }
    if(data.celular === '' || data.celular.length <11){
        celular = false
        setValidation((prevBasicVal)=>({...prevBasicVal, celular:true}))
    }else{
        celular = true
        setValidation((prevBasicVal)=>({...prevBasicVal, celular:false}))
    }
    if(checked){
        if(data.codigo === ''){
            codigo = false
            setValidation((prevBasicVal)=>({...prevBasicVal, codigo:true}))
        }
        else{
            codigo = true
            setValidation((prevBasicVal)=>({...prevBasicVal, codigo:false}))
        }
        return nombres && apellidos && celular && codigo
    }
    setValidation((prevBasicVal)=>({...prevBasicVal, codigo:false}))
    return nombres && apellidos && celular
}
export function validationFinData(data:Isolicitud, setValidation:React.Dispatch<React.SetStateAction<IfinVal>>):boolean
{
    let imagen:boolean
    let voucher:boolean
    let fecha:boolean
    
    //validacion de imagen del voucher
    const validarVoucherImagen = ():boolean => {
        if(data.voucher === uploadLogo){
            setValidation((pfv)=>({...pfv, imagen:true}))
            return false
        }else{
            setValidation((pfv)=>({...pfv, imagen:false}))
            return true
        }
    }
    //validación del número de voucher
    const validarVoucherNumero = ():boolean => {
        if(data.numero_voucher === '' || (data.numero_voucher as string).length < 15){
            setValidation((pfv)=>({...pfv, voucher:true}))
            return false
          }
          else{
            setValidation((pfv)=>({...pfv, voucher:false}))
            return true
          }
    }
    //validación de la fecha del voucher
    const validarVoucherFecha = ():boolean =>{
        if(data.fecha_pago === ''){
            setValidation((pfv)=>({...pfv, fecha:true}))
            return false
          }
          else{
            if(new Date() < new Date(data.fecha_pago as string)){
                setValidation((pfv)=>({...pfv, fecha:true}))
                return false
            }
            else{
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