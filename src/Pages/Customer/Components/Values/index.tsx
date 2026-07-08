import CallReceivedIcon from '@mui/icons-material/CallReceived';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, SxProps, Theme, Typography } from "@mui/material";


interface ValuesProps {
  amountPaid: number
  amountToPay: number
}

const wrapperStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: '5px',
  width: '100%',
}

const containerInfoStyle: SxProps<Theme> = {
  backgroundColor: '#FFFFFF',
  width: '100%',
  height: '30px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '10px',
  marginTop: '5px',
  gap: '7px'
}

const iconInfoStyle: SxProps<Theme> = {
  fontSize: '14pt',
  padding: '5px',
  borderRadius: '15px',
}

const groupInfoStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
}

const typeInfoStyle: SxProps<Theme> = {
  fontWeight: 500,
  fontSize: 12,
  color: '#4f535f',
  margin: '0px 0px 2px 0px'
}

const valueInfoStyle: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: 15,
  margin: '0px 0px 5px 0px',
  lineHeight: '0.8'
}

export const Values = ({ amountPaid, amountToPay }: ValuesProps) => {

  return <Box sx={wrapperStyle}>
    <Box sx={containerInfoStyle}>
      <CallReceivedIcon sx={{ ...iconInfoStyle, backgroundColor: '#DFF1E8', color: '#2A9C63' }} />
      <Box sx={groupInfoStyle}>
        <Typography sx={typeInfoStyle}>Recebido</Typography>
        <Typography sx={{ ...valueInfoStyle, color: '#2A9C63' }}>{`R$ ${amountPaid.toFixed(2)}`}</Typography>
      </Box>
    </Box>
    <Box sx={containerInfoStyle}>
      <AttachMoneyIcon sx={{ ...iconInfoStyle, backgroundColor: '#FBEBEB', color: '#DF3A3A' }} />
      <Box sx={groupInfoStyle}>
        <Typography sx={typeInfoStyle}>Pendente</Typography>
        <Typography sx={{ ...valueInfoStyle, color: '#DF3A3A' }}>{`R$ ${amountToPay.toFixed(2)}`}</Typography>
      </Box>
    </Box>
  </Box>
}
