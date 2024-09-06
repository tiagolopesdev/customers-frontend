import { Box, Button, Modal, TextField } from "@mui/material"
import { CurrencyInput } from "react-currency-mask";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 2.5,
};

interface IPaymentsModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const PaymentsModal = ({ open, setOpen }: IPaymentsModal) => {

  const handleModalState = () => setOpen(!open)

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
          event: React.ChangeEvent<HTMLInputElement>,
          originalValue: string | number,
          maskedValue: string | number
        ) => {
          console.log(event, originalValue, maskedValue)
        }}
        InputElement={<TextField label="Valor unitário" />}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '25px'
      }}>
        <Button color="success" variant="contained" onClick={() => { handleModalState() }}>Voltar</Button>
        <Button color="success" variant="contained" onClick={() => { }}>Confirmar</Button>
      </div>
    </Box>
  </Modal>
}
