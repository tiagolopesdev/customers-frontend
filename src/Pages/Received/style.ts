import { SxProps, Theme } from "@mui/material";
import { fullSize } from "../../Utils/sizesDevices";

export const SelectDateContainer: SxProps<Theme> = {
  width: '95vw',
  height: '75vh',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const PaymentMethodsType: SxProps<Theme> = {
  backgroundColor: '#FFFFFF',
  width: '100%',
  height: '100px',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  padding: "0px 10px",
  gap: "10px"
}

export const PaymentMethodsContainer: SxProps<Theme> = {
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  maxWidth: fullSize,
  padding: {
    xs: "0px 10px",
    sm: "0px 10px",
    md: "0px"
  },
  boxSizing: 'border-box',
  width: '100%'
}

export const FiltersContainer: SxProps<Theme> = {
  backgroundColor: '#ffffff',
  height: '14dvh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: "100%"
}

export const ReceivedContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100dvh',
}
