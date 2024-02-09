import React from 'react'
import { TransitionProps } from '@mui/material/transitions';
import { AppBar, IconButton, Slide, Toolbar, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  type: 'SIMPLE' | 'ALERT' | 'FORM' | 'FULL'
  title: string,
  content: React.ReactNode,
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
  actionFunc?():void
}

export default function MyDialog({type, title, content, open, setOpen, actionFunc}:Props) 
{
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen={type === 'FULL' ? true : false}
            TransitionComponent={type === 'FULL' ? Transition : undefined}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            {
                type === 'FULL' ? (
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {title}
                            </Typography>
                            <Button autoFocus color="inherit" onClick={actionFunc}>
                                Guardar
                            </Button>
                        </Toolbar>
                    </AppBar>
                ):(
                    <DialogTitle id="alert-dialog-title">
                        {title}
                    </DialogTitle>
                )
            }
            {
                type === 'FULL' ? (
                    content
                ):(
                    <DialogContent>
                    {
                        type === 'ALERT' || type === 'SIMPLE' ? (
                            <DialogContentText id='alert-dialog-description'>
                                {content}
                            </DialogContentText>
                        ) :
                        type === 'FORM' && content
                    }
                    </DialogContent>
                )
            }
            {
                type === 'FORM' || type === 'ALERT' ? (
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose} color='secondary'>Cancelar</Button>
                        <Button variant="outlined" onClick={actionFunc} autoFocus color="primary">Aceptar</Button>
                    </DialogActions>
                ):(
                    type === 'SIMPLE' && (
                        <DialogActions>
                            <Button variant="outlined" onClick={handleClose} autoFocus>Aceptar</Button>
                        </DialogActions>
                    ) 
                )
            }
        </Dialog>
    )
}
