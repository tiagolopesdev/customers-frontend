/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { IBuys } from "../../../Types/IBuys";
import { ProductCard } from "./product-card";
import { getProductsHandler } from "../../../Handlers/GetProducts";
import { IProduct } from "../../../Types/IProduct";
import { ProductCardList } from "./product-list";

const style = {
  position: 'absolute',
  top: '34%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 355,
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
  const [filterProduct, setFilterProduct] = useState('')
  const [products, setProducts] = useState<IProduct[]>([])

  const findProducts = async () => {
    try {

      const response = await getProductsHandler(filterProduct)

      setProducts(response as IProduct[])

    } catch (error) {

    }
  }

  useEffect(() => { findProducts() }, [filterProduct])

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
        label="Pesquise pelo nome do produto"
        variant="filled"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => { setFilterProduct(event.target.value) }}
      />
      <div
        style={{
          marginTop: '20px',
          overflow: 'scroll',
          height: '225px',
        }}
      >
        <ProductCardList products={products} />
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
