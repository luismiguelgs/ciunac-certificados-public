import React from "react";
import { Icertificado, Icurso, Ifacultad, Itexto } from "../interfaces/Types";
import { firestore } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default class TypesService
{
    private static certificadosDB = collection(firestore, 'certificados');
    private static textosDB = collection(firestore, 'textos');
    private static facultadesDB = collection(firestore, 'facultades');
    private static cursosDB = collection(firestore, 'cursos');

    public static async fetchCertificados(setData:React.Dispatch<React.SetStateAction<Icertificado[]>>){
        const data = await getDocs(this.certificadosDB);
        setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id} as Icertificado
        }));
    }
    public static async fetchTextos(setData:React.Dispatch<React.SetStateAction<Itexto[]>>){
        const data = await getDocs(this.textosDB);
        setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id} as Itexto
        }));
    }
    public static async fetchFacultades(setData:React.Dispatch<React.SetStateAction<Ifacultad[]>>){
        const data = await getDocs(this.facultadesDB);
        setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id} as Ifacultad
        }));
    }
    public static async fetchCursos(setData:React.Dispatch<React.SetStateAction<Icurso[]>>){
        const data = await getDocs(this.cursosDB);
        setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id} as Icurso
        }));
    }

}