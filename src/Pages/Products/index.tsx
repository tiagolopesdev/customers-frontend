import { Skeleton, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { ScroolCustom } from "../../Styles"
import { ProductCardList } from "../../Components/Cards/Products/productList"
import { IProduct } from "../../Types/IProduct"
import { getProductsService } from "../../Services/Products"


export const ProductsPage = () => {

  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])

  const findCustomers = async () => {
    try {

      setLoading(true)

      const result = await getProductsService(filter)

      setProducts(result as IProduct[])
      setLoading(false)

      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    findCustomers()
  }, [filter])

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
    </div>
  </div>
}
