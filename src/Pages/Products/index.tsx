import { Box, Button, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { IProduct } from "../../Types/IProduct"
import { getProductsService } from "../../Services/Products"
import { useNavigate } from "react-router-dom"
import { MinimarketContext } from "../../Context/minimarket"
import { ProductModal } from "./Components/Modal"
import { IStateShowData } from "../../Types/IStateShowData"
import { ManagerShowData } from "../../Components/ManagerShowData"
import { ElementButton, GroupButtonsActions } from "../../Styles"

import { defaultPagination, IPagination } from "../../Types/IPagination"
import ListContainer from "../../Components/ListContainer"
import { ProductCard } from "./Components/Card"
import { fullSize } from "../../Utils/sizesDevices"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';


export const ProductsPage = () => {

  const { productWasManipulated, setProductWasManipulated } = useContext(MinimarketContext)

  const navigate = useNavigate()

  const [filter, setFilter] = useState('')
  const [state, setState] = useState<IStateShowData>({
    state: ''
  })
  const [products, setProducts] = useState<IProduct[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [pagination, setPagination] = useState<IPagination<IProduct>>(defaultPagination)

  const findCustomers = async () => {
    try {

      if (pagination.pageIndex === 0) {
        setState({ state: "IN_PROGRESS" })
      }

      const response = await getProductsService(
        filter,
        pagination.pageIndex,
        pagination.pageSize
      )

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
      setProductWasManipulated(false)

      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {
      setState({ state: "ERROR" })
    }
  }

  useEffect(() => {
    findCustomers()
  }, [filter, pagination.pageIndex])

  useEffect(() => {
    if (productWasManipulated) findCustomers()
  }, [productWasManipulated])

  return <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100dvh"
    }}
  >
    <Box
      sx={{
        backgroundColor: '#ffffff',
        height: '14dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: {
            xs: "10px 20px",
            sm: "10px 20px",
            md: "10px 60px"
          },
          maxWidth: fullSize,
        }}
      >
        <div style={{ display: 'flex', alignItems: "flex-start", flexDirection: 'column' }}>
          <Typography
            color="textSecondary"
            fontSize={18}
            fontWeight={550}
          >Produtos</Typography>
          <Typography
            color="textSecondary"
            fontSize={13}
          >Pesquise abaixo pelo nome dos produtos</Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <SearchIcon color="action" />
          <TextField
            id="standard-basic"
            variant="standard"
            sx={{ width: '90dvw' }}
            defaultValue={filter}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(event: any) => {
              setFilter(event.target.value ?? '')
              setPagination({ ...defaultPagination, pageIndex: 0 })
            }}
          />
        </div>
      </Box>
    </Box>
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box sx={GroupButtonsActions}>
        <Button
          sx={ElementButton}
          onClick={() => { navigate("/") }}
        >
          <ArrowBackIcon />
          Voltar
        </Button>
        <Button
          sx={ElementButton}
          onClick={() => { setOpenModal(true) }}
        >
          <AddIcon />
          Adicionar
        </Button>
      </Box>
    </Box>
    {
      openModal ?
        <ProductModal
          open={openModal}
          setOpen={setOpenModal}
        /> :
        ''
    }
  </Box>
}
