import { Alert, Skeleton, Stack } from '@mui/material'
import React from 'react'
import MySwitch from '../MUI/MySwitch'

type Props = {
    texto:string | undefined,
    checked: boolean,
    label: string,
    name: string,
    handleChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined 
}

export default function Warning({texto,checked,label,name,handleChange}:Props) {
  return (
    <React.Fragment>
        {
            texto ? (
            <div>
                <Alert severity="warning">
                    {texto}
                </Alert>
                <MySwitch 
                    checked={checked}
                    label={label}
                    name={name}
                    handleChange={handleChange}
                />
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
