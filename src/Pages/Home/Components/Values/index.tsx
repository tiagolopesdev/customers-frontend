import { Typography } from "@mui/material"

import CallReceivedIcon from '@mui/icons-material/CallReceived';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


interface IValues {
  amountPaid: number
  amountToPay: number
}

export const Values = ({ amountPaid, amountToPay }: IValues) => {

  return <div
    style={{
      display: 'flex',
      flexDirection: "row",
      gap: '5px'
    }}
  >
    <Typography
      style={{
        marginRight: '10px',
        color: '#64BC6D',
        display: 'flex',
        alignItems: 'center'
      }}
      >
      <CallReceivedIcon sx={{ fontSize: '12pt' }} />
      <Typography style={{ fontWeight: 500 }} fontSize={14}>{amountPaid.toFixed(2)}</Typography>
    </Typography>
    <Typography
      style={{
        color: '#B03333',
        fontWeight: 550,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <AttachMoneyIcon sx={{ fontSize: '12pt'}} />
      <Typography style={{ fontWeight: 500 }} fontSize={14}>{amountToPay.toFixed(2)}</Typography>
    </Typography>
  </div>
}
