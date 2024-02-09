import React from 'react'
import { MyPopover, MySwitch } from './MUI';
import { Box } from '@mui/material';

type Props = {
    mensaje: string,
    checked: boolean,
    label: string,
    name: string,
    handleChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined 
    fullWidth?: boolean
}

export default function SwitchResaltado({mensaje,checked, label, name, handleChange, fullWidth=false}:Props) 
{
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const backColor = '#b3e5fc'
    const borderColor = '#03a9f4'

    const sx = fullWidth ? 
        {flex: '1 1 auto', backgroundColor: backColor, borderRadius: '8px', padding: '16px', m:1, border: `2px solid ${borderColor}`} :
        { backgroundColor: backColor, borderRadius: '8px', padding: '16px', m:1, border: `2px solid ${borderColor}`}

    return (
        <React.Fragment>
            <MyPopover 
                mensaje={mensaje} 
                anchor={anchorEl} 
                setAnchor={setAnchorEl} />
            <Box 
                sx={sx} 
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={()=>setAnchorEl(null)}>
                    <MySwitch 
                        checked={checked}
                        label={label}
                        name={name}
                        handleChange={handleChange}
                    />
                    </Box>
        </React.Fragment>
    )
}
