import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, SxProps, Theme } from "@mui/material"
import { CustomNoDataTable } from "./customNoData"
import { ITableCellProps, ITableItensRowProps, ITableRowProps } from "../../Types/TableProps"

interface ITableProps {
  tableCell: ITableCellProps[]
  tableRows: ITableRowProps[],
  style?: SxProps<Theme> | undefined,
  width?: number
}

export const TableComponent = (props: ITableProps) => {

  return <TableContainer component={Paper} sx={{ maxHeight: 200, ...props.style }} >
    <Table stickyHeader sx={{ minWidth: props.width ?? 460 }} aria-label="simple table" >
      <TableHead>
        <TableRow>
          {
            props.tableCell.map((item: ITableCellProps) => {
              return <TableCell sx={{ padding: '5px', fontWeight: 600, fontSize: 'medium', ...item.style }} align={item.align}>{item.name}</TableCell>
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          props.tableRows.length === 0 ?
            <CustomNoDataTable lenghtCell={props.tableCell.length} /> :
            props.tableRows.map((item: ITableRowProps) => {
              return <TableRow key={`${Math.random()}-tableRow`}>
                {
                  item.rows.map((itenInsideRow: ITableItensRowProps, index: number) => {
                    return <TableCell key={`${itenInsideRow.name}-${index}-${itenInsideRow.name}`} align={itenInsideRow.align} sx={
                      { margin: 0, padding: '5px', fontSize: '0.8rem', ...itenInsideRow.style }
                    }>
                      {
                        index === (item.rows.length - 1) ?
                          itenInsideRow.actions :
                          itenInsideRow.name
                      }
                    </TableCell>
                  })
                }
              </TableRow>
            })
        }
      </TableBody>
    </Table>
  </TableContainer>
}
