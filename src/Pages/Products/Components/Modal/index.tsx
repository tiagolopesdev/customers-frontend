/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Box, Snackbar, SnackbarCloseReason, SxProps, TextField, Theme, Typography } from "@mui/material"
import { CurrencyInput } from "react-currency-mask";
import { useContext, useState } from "react";
import { IMessageFeedback } from "../../../../Types/IMessageFeedback";
import { IProduct } from "../../../../Types/IProduct";
import { createProductService, updateProductService } from "../../../../Services/Products";
import { MinimarketContext } from "../../../../Context/minimarket";
import { IUser } from "../../../../Types/IUser";
import ButtonsModals from "../../../../Components/ButtonsModals";
import ModalBase from "../../../../Components/Modals";


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
    dateCreated: '',
    quantitySold: 0
  })
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

  const inputStyle: SxProps<Theme> = {
    ".MuiInputBase-root": {
      borderRadius: "12px"
    }
  }

  const handleConfirm = async () => {

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
      const user: IUser = JSON.parse(localStorage.getItem('user') as string)
      product.updatedBy = user.email
      await updateProductService(product)
    } else {
      await createProductService(product)
    }

    setProductWasManipulated(true)
    setOpen(false)
  }

  return <ModalBase open={open}>
    <Box>
      <Typography
        style={{
          color: '#212121',
          fontWeight: 'bold',
          fontSize: '14pt',
        }}
      >
        {
          product.id !== ""
            ? "Editar produto"
            : "Adicionar produto"
        }
      </Typography>
      <Typography
        style={{
          fontSize: '10pt',
          color: '#6C757D'
        }}
      >
        {
          product.id !== ""
            ? "Edite os dados do produto abaixo"
            : "Adicione os dados do produto abaixo"
        }
      </Typography>
    </Box>
    <Box sx={{
      display: 'flex',
      height: '100%',
      flexDirection: "column",
      gap: "20px",
    }}
    >
      <TextField
        sx={{
          ...inputStyle
        }}
        id="standard-basic"
        label="Nome do produto"
        variant="outlined"
        size="small"
        defaultValue={product.name}
        onChange={(event: any) => { setProduct({ ...product, name: event.target.value }) }}
      />
      <TextField
        sx={{
          ...inputStyle
        }}
        id="standard-basic"
        label="Descrição"
        variant="outlined"
        size="small"
        defaultValue={product.description}
        onChange={(event: any) => { setProduct({ ...product, description: event.target.value }) }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "15px"
        }}
      >
        <CurrencyInput
          defaultValue={product.value}
          onChangeValue={(
            _event: React.ChangeEvent<HTMLInputElement>,
            originalValue: string | number,
            _maskedValue: string | number
          ) => {
            setProduct({ ...product, value: originalValue as number })
          }}
          InputElement={
            <TextField
              sx={{
                ...inputStyle
              }}
              label="Valor unitário"
              size="small"
            />
          }
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
          InputElement={
            <TextField
              sx={{
                ...inputStyle
              }}
              label="Preço de compra"
              size="small"
            />
          }
        />
      </Box>
      <TextField
        label="Quantidade"
        defaultValue={product.quantity}
        type="number"
        sx={{
          ...inputStyle,
          ".MuiInputBase-input": {
            padding: "12.5px 12px"
          }
        }}
        onChange={(event: any) => { setProduct({ ...product, quantity: event.target.value }) }}
      />
    </Box>
    <ButtonsModals
      onClickBack={() => { handleModalState() }}
      disableConfirm={product.value === 0}
      onClickConfirm={handleConfirm}
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

  // <Modal
  //   open={open}
  //   aria-labelledby="modal-product-add-edit-labelled"
  //   aria-describedby="modal-product-add-edit-described"
  // >
  //   <Box
  //     sx={{
  //       position: 'absolute',
  //       top: '45%',
  //       left: '50%',
  //       transform: 'translate(-50%, -50%)',
  //       width: { xs: "313px", sm: "400px", md: "470px" },
  //       bgcolor: 'background.paper',
  //       boxShadow: 20,
  //       borderRadius: "12px",
  //       padding: "15px 15px 25px 15px",
  //       gap: "30px",
  //       display: "flex",
  //       flexDirection: "column"
  //     }}
  //   >

  //   </Box>
  // </Modal>
}
