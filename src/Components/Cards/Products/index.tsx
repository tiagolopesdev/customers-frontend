import { Button, Card, CardContent, Chip, Typography } from "@mui/material"
import { IProduct } from "../../../Types/IProduct"
import dayjs from "dayjs"

import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react"
import { ProductModal } from "../../Modals/Product"

interface IProductCard {
  product: IProduct
}

export const ProductCard = ({ product }: IProductCard) => {

  // const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false)
  // const [quantity, setQuantity] = useState(0)

  const managerActions = () => {
    return <div style={{ display: 'flex' }}>
      <Button
        color="info"
        variant="text"
        size="small"
        sx={{ marginTop: '10px' }}
        onClick={() => { setOpenModal(true) }}
      >
        <EditIcon sx={{ width: '25px' }} />
      </Button>
      {/* <Button
        color="info"
        variant="contained"
        size="small"
        sx={{ marginTop: '10px', marginLeft: '20px' }}
      >
        <Link
          to="/"
          style={{
            color: '#ffffff',
            lineHeight: '0px'
          }}
        ><UndoIcon sx={{ width: '25px' }} /></Link>
      </Button> */}
    </div>
  }

  return <Card sx={{
    minWidth: '90vw',
    maxWidth: '65vw',
    minHeight: '10vh'
  }}
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
          fontWeight: 760
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
          {/* <IconButton sx={{ padding: 0 }} onClick={() => {
            const quantityUpdated = quantity - 1
            setQuantity(quantityUpdated)
          }} >
            <RemoveCircle color="primary" />
          </IconButton> */}
          <Chip
            sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
            label={`Estoque: ${product.quantity}`}
            color='info'
            variant='filled'
          />
          {/* <IconButton sx={{ padding: 0 }} onClick={() => {
            const quantityUpdated = quantity + 1
            setQuantity(quantityUpdated)
          }} >
            <AddCircle color="primary" />
          </IconButton> */}
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
        {`Vendidos: 00 / Preço compra: R$${product.basePrice.toFixed(2)} / Lucro: R$00,00`}
      </Typography>
      {managerActions()}
    </CardContent>
    {
      openModal ?
      <ProductModal 
        open={openModal}
        setOpen={setOpenModal}
        productProps={product}
      /> : ''
    }
  </Card>
}
