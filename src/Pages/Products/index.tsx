import { Button, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { ProductCardList } from "../../Components/Cards/Products/productList"
import { IProduct } from "../../Types/IProduct"
import { getProductsService } from "../../Services/Products"
import { useNavigate } from "react-router-dom"

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MinimarketContext } from "../../Context/minimarket"
import { ProductModal } from "../../Components/Modals/Product"
import { IStateShowData } from "../../Types/IStateShowData"
import { ManagerShowData } from "../../Components/ManagerShowData"
import { ComponentContainer, ButtonsGroup, SearchContainer } from "./style"


export const ProductsPage = () => {

  const { productWasManipulated, setProductWasManipulated } = useContext(MinimarketContext)

  const navigate = useNavigate()

  const [filter, setFilter] = useState('')
  const [state, setState] = useState<IStateShowData>({
    state: ''
  })
  const [products, setProducts] = useState<IProduct[]>([])
  const [openModal, setOpenModal] = useState(false)

  const findCustomers = async () => {
    try {

      setState({ state: "IN_PROGRESS" })

      const result = await getProductsService(filter)

      if (result.length === 0) {
        setState({ state: "NOT_FOUND" })
      } else {
        setProducts(result as IProduct[])
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
  }, [filter])

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
        onChange={(event: any) => { setFilter(event.target.value ?? '') }}
      />
    </SearchContainer>
    <ManagerShowData
      data={<ProductCardList products={products} />}
      state={state}
    />
    <ButtonsGroup>
      <Button
        style={{ height: '7vh', margin: '0px 5px' }}
        color="success"
        variant="contained"
        onClick={() => { navigate("/") }}
      >
        <ArrowBackIcon />
      </Button>
      <Button
        style={{ height: '7vh', margin: '0px 5px' }}
        color="success"
        variant="contained"
        onClick={() => { setOpenModal(true) }}
      >
        <AddIcon />
      </Button>
    </ButtonsGroup>
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
