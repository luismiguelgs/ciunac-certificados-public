import React from "react";
import { Icertificado, Icurso, Ifacultad, Itexto } from "../interfaces/Types";

type ContextValue = {
    certificados:Icertificado[],
    setCertificados: React.Dispatch<React.SetStateAction<Icertificado[]>>,
    textos: Itexto[],
    setTextos: React.Dispatch<React.SetStateAction<Itexto[]>>,
    facultades: Ifacultad[],
    setFacultades: React.Dispatch<React.SetStateAction<Ifacultad[]>>,
    cursos: Icurso[],
    setCursos: React.Dispatch<React.SetStateAction<Icurso[]>>,
    openManual: boolean,
    setOpenManual: React.Dispatch<React.SetStateAction<boolean>>,
    //handleClick(i:string): void,
}

const StateContext = React.createContext<ContextValue | undefined>(undefined)

export const ContextProvider = ({children}:React.PropsWithChildren<{}>) => {
    const [certificados, setCertificados] = React.useState<Icertificado[]>([]);
    const [textos, setTextos] = React.useState<Itexto[]>([])
    const [facultades, setFacultades] = React.useState<Ifacultad[]>([])
    const [cursos, setCursos] = React.useState<Icurso[]>([])
    const [openManual, setOpenManual] = React.useState<boolean>(true);
    
    /*
    const handleClick = (clicked:string) => {
        setIsClicked({...initialState, [clicked]: true})
    }
    */
    const contextValue: ContextValue = {
        //handleClick,
        certificados,
        setCertificados,
        textos,
        setTextos,
        facultades,
        setFacultades,
        cursos,
        setCursos,
        openManual,
        setOpenManual
    }

    return(
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ():ContextValue => {
    const context = React.useContext(StateContext)

    if(!context){
        throw new Error("useStateContext muy be uded within a ContextProvidewr")
    }
    return context;
}