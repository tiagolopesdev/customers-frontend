import { Box, Typography } from "@mui/material";
import { PaymentMethodsContainer, PaymentMethodsType } from "../../style";
import { ICustomer } from "../../../../Types/ICustomer";
import { useContext } from "react";
import { MinimarketContext } from "../../../../Context/minimarket";
import { enviroments } from "../../../../config/enviroments";


export default function PaymentMethods({
  customers
}: {
  customers: ICustomer[]
}) {

  const { user } = useContext(MinimarketContext)

  const showSumPaymentMethod = (paymentMethodFilter: string) => {
    let pixMethodSum = 0
    customers.forEach((customer) => {
      const sumValue = customer.payments?.filter((filter) => {
        return filter.paymentMethod === paymentMethodFilter && filter.updatedBy === user.email
      }).reduce((accumulator, item) => {
        return accumulator += item.value
      }, 0)
      pixMethodSum += sumValue ?? 0
    })
    return pixMethodSum
  }

  return <Box sx={PaymentMethodsContainer}>
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        padding: "10px 8px",
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'center',
        width: "100%",
        borderRadius: '5px',
      }}
    >
      <Box sx={PaymentMethodsType}>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Pix</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {showSumPaymentMethod('PIX').toFixed(2)}
        </Typography>
      </Box>
      <Box sx={PaymentMethodsType}>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Cartão</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {
            `${showSumPaymentMethod('CARD')} (${(showSumPaymentMethod('CARD') + (showSumPaymentMethod('CARD') * (Number(enviroments.PERCENTAGE_CARD) / 100))).toFixed(2)})`
          }
        </Typography>
      </Box>
      <Box sx={PaymentMethodsType}>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Espécie</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {showSumPaymentMethod('CASH').toFixed(2)}
        </Typography>
      </Box>
    </Box>
  </Box>
}
