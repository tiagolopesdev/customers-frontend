/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { IBuys } from "../../../Types/IBuys";
import { getProductsHandler } from "../../../Handlers/GetProducts";
import { IProduct } from "../../../Types/IProduct";
import { ProductCardList } from "./product-list";
import { MinimarketContext } from "../../../Context/minimarket";
import { IStateShowData } from "../../../Types/IStateShowData";
import { ManagerShowData } from "../../ManagerShowData";

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 410,
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 2.8,
};

interface IShoppingModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  buyProps: IBuys[]
  setBuyProps: React.Dispatch<React.SetStateAction<IBuys[]>>
}

export const ShoppingModal = (props: IShoppingModal) => {

  const { open, setOpen, setBuyProps, buyProps } = props

  const { selectedProducts, setSelectProducts, user } = useContext(MinimarketContext)

  const handleModalState = () => setOpen(!open)

  const [filterProduct, setFilterProduct] = useState('')
  const [products, setProducts] = useState<IProduct[]>([])
  const [state, setState] = useState<IStateShowData>({
    state: ''
  })

  const findProducts = async () => {
    try {
      setState({ state: "IN_PROGRESS" })

      const response = await getProductsHandler(filterProduct)

      if (response?.length === 0) {
        setState({ state: "NOT_FOUND" })
      } else {
        setProducts(response as IProduct[])
        setState({ state: "SUCCESS" })
      }
    } catch (error) {
      setState({ state: "ERROR" })
    }
  }

  useEffect(() => { findProducts() }, [filterProduct])

  const managerButtons = () => {
    return <div style={{
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-evenly'
    }}>
      <Button color="info" variant="contained" onClick={() => {
        handleModalState()
        setSelectProducts([])
      }}>Voltar</Button>
      <Button
        color="success"
        variant="contained"
        disabled={selectedProducts.length === 0}
        onClick={() => {

          const buysToInsert: IBuys[] = []

          selectedProducts.forEach((item: IProduct) => {
            buysToInsert.push({
              name: item.name,
              price: item.value,
              quantity: item.quantity,
              productId: item.id,
              updatedBy: user.email
            })
          })

          setBuyProps([...buyProps, ...buysToInsert])

          setSelectProducts([])

          setOpen(false)
        }}
      >Confirmar</Button>
    </div>
  }

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
      <div style={{ height: '35dvh', width: 'inherit' }}>
        <ManagerShowData
          data={<ProductCardList products={products} />}
          state={state}
        />
      </div>
      {managerButtons()}
    </Box>
  </Modal>
}
