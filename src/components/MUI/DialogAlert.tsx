import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  title:string,
  content:string | React.ReactNode,
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  actions?:boolean
  actionFunc?:()=>void
}

export default function DialogAlert({title,content, open, setOpen, actions=false,actionFunc}:Props) 
{
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {
              !actions ? 
              (<Button onClick={handleClose} autoFocus>Aceptar</Button>):
              (<>
                <Button color="warning" variant="contained" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button color="success" variant="contained" onClick={actionFunc}>
                    Aceptar
                </Button>
              </>) 
            }
          </DialogActions>
        </Dialog>
    </React.Fragment>
  )
}
