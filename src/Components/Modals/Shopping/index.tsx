/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, TextField } from "@mui/material"
import { useState } from "react";
import { CurrencyInput } from "react-currency-mask";
import { IBuys } from "../../../Types/IBuys";

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
  buyProps: IBuys
  setBuyProps: React.Dispatch<React.SetStateAction<IBuys>>
}

export const ShoppingModal = (props: IShoppingModal) => {

  const { open, setOpen, buyProps, setBuyProps } = props

  const handleModalState = () => setOpen(!open)

  const [buy, setBuy] = useState<IBuys>(buyProps)

  return <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{
      borderRadius: '5px',
      ...style
    }}>
      <TextField
        style={{ width: '100%' }}
        id="outlined-basic"
        label="Produto"
        variant="outlined"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => { setBuy({ ...buy, name: event.target.value }) }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px'
        }}
      >
        <CurrencyInput
          onChangeValue={(            
            _event: React.ChangeEvent<HTMLInputElement>,
            originalValue: string | number,
            _maskedValue: string | number
          ) => {
            setBuy({ ...buy, price: originalValue as number })
          }}
          InputElement={<TextField label="Valor unitário" />}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: "row"
        }}
        >
          <Button size="small" onClick={() => {
            setBuy({
              ...buy, ...{
                quantity: buy.quantity + 1,
                total: (buy.quantity + 1) * buy.price
              }
            })
          }} variant="contained" >+</Button>
          <TextField
            disabled
            value={buy?.quantity}
            style={{ margin: '0px 10px' }}
          />
          <Button
            size="small"
            onClick={() => {
              setBuy({
                ...buy, ...{
                  quantity: buy.quantity - 1,
                  total: (buy.quantity - 1) * buy.price
                }
              })
            }}
            variant="contained"
            disabled={Boolean(buy?.quantity === 0)}
          >-</Button>
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '25px'
      }}>
        <Button color="success" variant="contained" onClick={() => { handleModalState() }}>Voltar</Button>
        <Button color="success" variant="contained" onClick={() => {
          setBuyProps(buy)
          setOpen(false)
        }}>Confirmar</Button>
      </div>
    </Box>
  </Modal>
}
