/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, TextField } from "@mui/material"
import { CurrencyInput } from "react-currency-mask";
import { IPayments } from "../../../Types/IPayments";
import { useState } from "react";

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

  const [payment, setPayment] = useState<IPayments>(paymentProps)

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
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '25px'
      }}>
        <Button color="success" variant="contained" onClick={() => { handleModalState() }}>Voltar</Button>
        <Button color="success" variant="contained" onClick={() => {
          setPaymentProps(payment)
          setOpen(false)
        }}>Confirmar</Button>
      </div>
    </Box>
  </Modal>
}
