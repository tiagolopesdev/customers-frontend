import { SxProps, Theme } from "@mui/material"
import { CSSProperties } from "react"

export const containerStyleDinamic: SxProps<Theme> = {
  border: `solid 2px #E2E4E9`,
  backgroundColor: `#EFF0F3`,
  height: '9vh',
  width: '24vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  minHeight: '80px',
  flexDirection: "column"
}

export const labelStyleDinamic: CSSProperties = {
  color: `${'#6a6d76'}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: "13px"
}