/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Box, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material"
import { CurrencyInput } from "react-currency-mask";
import { IPayments } from "../../../../../Types/IPayments";
import { useState } from "react";
import { IMessageFeedback } from "../../../../../Types/IMessageFeedback";
import { showPercentage } from "../../../../../Utils/percentage/showPercentage";

import ModalBase from "../../../../../Components/Modals";
import ButtonsModals from "../../../../../Components/ButtonsModals";
import GroupTypePayments from "./GroupTypePayments";

interface PaymentsModalProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  paymentProps: IPayments
  setPaymentProps: React.Dispatch<React.SetStateAction<IPayments>>
}

export const PaymentsModal = ({ open, setOpen, paymentProps, setPaymentProps }: PaymentsModalProps) => {

  const handleModalState = () => setOpen(!open)

  const [openFeedback, setOpenFeedback] = useState(false);
  const [payment, setPayment] = useState<IPayments>(paymentProps)
  const [message, setMessage] = useState<IMessageFeedback>({
    message: '',
    type: "success"
  })

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFeedback(false);
  };

  return <ModalBase open={open}>
    <Box>
      <Typography
        style={{
          color: '#212121',
          fontWeight: 'bold',
          fontSize: '14pt',
        }}
      >Registrar Pagamento</Typography>
      <Typography
        style={{
          fontSize: '10pt',
          color: '#6C757D'
        }}
      >Informe o valor e forma de pagamento</Typography>
    </Box>
    <Box>
      <CurrencyInput
        onChangeValue={(
          _event: React.ChangeEvent<HTMLInputElement>,
          originalValue: string | number,
          _maskedValue: string | number
        ) => {

          const user = JSON.parse(localStorage.getItem('user') as string)

          setPayment({
            ...payment, ...{
              value: originalValue as number,
              updatedBy: user.email
            }
          })
        }}
        InputElement={
          <TextField
            label="Valor unitário (R$)"
            fullWidth
          />
        }
      />
      {
        payment.paymentMethod === 'CARD' ?
          <Typography
            sx={{ 
              color: '#6a6d76', 
              fontSize: 14, 
              marginBottom: '12px',
              marginLeft: '5px',
            }}
          >{`Com juros: ${showPercentage(true, payment.paymentMethod, payment.value)}`}</Typography> :
          ''
      }
      <Box
        sx={{
          marginTop: '20px',
        }}
      >
        <GroupTypePayments        
          payment={payment}
          setPayment={setPayment}
        />
      </Box>
    </Box>
    <ButtonsModals
      onClickBack={() => { handleModalState() }}
      disableConfirm={payment.value === 0}
      onClickConfirm={async () => {

        if (payment.paymentMethod === undefined) {
          setMessage({
            message: "Selecione o método de pagamento",
            type: "warning"
          })
          setOpenFeedback(true);
          return
        }

        const amountToPayStoraged = Number(localStorage.getItem('amountToPay') as string)

        if (payment.value <= amountToPayStoraged) {
          setPaymentProps(payment)
          setOpen(false)
        } else {
          setMessage({
            message: "Valor maior que saldo a pagar",
            type: "warning"
          })
          setOpenFeedback(true);
        }
      }}
    />
    <Snackbar
      open={openFeedback}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Alert
        onClose={handleClose}
        severity={message.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message.message}
      </Alert>
    </Snackbar>
  </ModalBase>
}
