import { styled } from '@mui/material/styles';

export const NIVEL = [
    {value:'BASICO',label:'BÁSICO'},
    {value:'INTERMEDIO',label:'INTERMEDIO'},
    {value:'AVANZADO',label:'AVANZADO'},
]
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const MES = [
    {value:'ENERO',label:'Enero'},
    {value:'FEBRERO',label:'Febrero'},
    {value:'MARZO',label:'Marzo'},
    {value:'ABRIL',label:'Abril'},
    {value:'MAYO',label:'Mayo'},
    {value:'JUNIO',label:'Junio'},
    {value:'JULIO',label:'Julio'},
    {value:'AGOSTO',label:'Agosto'},
    {value:'SETIEMBRE',label:'Setiembre'},
    {value:'OCTUBRE',label:'Octubre'},
    {value:'NOVIEMBRE',label:'Noviembre'},
    {value:'DICIEMBRE',label:'Diciembre'},
]

type CicloTupla = [string, string, number];

export const CICLOS: CicloTupla[] = [
    ['INGLES', NIVEL[0].value, 9],
    ['INGLES', NIVEL[1].value, 9],
    ['INGLES', NIVEL[2].value, 9],
    ['PORTUGUEZ', NIVEL[0].value, 5],
    ['PORTUGUEZ', NIVEL[1].value, 4],
    ['PORTUGUEZ', NIVEL[2].value, 3],
    ['ITALIANO', NIVEL[0].value, 5],
    ['ITALIANO', NIVEL[1].value, 4],
    ['ITALIANO', NIVEL[2].value, 3],
    ['FRANCES', NIVEL[0].value, 5],
    ['FRANCES', NIVEL[1].value, 4],
    ['FRANCES', NIVEL[2].value, 3],
]