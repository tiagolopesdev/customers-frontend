import { enviroments } from "../../../../../../config/enviroments"
import { IPayments } from "../../../../../../Types/IPayments"

import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Box, SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";


export default function GroupTypePayments({
  setPayment,
  payment
}: {
  setPayment: React.Dispatch<React.SetStateAction<IPayments>>,
  payment: IPayments
}) {

  const containerStyleDinamic = (condition: boolean): SxProps<Theme> => {
    return {
      border: `solid 2px ${condition ? '#1081F2' : '#E2E4E9'}`,
      backgroundColor: `${condition ? '#DBE8F6' : '#EFF0F3'}`,
      height: '85px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
    }
  }
  const labelStyleDinamic = (condition: boolean): CSSProperties => {
    return {
      color: `${condition ? '#1081F2' : '#6a6d76'}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  return <Box
    style={{
      display: 'flex',
      flexDirection: 'row',
      marginTop: '10px',
      justifyContent: "space-between",
      gap: '15px'
    }}
  >
    <Box
      onClick={() => { setPayment({ ...payment, paymentMethod: 'PIX' }) }}
      sx={containerStyleDinamic(payment.paymentMethod === 'PIX')}
    >
      <label style={labelStyleDinamic(payment.paymentMethod === 'PIX')}>
        Pix <PixIcon />
      </label>
    </Box>
    <Box
      onClick={() => { setPayment({ ...payment, paymentMethod: 'CARD' }) }}
      sx={containerStyleDinamic(payment.paymentMethod === 'CARD')}
    >
      <label style={labelStyleDinamic(payment.paymentMethod === 'CARD')}>
        Cartão <CreditCardIcon />
        {`Taxa: ${enviroments.PERCENTAGE_CARD}`}
      </label>
    </Box>
    <Box
      onClick={() => { setPayment({ ...payment, paymentMethod: 'CASH' }) }}
      sx={containerStyleDinamic(payment.paymentMethod === 'CASH')}
    >
      <label style={labelStyleDinamic(payment.paymentMethod === 'CASH')}>
        Espécie <PaymentsIcon />
      </label>
    </Box>
  </Box>
}
