//import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer,TableHead,TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export interface IColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right';
  format?: (value: number) => string;
}

type Props = {
    rows:any[],
    columns:IColumn[],
    handleDelete?:(id: number | undefined)=>void,
    handleEdit?:(id:number | undefined)=>void,
    action?:boolean,
    edit?: boolean,
    del?: boolean
}

export default function TableSimple({rows, columns, handleDelete, handleEdit, action=false, edit=false, del=false}:Props) {
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {action && <TableCell align='left'>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    {
                      action && (
                        <TableCell>
                          {
                            edit &&
                            <IconButton aria-label="edit" color='secondary' onClick={()=> handleEdit?.(row.id)}>
                              <EditIcon />
                           </IconButton>
                          }
                          {
                            del &&
                            <IconButton aria-label="delete" color='error' onClick={()=> handleDelete?.(row.id)}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        </TableCell>
                      )
                    }
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}