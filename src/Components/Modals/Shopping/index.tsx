import { Box, Button, Modal, TextField } from "@mui/material"
import { useState } from "react";
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

interface IShoppingModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShoppingModal = ({ open, setOpen }: IShoppingModal) => {

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
      <TextField style={{ width: '100%' }} id="outlined-basic" label="Produto" variant="outlined" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px'
        }}
      >
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
          alignItems: 'center',
          flexDirection: "row"
        }}
        >
          <Button size="small" onClick={() => { setQuantity(quantity + 1) }} variant="contained" >+</Button>
          <TextField
            disabled
            value={quantity}
            style={{ margin: '0px 10px' }}
          />
          <Button
            size="small"
            onClick={() => { setQuantity(quantity - 1) }}
            variant="contained"
            disabled={Boolean(quantity === 0)}
          >-</Button>
        </div>
        {/* <TextField style={{ width: '100%' }} id="outlined-basic" label="Preço Uni." variant="outlined" /> */}
      </div>
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
