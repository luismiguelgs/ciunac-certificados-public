import { Box, Popover, Typography } from '@mui/material'
import React from 'react'
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

type Props = {
    mensaje: string,
    setAnchor:React.Dispatch<React.SetStateAction<HTMLElement | null>>
    anchor: HTMLElement | null
}

export default function MyPopover({mensaje, setAnchor, anchor}:Props) 
{
    const handlePopoverClose = () => {
        setAnchor(null);
    };

    const open = Boolean(anchor);

    return (
        <React.Fragment>
            <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none', m: 1 }}
                open={open}
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus>
                <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', p: 2, borderRadius: '8px' }}>
                    <ToggleOnIcon />
                    <Typography>{mensaje}</Typography>
                    <ReportProblemIcon />
                </Box>
            </Popover>
        </React.Fragment>
  )
}
