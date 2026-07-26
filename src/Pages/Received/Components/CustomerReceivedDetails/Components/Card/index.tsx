import { Box, Typography } from "@mui/material";
import { IPayments, PaymentMethodType } from "../../../../../../Types/IPayments";

import { showPercentage } from "../../../../../../Utils/percentage/showPercentage";
import formatDate from "../../../../../../Utils/formatDate";
import IconTypePayment from "../../../IconTypePayment";


export default function CustomerReceivedDetailsCard({
  buy
}: {
  buy: IPayments
}) {

  const typePaymentLabel = {
    PIX: "Pix",
    CARD: "Cartão",
    CASH: "Espécie"
  }

  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: "8px 0px",
      backgroundColor: '#F6F6F8',
      padding: '10px',
      borderRadius: '10px',
      gap: "15px"
    }}
    key={`${buy.id}-${buy.dateCreated}-${buy.paymentMethod}`}
  >
    <IconTypePayment
      paymentMethod={buy.paymentMethod as PaymentMethodType}
    />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <Typography sx={{
        fontSize: 18,
        fontWeight: 550
      }}
        color="textPrimary"
      >
        {`R$ ${showPercentage(true, buy.paymentMethod as string, buy.value)}`}
      </Typography>
      <Typography sx={{
        fontSize: "13px",
        fontWeight: 600
      }}
        color="textSecondary"
      >
        {`${typePaymentLabel[buy.paymentMethod as PaymentMethodType]} - ${formatDate(buy.dateCreated as string)}`}
      </Typography>
      <Typography sx={{
        fontSize: "12px",
        fontWeight: 400
      }}
        color="textSecondary"
      >
        {buy.updatedBy}
      </Typography>
    </Box>

  </Box>
}
