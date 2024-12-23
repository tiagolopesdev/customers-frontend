import { Button, Skeleton, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { ScroolCustom } from "../../Styles"
import { ProductCardList } from "../../Components/Cards/Products/productList"
import { IProduct } from "../../Types/IProduct"
import { getProductsService } from "../../Services/Products"
import { useNavigate } from "react-router-dom"

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MinimarketContext } from "../../Context/minimarket"
import { ProductModal } from "../../Components/Modals/Product"


export const ProductsPage = () => {

  const { productWasManipulated, setProductWasManipulated } = useContext(MinimarketContext)

  const navigate = useNavigate()

  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])
  const [openModal, setOpenModal] = useState(false)

  const findCustomers = async () => {
    try {

      setLoading(true)

      const result = await getProductsService(filter)

      setProducts(result as IProduct[])
      setLoading(false)
      setProductWasManipulated(false)

      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    findCustomers()
  }, [filter])

  useEffect(() => {
    if (productWasManipulated) findCustomers()
  }, [productWasManipulated])

  return <div
    style={{
      display: 'flex',
      flexDirection: "column",
      height: '100dvh',
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        height: '15dvh',
        display: 'flex',
        padding: '10px',
        flexDirection: 'column'
      }}
    >
      <TextField
        id="standard-basic"
        label="Pesquise pelo nome do comprador"
        variant="standard"
        sx={{ width: '80dvw' }}
        defaultValue={filter}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => { setFilter(event.target.value ?? '') }}
      />
    </div>
    {
      loading ?
        <div style={{ margin: '10px', height: '100%' }}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '95vw',
              height: '75vh',
              borderRadius: '10px'
            }}
          />
        </div> :
        <ScroolCustom>
          <ProductCardList products={products} />
        </ScroolCustom>
    }
    <div
      style={{
        display: "flex",
        flex: 1,
      }}
    >
      <div
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: '#1864BA',
          display: "flex",
          padding: '10px',
          width: '100vw',
          justifyContent: "center",
          height: '10dvh',
          flexShrink: 0,
          alignItems: 'center'
        }}
      >
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
      </div>
    </div>
    {
      openModal ?
        <ProductModal
          open={openModal}
          setOpen={setOpenModal}
        /> :
        ''
    }
  </div>
}
