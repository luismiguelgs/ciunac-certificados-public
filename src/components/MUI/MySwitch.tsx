import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'

type Props = {
  label: string,
  name: string,
  checked : boolean,
  handleChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined
  disabled?: boolean
}

export default function MySwitch({name,label,checked,handleChange, disabled=false}:Props) 
{

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch 
            disabled={disabled}
            onChange={handleChange} 
            checked={checked} 
            name={name}
          />
        }
        label={label}
      />
    </React.Fragment>
  )
}
