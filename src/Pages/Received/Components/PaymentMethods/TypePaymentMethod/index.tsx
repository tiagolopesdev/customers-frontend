import { Box, Typography } from "@mui/material"

import { ICustomer } from "../../../../../Types/ICustomer";
import { useContext } from "react";
import { PaymentMethodType } from "../../../../../Types/IPayments";
import { MinimarketContext } from "../../../../../Context/minimarket";
import { showPrice } from "../../../../../Utils/showPrice";
import { PaymentMethodsType } from "../../../style";
import IconTypePayment from "../../IconTypePayment";

type InfoPaymentType = {
  value: number,
  quantity: number
}

export default function TypePaymentMethod({
  customers,
  paymentMethod
}: {
  customers: ICustomer[]
  paymentMethod: PaymentMethodType
}) {

  const { user } = useContext(MinimarketContext)

  const sumPaymentMethod = () => {
    const infoPayment: InfoPaymentType = {
      quantity: 0,
      value: 0
    }
    customers.forEach((customer) => {

      const itens = customer.payments?.filter((filter) => {
        return filter.paymentMethod === paymentMethod && filter.updatedBy === user.email
      }) || []

      infoPayment.quantity = itens.length

      const sumValue = itens.reduce((accumulator, item) => {
        return accumulator += item.value
      }, 0)

      infoPayment.value += sumValue ?? 0
    })
    return infoPayment
  }

  const infoPayment = sumPaymentMethod()

  const showPaymentMethodIcon = {
    CARD: "Cartão",
    PIX: "Pix",
    CASH: "Espécie"
  }

  return <Box sx={PaymentMethodsType}>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <IconTypePayment paymentMethod={paymentMethod} />
      <Typography
        sx={{
          fontWeight: 600
        }}
        color="textSecondary"
        fontSize={12}
      >{`${infoPayment?.quantity}x`}</Typography>
    </Box>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }}
    >
      <Typography
        sx={{
          fontWeight: 600
        }}
        color="textSecondary"
        fontSize={13}
      >{showPaymentMethodIcon[paymentMethod]}</Typography>
      <Typography
        fontWeight={600}
        color="textPrimary"
        fontSize="15px"
      >{showPrice(infoPayment.value)}</Typography>
    </Box>
  </Box>
}
