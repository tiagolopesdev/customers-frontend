/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material"
import { CurrencyInput } from "react-currency-mask";
import { useContext, useState } from "react";
import { IMessageFeedback } from "../../../Types/IMessageFeedback";
import { showPercentage } from "../../../Utils/percentage/showPercentage";
import { IProduct } from "../../../Types/IProduct";
import { createProductService, updateProductService } from "../../../Services/Products";
import { MinimarketContext } from "../../../Context/minimarket";


const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 2.5,
};

interface IProductModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  productProps?: IProduct
}

export const ProductModal = ({ open, setOpen, productProps }: IProductModal) => {

  const handleModalState = () => setOpen(!open)

  const { setProductWasManipulated } = useContext(MinimarketContext)

  const [openFeedback, setOpenFeedback] = useState(false);
  const [product, setProduct] = useState<IProduct>(productProps !== undefined ? productProps : {
    name: '',
    basePrice: 0,
    description: '',
    quantity: 0,
    value: 0,
    id: '',
    dateCreated: ''
  })
  const [message, setMessage] = useState<IMessageFeedback>({
    message: '',
    type: "success"
  })

  console.log('Product ', product)

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
      ...style,
    }}>
      <div style={{
        display: 'flex',
        gap: '10px',
        flexDirection: 'column'
      }}>
        <TextField
          id="standard-basic"
          label="Nome do produto"
          variant="outlined"
          size="small"
          defaultValue={product.name}
          onChange={(event: any) => { setProduct({ ...product, name: event.target.value }) }}
        />
        <TextField
          id="standard-basic"
          label="Descrição"
          variant="outlined"
          size="small"
          defaultValue={product.description}
          onChange={(event: any) => { setProduct({ ...product, description: event.target.value }) }}
        />
        <CurrencyInput
          defaultValue={product.value}
          onChangeValue={(
            _event: React.ChangeEvent<HTMLInputElement>,
            originalValue: string | number,
            _maskedValue: string | number
          ) => {
            setProduct({ ...product, value: originalValue as number })
          }}
          InputElement={<TextField label="Valor unitário" size="small" />}
        />
        <CurrencyInput
          defaultValue={product.basePrice}
          onChangeValue={(
            _event: React.ChangeEvent<HTMLInputElement>,
            originalValue: string | number,
            _maskedValue: string | number
          ) => {
            setProduct({ ...product, basePrice: originalValue as number })
          }}
          InputElement={<TextField label="Preço de compra" size="small" />}
        />
        <input
          type="number"
          defaultValue={product.quantity}
          style={{
            height: '35px',
            borderRadius: '5px',
            color: 'rgb(87 87 87)',
            backgroundColor: '#ffffff',
            border: '1px solid #c4c4c4',
            padding: '0px 12px',
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight: '400',
            fontSize: '1rem',
            lineHeight: '1.4375em'
          }}
          placeholder="Quantidade"
          onChange={(event: any) => { setProduct({ ...product, quantity: event.target.value }) }}
        />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '25px'
      }}>
        <Button color="success" variant="contained" onClick={() => { handleModalState() }}>Voltar</Button>
        <Button
          color="success"
          variant="contained"
          disabled={product.value === 0}
          onClick={async () => {

            if (
              product.basePrice === 0 ||
              product.value === 0 ||
              product.name === ''
            ) {
              setMessage({
                message: "Um ou mais campos não preenchidos corretamente",
                type: "warning"
              })
              setOpenFeedback(true);
              return
            }

            if (product.id !== '') {
              await updateProductService(product)
            } else {
              await createProductService(product)
            }

            setProductWasManipulated(true)
            setOpen(false)
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
