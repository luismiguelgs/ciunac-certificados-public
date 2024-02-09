import { Alert } from '@mui/material'
import React from 'react'
import { useStateContext } from '../../context/ContextProvider'

type Props = {
    textoFinal? : boolean
}

export default function Disclamer({textoFinal=false}:Props) 
{
    const { textos } = useStateContext()
    return (
        <React.Fragment>
            {
                textoFinal && (
                    <Alert sx={{mt:2}} severity="info">
                        {textos.find(objeto=> objeto.titulo === 'texto_1_final')?.texto}
                    </Alert>
                )
            }
            <Alert sx={{mt:2}} severity="warning" variant='filled'>
				{textos.find(objeto=> objeto.titulo === 'texto_1_disclamer')?.texto}
			</Alert>
			<Alert sx={{mt:2}} severity="warning" variant='filled'>
				{textos.find(objeto=> objeto.titulo === 'texto_2_disclamer')?.texto}
			</Alert>
        </React.Fragment>
    )
}
