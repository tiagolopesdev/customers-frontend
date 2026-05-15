import { TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { ProductCardList } from "../../Components/Cards/Products/productList"
import { IProduct } from "../../Types/IProduct"
import { getProductsService } from "../../Services/Products"
import { useNavigate } from "react-router-dom"
import { MinimarketContext } from "../../Context/minimarket"
import { ProductModal } from "../../Components/Modals/Product"
import { IStateShowData } from "../../Types/IStateShowData"
import { ManagerShowData } from "../../Components/ManagerShowData"
import { ComponentContainer, SearchContainer } from "./style"
import { ElementButton, GroupButtonsActions } from "../../Styles"

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { defaultPagination, IPagination } from "../../Types/IPagination"


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

  return <ComponentContainer>
    <SearchContainer>
      <TextField
        id="standard-basic"
        label="Pesquise pelo nome do produto"
        variant="standard"
        sx={{ width: '80dvw' }}
        defaultValue={filter}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => {
          setFilter(event.target.value ?? '')
          setPagination({ ...defaultPagination, pageIndex: 0 })
        }}
      />
    </SearchContainer>
    <ManagerShowData
      data={<ProductCardList products={products} />}
      state={state}
      pagination={pagination}
      setPagination={setPagination}
    />
    <GroupButtonsActions>
      <ElementButton
        onClick={() => { navigate("/") }}
      >
        <ArrowBackIcon />
        Voltar
      </ElementButton>
      <ElementButton
        onClick={() => { setOpenModal(true) }}
      >
        <AddIcon />
        Adicionar
      </ElementButton>
    </GroupButtonsActions>
    {
      openModal ?
        <ProductModal
          open={openModal}
          setOpen={setOpenModal}
        /> :
        ''
    }
  </ComponentContainer>
}
