import { 
    Box, MenuItem, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Alert,
    IconButton, Snackbar
} from "@mui/material"
import React from "react"
import { MES }  from '../Constantes'
import { useMask } from '@react-input/mask';
import {Irow, IformData} from "../interfaces/Irow";
import DeleteIcon from "@mui/icons-material/Delete"
import { IstudentData } from "../interfaces/IstudentData";
import { CICLOS } from "../Constantes";

type Props = {
    data: IstudentData,
    rows: Irow[],
    setRows: React.Dispatch<React.SetStateAction<Irow[]>>
    open:boolean,
    handleClose():void
}

export default function Before2010({ data, rows, setRows, open, handleClose }:Props)
{   
    //variables de prueba
    let idioma = data.idioma
    let nivel = data.nivel

    let niveles: string[] = []
    let annos: string[] = []

    const agregarRows = (row:Irow):void =>{
        setRows([...rows,row])
    }
    const eliminarRows = (id:number):void =>{
        setRows(rows.filter(r=>r.id !== id))
    }

    const poblarAnnos = () =>{
        for (let index = 2000; index < 2010; index++) {
           annos.push(index.toString())
        }
    }

    const poblarArreglo = (ciclos:number):void =>{
        for (let index = 1; index <= ciclos; index++) {
            niveles.push(nivel + ' ' + index)                
        }
    }

    const agregarCiclo = ():void =>{
        setIndex(new Date().getTime())
        let row:Irow = {
            id:index,
            ciclo:formData.ciclo,
            anno:formData.anno,
            mes:formData.mes,
            profesor:formData.profesor
        }
        agregarRows(row)
        setFormData((prevFormData)=>({...prevFormData, profesor:''}))
    }
    const eliminarCiclo = (id:number):void =>{
        eliminarRows(id)
    }
    const establecerNivelesIngles = (nivel:string):void =>{
        if(nivel === 'BASICO'){
            poblarArreglo(CICLOS.INGLES_BASICO)
        }else if(nivel == 'INTERMEDIO'){
            poblarArreglo(CICLOS.INGLES_INTERMEDIO)
        }else{
            poblarArreglo(CICLOS.INGLES_AVANZADO)
        }
    }
    const establecerNivelesPortuguez = (nivel:string):void =>{
        if(nivel === 'BASICO'){
            poblarArreglo(CICLOS.PORTUGUEZ_BASICO)
        }else if(nivel == 'INTERMEDIO'){
            poblarArreglo(CICLOS.PORTUGUEZ_INTERMEDIO)
        }else{
            poblarArreglo(CICLOS.PORTUGUEZ_AVANZADO)
        }
    }
    const establecerNivelesItaliano = (nivel:string):void =>{
        if(nivel === 'BASICO'){
            poblarArreglo(CICLOS.ITALIANO_BASICO)
        }else if(nivel == 'INTERMEDIO'){
            poblarArreglo(CICLOS.ITALIANO_INTERMEDIO)
        }else{
            poblarArreglo(CICLOS.ITALIANO_AVANZADO)
        }
    }
    const establecerNivelesFrances = (nivel:string):void =>{
        if(nivel === 'BASICO'){
            poblarArreglo(CICLOS.FRANCES_BASICO)
        }else if(nivel == 'INTERMEDIO'){
            poblarArreglo(CICLOS.FRANCES_INTERMEDIO)
        }else{
            poblarArreglo(CICLOS.FRANCES_AVANZADO)
        }
    }

    switch (idioma) {
        case 'PORTUGUEZ':
            establecerNivelesPortuguez(nivel)
            break;
        case 'ITALIANO':
            establecerNivelesItaliano(nivel)
            break;
        case 'FRANCES':
            establecerNivelesFrances(nivel)
            break;    
        default:
            establecerNivelesIngles(nivel)
            break;
    }
    poblarAnnos()

    const [formData, setFormData] = React.useState<IformData>({
        ciclo:niveles[0],
        mes:'ENERO',
        anno:'2009',
        profesor:''
    })
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setFormData((prevFormData)=>({...prevFormData, [name]:value}))
    }
    const profesorRef = useMask({ mask: '______________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } });

    const [index,setIndex] = React.useState<number>(0)

    return(
        <Box sx={{m:1}}>
            <Alert sx={{m:1}} severity="warning">
                En caso tenga una matrícula antes del año 2009 hacia atrás, deberá ingresar los datos requeridos,
                del ciclo que cursó, el mes, año; de ser posible el profesor.     
            </Alert>
            <TextField
                select
                sx={{m:1}}
                name='ciclo'
                label="Ciclo"
                value={formData.ciclo}
                onChange={e=>handleChange(e)}
                helperText="Seleccionar ciclo"
            >
                {
                    niveles.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))
                }
            </TextField>
            <TextField
                select
                sx={{m:1}}
                name="mes"
                label="Mes"
                value={formData.mes}
                onChange={e=>handleChange(e)}
                helperText="Seleccionar mes"
            >
                {
                    MES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </TextField>
            <TextField
                select
                sx={{m:1}}
                name="anno"
                label="Año"
                value={formData.anno}
                onChange={e=>handleChange(e)}
                helperText="Seleccionar año"
            >
                {
                    annos.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))
                }
            </TextField>
            <TextField
                inputRef={profesorRef}
                sx={{m:1}}
                name="profesor"
                label="Nombre Profesor"
                value={formData.profesor}
                onChange={e=>handleChange(e)}
            />
            <Button sx={{m:1}} variant="contained" size="large" onClick={()=>agregarCiclo()} disabled={rows.length>8}>
                Agregar
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{minWidth:450}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>CICLO</TableCell>
                            <TableCell>MES</TableCell>
                            <TableCell>AÑO</TableCell>
                            <TableCell>PROFESOR</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row)=>(
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.ciclo}</TableCell>
                                    <TableCell align="right">{row.mes}</TableCell>
                                    <TableCell align="right">{row.anno}</TableCell>
                                    <TableCell align="right">{row.profesor}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" color="primary" onClick={()=>eliminarCiclo(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Alert sx={{m:1}} severity="info">
                En caso usted no tenga una matrícula antes del año 2010 puede omitir este paso.
            </Alert>
            <Snackbar open={ open } autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Ingresar los datos solicitados de ciclo, mes, año 
                </Alert>
            </Snackbar>
        </Box>
    )
}