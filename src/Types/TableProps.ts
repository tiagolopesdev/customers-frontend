import { SxProps, Theme } from "@mui/material"

export interface ITableCellProps {
  name: string
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify'
}

export interface ITableItensRowProps {
  name: string
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify',
  actions?: JSX.Element,
  style?: SxProps<Theme> | undefined
}

export interface ITableRowProps {
  rows: ITableItensRowProps[]
}
