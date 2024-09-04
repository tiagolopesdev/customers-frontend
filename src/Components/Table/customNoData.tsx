import { TableRow, TableCell } from "@mui/material"


interface ICustomNoDataTable {
  lenghtCell: number
}

export const CustomNoDataTable = ({ lenghtCell }: ICustomNoDataTable) => {
  return (
    <TableRow sx={{ padding: 0 }}>
      <TableCell align="center" colSpan={lenghtCell} sx={{ padding: 0 }}>
        <p>Sem dados para exibir.</p>
      </TableCell>
    </TableRow>
  )
} 
