import { Typography } from "@mui/material";
import { calculetePercentage } from "./calculatePercentage"

import PaymentsIcon from '@mui/icons-material/Payments';
import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WarningIcon from '@mui/icons-material/Warning';

export const showPercentage = (showValue: boolean, paymentMethod: string, value: number): string | JSX.Element => {
  if (showValue) {
    return paymentMethod === 'CARD' ?
      `${calculetePercentage(value)}` :
      `${value.toFixed(2)}`
  }
  switch (paymentMethod) {
    case "CASH":
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PaymentsIcon sx={{ marginRight: '5px' }} color="success" />
        <Typography sx={{ fontSize: 12 }} >Espécie</Typography>
      </div>
    case "CARD":
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CreditCardIcon sx={{ marginRight: '5px' }} color="success" />
        <Typography sx={{ fontSize: 12 }} >Cartão</Typography>
      </div>
    case "PIX":
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PixIcon sx={{ marginRight: '5px' }} color="success" />
        <Typography sx={{ fontSize: 12 }} >Pix</Typography>
      </div>
    default:
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <WarningIcon sx={{ marginRight: '5px' }} color="warning" />
        <Typography sx={{ fontSize: 12 }} >Não definida</Typography>
      </div>
  }
}
