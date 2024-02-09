import { Alert, Skeleton, Stack } from '@mui/material'
import React from 'react'
import SwitchResaltado from '../SwitchResaltado';

type Props = {
    texto:string | undefined,
    checked: boolean,
    label: string,
    name: string,
    mensaje: string
    handleChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined 
}

export default function Warning({texto,checked,label,name,handleChange,mensaje}:Props) 
{
    return (
        <React.Fragment>
            {
                texto ? (
                <div>
                    <Alert severity="warning"
                        aria-haspopup="true"
                    >
                        {texto}
                    </Alert>
                    <SwitchResaltado mensaje={mensaje} checked={checked} label={label} name={name} handleChange={handleChange} />
                </div>) :(
                    <Stack spacing={1}>
                        <Skeleton variant="text" width={'100%'} height={70} />
                        <Skeleton variant="rectangular" width={'100%'} height={50} />
                    </Stack>
                )
            }
        </React.Fragment>
    )
}
