import AddCircle from "@mui/icons-material/AddCircle"
import RemoveCircle from "@mui/icons-material/RemoveCircle"
import { Card, CardContent, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { IProduct } from "../../../Types/IProduct"


interface IProductCard {
  product: IProduct
}

export const ProductCard = ({ product }: IProductCard) => {

  const [quantity, setQuantity] = useState(0)

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
      <div>
        <Typography gutterBottom sx={{ fontSize: 16, fontWeight: 550, margin: 0 }}>
          {product.name}
        </Typography>
        <Typography gutterBottom sx={{ fontSize: 12, color: 'ButtonShadow', fontStyle: 'italic' }}>
          {product.description ?? "Produto sem descrição cadastrada"}
        </Typography>
        <Typography gutterBottom sx={{ fontSize: 15, fontWeight: 550, margin: 0, color: 'green' }}>
          {`R$ ${product.value}`}
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton sx={{ padding: 0 }} onClick={() => { setQuantity(quantity + 1) }} >
          <AddCircle
            color="primary"
          />
        </IconButton>
        <Typography gutterBottom sx={{ fontSize: 16, fontWeight: 550, marginBottom: 0 }}>
          {quantity}
        </Typography>
        <IconButton sx={{ padding: 0 }}
          onClick={() => {
            if (quantity === 0) return 
            setQuantity(quantity - 1)
          }}
        >
          <RemoveCircle
            color="primary"
          />
        </IconButton>
      </div>
    </CardContent>
  </Card>
}
