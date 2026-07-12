/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { IBuys } from "../../../../../Types/IBuys";
import { getProductsHandler } from "../../../../../Handlers/GetProducts";
import { IProduct } from "../../../../../Types/IProduct";
import { MinimarketContext } from "../../../../../Context/minimarket";
import { IStateShowData } from "../../../../../Types/IStateShowData";
import { ManagerShowData } from "../../../../../Components/ManagerShowData";

import SearchIcon from '@mui/icons-material/Search';
import { defaultPagination, IPagination } from "../../../../../Types/IPagination";
import ModalBase from "../../../../../Components/Modals";
import ButtonsModals from "../../../../../Components/ButtonsModals";
import ListContainer from "../../../../../Components/ListContainer";
import ProductCard from "../../Cards/Product";

interface IShoppingModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShoppingModal = (props: IShoppingModal) => {

  const { open, setOpen } = props

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
  const [pagination, setPagination] = useState<IPagination<IProduct>>(defaultPagination)

  const findProducts = async () => {
    try {

      if (pagination.pageIndex === 0) {
        setState({ state: "IN_PROGRESS" })
      }

      const response = await getProductsHandler(
        filterProduct,
        pagination.pageIndex,
        pagination.pageSize
      ) || defaultPagination

      if (response.data.length === 0) {
        setState({ state: "NOT_FOUND" })
      } else {
        setPagination(response)

        setProducts(prevProducts => {
          return pagination.pageIndex === 1 ?
            response?.data :
            [...prevProducts, ...response?.data ?? []]
        })

        setState({ state: "SUCCESS" })
      }
    } catch (error) {
      setState({ state: "ERROR" })
    }
  }

  useEffect(() => { findProducts() }, [filterProduct, pagination.pageIndex])


  return <ModalBase
    open={open}
  >
    <Box>
      <Typography
        style={{
          color: '#212121',
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
          onChange={(event: any) => {
            setFilterProduct(event.target.value)
            setPagination({ ...defaultPagination, pageIndex: 0 })
          }}
        />
      </div>
    </Box>
    <Box
      sx={{
        display: 'flex',
        height: '350px',
        minHeight: '250px',
        width: '100%',
        padding: '0px',
        overflow: 'hidden'
      }}
    >
      <ManagerShowData
        data={
          <ListContainer
            componentToShow={
              ({ item }: { item: IProduct }) =>
                <ProductCard product={item} />
            }
            elements={products}
          />
        }
        state={state}
        pagination={pagination}
        setPagination={setPagination}
      />
    </Box>
    <ButtonsModals
      disableConfirm={selectedProducts.length === 0}
      onClickBack={() => {
        handleModalState()
        setSelectProducts([])
      }}
      onClickConfirm={() => {

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
    />
  </ModalBase >
}
