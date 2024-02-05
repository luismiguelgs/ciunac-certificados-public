import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { MenuIcon } from '../../services/icons'

export type IconMenu = {
    label: string,
    badgeData?: number | 0,
    icon: React.ReactNode,
    handleClick():void
}

type Props = {
    title:string,
    menuIcon?:boolean
    icons?:IconMenu[] | null,
    handleClickMenu?():void
}

export default function MyAppBar({title, menuIcon=false, icons=null, handleClickMenu}:Props) 
{
    let titleSx:any
    menuIcon ? titleSx = { display: { xs: 'none', sm: 'block'}} : titleSx = { flexGrow: 1, display: { xs: 'none', sm: 'block'}}

    return (
        <React.Fragment>
            <AppBar position="static" style={{width:'100%',marginBottom:'12px'}}>
                <Toolbar>
                    {
                        menuIcon && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                                onClick={handleClickMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                        )
                    }
                    <Typography 
                        noWrap 
                        variant="h6" 
                        component="div" 
                        sx={ titleSx }
                    >
                        {title}
                    </Typography>
                    {
                        icons && (
                            <>
                                { menuIcon && (<Box sx={{ flexGrow: 1 }} />)}
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {
                                    icons?.map((icon)=>(
                                        <Tooltip title={icon.label} key={icon.label}>
                                            <IconButton size="large" aria-label={icon.label} color="inherit"  onClick={icon.handleClick}>
                                                <Badge badgeContent={icon.badgeData} color="error">
                                                    {icon.icon}
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                    ))
                                }
                                </Box>
                            </>
                        )
                    }  
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
