import { Alert, Box, Popover, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import MySwitch from '../MUI/MySwitch'
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

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
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            {
                texto ? (
                <div>
                    <Alert severity="warning"
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                    >
                        {texto}
                    </Alert>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                        pointerEvents: 'none',
                        m: 1
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', p: 2, borderRadius: '8px' }}>
                            <ToggleOnIcon />
                            <Typography>{mensaje}</Typography>
                            <ReportProblemIcon />
                        </Box>
                    </Popover>
                    <Box 
                        sx={{ backgroundColor: '#F3F3FF', borderRadius: '8px', padding: '16px', m:1}} 
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        >
                        <MySwitch 
                                checked={checked}
                                label={label}
                                name={name}
                                handleChange={handleChange}
                        />
                    </Box>
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
