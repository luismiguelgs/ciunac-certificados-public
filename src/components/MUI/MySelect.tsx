import { MenuItem, TextField } from '@mui/material'
import React from 'react'

type Props = {
    disabled?:boolean,
    name:string,
    handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void,
    label:string,
    value:any
    helperText?: React.ReactNode,
    data:any[],
    error?:boolean,
    sx?:any,
    fullWidth?:boolean
}

export default function MySelect({disabled=false,name,handleChange,label, helperText='', data,value,error=false, sx={},fullWidth=true}:Props) {
  return (
    <React.Fragment>
        {
            data && 
            <TextField
                select
                disabled={disabled}
                fullWidth={fullWidth}
                onChange={e=>handleChange(e)}
                name={name}
                label={label}
                value={value}
                helperText={helperText}
                error={error}
                sx={sx}
            >
            {
                data.map((option)=>(
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))
            }
            </TextField>
        }   
    </React.Fragment>
  )
}
