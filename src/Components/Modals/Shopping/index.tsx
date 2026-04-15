/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { IBuys } from "../../../Types/IBuys";
import { getProductsHandler } from "../../../Handlers/GetProducts";
import { IProduct } from "../../../Types/IProduct";
import { ProductCardList } from "./product-list";
import { MinimarketContext } from "../../../Context/minimarket";
import { IStateShowData } from "../../../Types/IStateShowData";
import { ManagerShowData } from "../../ManagerShowData";

import SearchIcon from '@mui/icons-material/Search';

interface IShoppingModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  // buyProps: IBuys[]
  // setBuyProps: React.Dispatch<React.SetStateAction<IBuys[]>>
}

export const ShoppingModal = (props: IShoppingModal) => {

  const { open, setOpen } = props
  // const { open, setOpen, setBuyProps, buyProps } = props

  const { 
    selectedProducts, 
    setSelectProducts, 
    user,
    setCustomer,
    customer
  } = useContext(MinimarketContext)

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
      width: '90dvw',
      display: 'flex',
      justifyContent: 'space-evenly',
      margin: '4px 0px'
    }}>
      <Button
        color="success"
        variant="contained"
        fullWidth
        style={{ marginRight: '5px', textTransform: "none", borderRadius: '8px' }}
        onClick={() => {
          handleModalState()
          setSelectProducts([])
        }}
      >Voltar</Button>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        style={{ marginLeft: '5px', textTransform: "none", borderRadius: '8px' }}
        disabled={selectedProducts.length === 0}
        onClick={() => {

          const buysToInsert: IBuys[] = []

          selectedProducts.forEach((item: IProduct) => {
            buysToInsert.push({
              name: item.name,
              price: item.value,
              quantity: item.quantity,
              total: item.value * item.quantity,
              productId: item.id,
              updatedBy: user.email
            })
          })

          setCustomer({
            ...customer,
            ...{
              buys: [...(customer.buys || []), ...buysToInsert]
            }
          })

          setSelectProducts([])

          setOpen(false)
        }}
      >Confirmar</Button>
    </div>
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
      >Adicionar produtos</Typography>
      <Typography
        style={{
          fontSize: '10pt',
          color: '#6C757D'
        }}
      >Pesquise e selecione os produtos desejados</Typography>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10px'
      }}>
        <SearchIcon style={{ color: '#6C757D', marginRight: '5px' }} />
        <TextField
          style={{ width: '100%' }}
          id="outlined-basic"
          variant="standard"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any) => { setFilterProduct(event.target.value) }}
        />
      </div>
    </DialogTitle>
    <DialogContent style={{
      display: 'flex',
      height: '350px',
      minHeight: '250px',
      backgroundColor: '#F3F4F7',
      padding: '0px',
      overflow: 'hidden'
    }}
    >
      <ManagerShowData
        data={<ProductCardList products={products} />}
        state={state}
      />
    </DialogContent>
    <DialogActions style={{ justifyContent: 'center', backgroundColor: '#F3F4F7' }}>
      {managerButtons()}
    </DialogActions>
  </Dialog>
}
