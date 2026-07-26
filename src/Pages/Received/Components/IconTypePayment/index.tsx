
import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import { PaymentMethodType } from '../../../../Types/IPayments';
import { Box, SxProps, Theme } from '@mui/material';

export default function IconTypePayment({
  paymentMethod,
  style
}: {
  paymentMethod: PaymentMethodType
  style?: SxProps<Theme> | undefined
}) {

  const showPaymentMethodIcon = {
    CARD: {
      element: <CreditCardIcon sx={{ color: "#218AF3" }} />,
      backgroundColor: "#E6F2FD",
    },
    PIX: {
      element: <PixIcon sx={{ color: "#57B786" }} />,
      backgroundColor: "#E9F5EF",
    },
    CASH: {
      element: <PaymentsIcon sx={{ color: "#E29337" }} />,
      backgroundColor: "#FEF5E6",
    }
  }

  return <Box
    sx={{
      ...style,
      width: "28px",
      height: "28px",
      borderRadius: "10px",
      backgroundColor: showPaymentMethodIcon[paymentMethod].backgroundColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {showPaymentMethodIcon[paymentMethod].element}
  </Box>
}
