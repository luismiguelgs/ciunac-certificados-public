import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, Stack } from '@mui/material'
import React from 'react'
import { Pagina1, Pagina2, Pagina3, Pagina4, Pagina5 } from './Paginas'
import { useStateContext } from '../context/ContextProvider'

type PagProps = {
    pagina:number
}
function Pagina({pagina}:PagProps) {
    switch (pagina) {
        case 1:
            return (<Pagina1 />)
        case 2:
            return (<Pagina2 />)
        case 3:
            return (<Pagina3 />)
        case 4:
            return (<Pagina4 />)
        case 5:
            return (<Pagina5 />)
        default:
            break;
    }
}

export default function Manual() 
{
    const {openManual, setOpenManual} = useStateContext()
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event);
        setPage(value);
    };
    const handleClose = () => {
        setOpenManual(false);
      };
    return (
        <React.Fragment>
            <Dialog
                open={openManual}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Manual de uso
                </DialogTitle>
                <DialogContent >
                    <Stack spacing={2}>
                        <Pagina pagina={page} />
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Pagination count={5} page={page} onChange={handleChange} color="primary"/>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={handleClose}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
