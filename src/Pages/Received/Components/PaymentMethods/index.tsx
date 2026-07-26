import { Box } from "@mui/material";
import { PaymentMethodsContainer } from "../../style";
import { ICustomer } from "../../../../Types/ICustomer";

import TypePaymentMethod from "./TypePaymentMethod";


export default function PaymentMethods({
  customers
}: {
  customers: ICustomer[]
}) {

  return <Box sx={PaymentMethodsContainer}>
    <Box
      sx={{
        paddingTop: "10px",
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'center',
        width: "100%",
        borderRadius: '5px',
      }}
    >
      <TypePaymentMethod
        customers={customers}
        paymentMethod={'PIX'}
      />
      <TypePaymentMethod
        customers={customers}
        paymentMethod={'CARD'}
      />
      <TypePaymentMethod
        customers={customers}
        paymentMethod={'CASH'}
      />
    </Box>
  </Box>
}
