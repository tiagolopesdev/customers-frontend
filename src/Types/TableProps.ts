import { SxProps, Theme } from "@mui/material"

export interface ITableCellProps {
  name: string
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  style?: SxProps<Theme> | undefined
}

export interface ITableItensRowProps {
  name: string | JSX.Element
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify',
  actions?: JSX.Element,
  style?: SxProps<Theme> | undefined
  useTooltip?: boolean
}

export interface ITableRowProps {
  rows: ITableItensRowProps[]
}
