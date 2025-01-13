/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material"
import { CurrencyInput } from "react-currency-mask";
import { IPayments } from "../../../Types/IPayments";
import { useState } from "react";
import { IMessageFeedback } from "../../../Types/IMessageFeedback";
import { showPercentage } from "../../../Utils/percentage/showPercentage";
import { enviroments } from "../../../config/enviroments";

const style = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 2.5,
};

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

  return <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{
      borderRadius: '5px',
      ...style
    }}>
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
        InputElement={<TextField label="Valor unitário" />}
      />
      {
        payment.paymentMethod === 'CARD' ?
          <Typography
            sx={{ color: '#000000', fontSize: 14, marginBottom: '12px' }}
          >{`Com juros: ${showPercentage(true, payment.paymentMethod, payment.value)}`}</Typography> :
          ''
      }
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Forma de pagamento</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{ color: '#000000' }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={(event: any) => { setPayment({ ...payment, paymentMethod: event.target.value }) }}
        >
          <FormControlLabel value="PIX" control={<Radio />} label="Pix" />
          <FormControlLabel value="CARD" control={<Radio />} label={`Cartão (${enviroments.PERCENTAGE_CARD.replace('.', ',')}%)`} />
          <FormControlLabel value="CASH" control={<Radio />} label="Espécie" />
        </RadioGroup>
      </FormControl>
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '25px'
      }}>
        <Button color="success" variant="contained" onClick={() => { handleModalState() }}>Voltar</Button>
        <Button
          color="success"
          variant="contained"
          disabled={payment.value === 0}
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
    </Box>
  </Modal>
}
