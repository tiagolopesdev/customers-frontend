import { Typography } from "@mui/material"

import PaidIcon from '@mui/icons-material/Paid';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';


interface IValues {
  amountPaid: number
  amountToPay: number
}

export const Values = ({ amountPaid, amountToPay }: IValues) => {

  return <div
    style={{
      display: 'flex',
      flexDirection: "row",
      paddingTop: 5
    }}
  >
    <Typography
      style={{
        marginRight: '10px',
        color: '#64BC6D',
        fontWeight: 550,
        display: 'flex',
      }}
    >
      <PriceCheckIcon sx={{ marginRight: '10px' }} />
      <Typography style={{ fontWeight: 700 }} fontSize={18}>{amountPaid.toFixed(2)}</Typography>
    </Typography>
    <Typography
      style={{
        color: '#B03333',
        fontWeight: 550,
        display: 'flex',
      }}
    >
      <PaidIcon sx={{ marginRight: '10px' }} />
      <Typography style={{ fontWeight: 700 }} fontSize={18}>{amountToPay.toFixed(2)}</Typography>
    </Typography>
  </div>
}
