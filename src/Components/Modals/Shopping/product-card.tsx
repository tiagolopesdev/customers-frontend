/* eslint-disable @typescript-eslint/no-explicit-any */
import AddCircle from "@mui/icons-material/AddCircle"
import RemoveCircle from "@mui/icons-material/RemoveCircle"
import { Alert, Card, CardContent, Chip, IconButton, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { IProduct } from "../../../Types/IProduct"
import { hasStockService } from "../../../Services/Products"
import { MinimarketContext } from "../../../Context/minimarket"


interface IProductCard {
  product: IProduct
}

export const ProductCard = ({ product }: IProductCard) => {

  const { selectedProducts, setSelectProducts } = useContext(MinimarketContext)

  const [quantity, setQuantity] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [addMore, setAddMore] = useState(false)

  const hasStock = async () => {
    try {
      setIsLoading(true)

      const result = await hasStockService(product.id)

      if ((result - quantity) === 0) {
        setAddMore(true)
        setIsLoading(false)
        return true
      } else {
        setQuantity(quantity + 1)
        setAddMore(false)
        setIsLoading(false)
        return false
      }
    } catch (error: any) {
      setIsLoading(false)
      console.log('Error: ', error.message)
    }
  }


  return <Card sx={{ minWidth: 270, width: 320, margin: '2px 0px', backgroundColor: '#ebebeb' }}>
    <CardContent
      sx={{
        margin: 1.2,
        padding: 0,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '&:last-child': {
          paddingBottom: "0px"
        }
      }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {
          isLoading ?
            <Alert sx={{ height: 40, fontWeight: 550 }} severity='info'>Verificando estoque do produto</Alert> :
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom sx={{ fontSize: 16, fontWeight: 550, margin: 0 }}>
                {product.name}
              </Typography>
              <Typography gutterBottom sx={{ fontSize: 12, color: 'ButtonShadow', fontStyle: 'italic' }}>
                {product.description ?? "Produto sem descrição cadastrada"}
              </Typography>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <Typography gutterBottom sx={{ fontSize: 15, fontWeight: 550, margin: 0, color: 'green' }}>
                  {`R$ ${product.value}`}
                </Typography>
                <Chip
                  sx={{ height: 18, margin: '0px 5px', fontWeight: 550, color: 'ButtonShadow' }}
                  label={`Estoque: ${product.quantity}`}
                  variant='outlined'
                />
              </div>
            </div>
        }

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton sx={{ padding: 0 }} onClick={async () => {

          const stockResult = await hasStock()

          const index = selectedProducts.findIndex((item) => { return item.id === product.id })

          const productToInsert = {
            dateCreated: product.dateCreated,
            description: product.description,
            id: product.id,
            name: product.name,
            quantity: quantity + 1,
            value: product.value
          }

          if (productToInsert.quantity <= 0 || stockResult) return

          if (index >= 0) {
            selectedProducts.splice(index, 1, productToInsert)
            setSelectProducts(selectedProducts)
          } else {
            setSelectProducts([...selectedProducts, ...[productToInsert]])
          }
        }}
          disabled={addMore}
        >
          <AddCircle color={addMore ? "disabled" : "primary"} />
        </IconButton>
        <Typography gutterBottom sx={{ fontSize: 16, fontWeight: 550, marginBottom: 0 }}>
          {quantity}
        </Typography>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => {
            setQuantity(quantity - 1)
            setIsLoading(false)
            setAddMore(false)

            let indexToRemove = 0
            const element = selectedProducts.find((item, index) => {
              if (item.id === product.id) {
                indexToRemove = index
                return item
              }
            })

            if ((element?.quantity as number - 1) === 0) {
              selectedProducts.splice(indexToRemove, 1)
            } else {
              selectedProducts.splice(indexToRemove, 1, {
                dateCreated: product.dateCreated,
                description: product.description,
                id: product.id,
                name: product.name,
                quantity: quantity - 1,
                value: product.value
              })
              setSelectProducts(selectedProducts)
            }
          }}
          disabled={quantity === 0}
        >
          <RemoveCircle color={quantity === 0 ? "disabled" : "info"} />
        </IconButton>
      </div>
    </CardContent>
  </Card>
}
