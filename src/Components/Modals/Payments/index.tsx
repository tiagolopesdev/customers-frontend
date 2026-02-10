/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material"
import { CurrencyInput } from "react-currency-mask";
import { IPayments } from "../../../Types/IPayments";
import { CSSProperties, useState } from "react";
import { IMessageFeedback } from "../../../Types/IMessageFeedback";
import { showPercentage } from "../../../Utils/percentage/showPercentage";
import { enviroments } from "../../../config/enviroments";

import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';

interface IPaymentsModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  paymentProps: IPayments
  setPaymentProps: React.Dispatch<React.SetStateAction<IPayments>>
}

export const PaymentsModal = ({ open, setOpen, paymentProps, setPaymentProps }: IPaymentsModal) => {

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

  const containerStyleDinamic = (condition: boolean): CSSProperties => {
    return {
      border: `solid 2px ${condition ? '#1081F2' : '#E2E4E9'}`,
      backgroundColor: `${condition ? '#DBE8F6' : '#EFF0F3'}`,
      margin: '0px 8px',
      height: '15vh',
      width: '22vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      minHeight: '80px'
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

  return <Dialog
    open={open}
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
    sx={{
      backgroundColor: '#6C757D',
      'MuiPaper-root': {
        borderRadius: '10px',
      }
    }}
  >
    <DialogTitle style={{ backgroundColor: '#F3F4F7' }}>
      <Typography
        style={{
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
    </DialogTitle>
      <DialogContent style={{ backgroundColor: '#F3F4F7', paddingBottom: '5px' }}>
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
          <TextField label="Valor unitário (R$)"
            style={{
              marginTop: '15px'
            }}
            fullWidth
          />
        }
      />
      {
        payment.paymentMethod === 'CARD' ?
          <Typography
            sx={{ color: '#000000', fontSize: 14, marginBottom: '12px' }}
          >{`Com juros: ${showPercentage(true, payment.paymentMethod, payment.value)}`}</Typography> :
          ''
      }
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '10px'
        }}
      >
        <div
          onClick={() => { setPayment({ ...payment, paymentMethod: 'PIX' }) }}
          style={containerStyleDinamic(payment.paymentMethod === 'PIX')}
        >
          <label style={labelStyleDinamic(payment.paymentMethod === 'PIX')}>
            Pix <PixIcon />
          </label>
        </div>
        <div
          onClick={() => { setPayment({ ...payment, paymentMethod: 'CARD' }) }}
          style={containerStyleDinamic(payment.paymentMethod === 'CARD')}
        >
          <label style={labelStyleDinamic(payment.paymentMethod === 'CARD')}>
            Cartão <CreditCardIcon />
            {`Taxa: ${enviroments.PERCENTAGE_CARD}`}
          </label>
        </div>
        <div
          onClick={() => { setPayment({ ...payment, paymentMethod: 'CASH' }) }}
          style={containerStyleDinamic(payment.paymentMethod === 'CASH')}
        >
          <label style={labelStyleDinamic(payment.paymentMethod === 'CASH')}>Espécie <PaymentsIcon /></label>
        </div>
      </div>
    </DialogContent>
    <DialogActions style={{ justifyContent: 'center', backgroundColor: '#F3F4F7' }}>
      <div style={{
        width: '90dvw',
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '2px 0px'
      }}>
        <Button
          fullWidth
          color="success"
          variant="contained"
          onClick={() => { handleModalState() }}
          style={{ marginRight: '5px', textTransform: "none", borderRadius: '8px' }}
        >Voltar</Button>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          disabled={payment.value === 0}
          style={{ marginLeft: '5px', textTransform: "none", borderRadius: '8px' }}
          onClick={async () => {

            if (payment.paymentMethod === undefined || payment.paymentMethod === '') {
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

          }}>Confirmar</Button>
      </div>
    </DialogActions>
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
  </Dialog>
}
