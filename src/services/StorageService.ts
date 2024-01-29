import React from 'react';
import {storage } from '../services/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default class StorageService
{

    public static uploadTrabajador(name:string, data:Blob, setEnviar:React.Dispatch<React.SetStateAction<boolean>>, 
      setProgress:React.Dispatch<React.SetStateAction<number>>, setConstancia:React.Dispatch<React.SetStateAction<string>>)
    {
        const storageRef = ref(storage, `trabajadores/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, data);
        uploadTask.on('state_changed', (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setEnviar(true)
            setProgress(progress)
          },(error)=>{
            console.log(error.message);
          },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                setConstancia(downloadUrl)
                console.log('Archivo disponible en... ', downloadUrl);
            });
          });
    }
    public static uploadVoucher(name:string, data:Blob,setEnviar:React.Dispatch<React.SetStateAction<boolean>>,
      setProgress:React.Dispatch<React.SetStateAction<number>>,handleChangeImg:any)
    {
      const storageRef = ref(storage, `vouchers/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, data);
        uploadTask.on('state_changed', (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log('Upload is ' + progress + '% done');
            setEnviar(true)
            setProgress(progress)
          },(error)=>{
            console.log(error.message);
          },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                handleChangeImg(downloadUrl)
                console.log('Archivo disponible en... ', downloadUrl);
            });
          });
    }
}