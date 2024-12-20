import { Card, CardContent, Chip, IconButton, Typography } from "@mui/material"
import { IProduct } from "../../../Types/IProduct"
import { AddCircle, RemoveCircle } from "@mui/icons-material"
import dayjs from "dayjs"

interface IProductCard {
  product: IProduct
}

export const ProductCard = ({ product }: IProductCard) => {

  // const navigate = useNavigate();

  return <Card sx={{
    minWidth: '90vw',
    maxWidth: '65vw',
    minHeight: '10vh'
  }}
    // onClick={() => {
    //   localStorage.setItem('productId', product.id as string)
    //   navigate(`/product`)
    // }}
    key={`product-${product.name}-${product.id}`}
  >
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
        padding: "8px",
        '&:last-child': {
          paddingBottom: "8px"
        }
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 650
        }}
      >
        {product.name}
      </Typography>
      <Typography
        sx={{
          fontSize: 14
        }}
      >
        {product.description}
      </Typography>
      <Chip
        sx={{ height: 25, fontWeight: 550 }}
        label={`Incluido em: ${dayjs(product.dateCreated).format('DD/MM/YYYY HH:MM')}`}
        color='info'
        variant='outlined'
      />
      <div style={{
        display: 'flex',
        marginTop: '10px',
        alignItems: 'center'
      }}>
        <div>
          <IconButton sx={{ padding: 0 }} >
            <RemoveCircle color="primary" />
          </IconButton>
          <Chip
            sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
            label={`Estoque: ${product.quantity}`}
            color='info'
            variant='filled'
          />
          <IconButton sx={{ padding: 0 }} >
            <AddCircle color="primary" />
          </IconButton>
        </div>
        <Chip
          sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
          label={`Preço uni.: ${product.value.toFixed(2)}`}
          color='success'
          variant='filled'
        />
      </div>
      <Typography
        sx={{
          fontSize: 15,
          marginTop: '10px',
          fontStyle: "italic"
        }}
      >
        {`Vendidos: 00 / Preço compra: R$00,00 / Lucro: R$00,00`}
      </Typography>
    </CardContent>
  </Card>
}
