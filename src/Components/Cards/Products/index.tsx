import { Button, Card, CardContent, Typography } from "@mui/material"
import { IProduct } from "../../../Types/IProduct"
import dayjs from "dayjs"

import { CSSProperties, useState } from "react"
import { ProductModal } from "../../Modals/Product"

import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


interface IProductCard {
  product: IProduct
}

export const ProductCard = ({ product }: IProductCard) => {


  const [openModal, setOpenModal] = useState(false)

  const containerStyleDinamic = (): CSSProperties => {
    return {
      border: `solid 2px #E2E4E9`,
      backgroundColor: `#EFF0F3`,
      height: '9vh',
      width: '24vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      minHeight: '80px',
      flexDirection: "column"
    }
  }

  const labelStyleDinamic = (): CSSProperties => {
    return {
      color: `${'#6a6d76'}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: "13px"
    }
  }

  return <Card sx={{
    minWidth: '90vw',
    maxWidth: '65vw',
    minHeight: '10vh',
    borderRadius: "12px"
  }}
    key={`product-${product.name}-${product.id}`}
  >
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
        gap: "14px"
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "6px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "inherit"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: 600,
              }}
            >{product.name}</Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: '#4f535f',
              }}
            >{product.description}</Typography>
          </div>
          <Button
            color="info"
            variant="text"
            size="small"
            sx={{
              backgroundColor: "#E6F2FD",
              borderRadius: "12px",
              minHeight: "42px",
              minWidth: "42px"
            }}
            onClick={() => { setOpenModal(true) }}
          >
            <EditIcon sx={{ width: '25px' }} />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "6px",
            alignItems: "center"
          }}
        >
          <CalendarTodayIcon sx={{ width: "14px", color: "#4f535f" }} />
          <Typography
            sx={{
              fontSize: "13px",
              color: "#4f535f"
            }}
          >
            {`Incluido em: ${dayjs(product.dateCreated).format('DD/MM/YYYY HH:MM')}`}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: "100%",
          justifyContent: "space-evenly"
        }}
      >
        <div
          style={containerStyleDinamic()}
        >
          <label style={labelStyleDinamic()}>
            <InventoryIcon sx={{ width: "18px", color: "#767F8E" }} />
            Estoque
          </label>
          <span
            style={{ fontWeight: 700 }}
          >
            {product.quantity}
          </span>
        </div>
        <div
          style={containerStyleDinamic()}
        >
          <label style={labelStyleDinamic()}>
            <LocalOfferIcon sx={{ width: "18px", color: "#0288D1" }} />
            Preço Uni.
          </label>
          <span
            style={{ fontWeight: 700 }}
          >
            {product.value.toFixed(2)}
          </span>
        </div>
        <div
          style={containerStyleDinamic()}
        >
          <label style={labelStyleDinamic()}>
            <ShoppingBagIcon sx={{ width: "18px", color: "#46AF7B" }} />
            Vendidos
          </label>
          <span
            style={{ fontWeight: 700 }}
          >
            {product.quantitySold}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <TrendingUpIcon sx={{ width: "20px", color: "#46AF7B" }} />
          <Typography
            sx={{
              fontSize: "14px",
              color: "#4f535f"
            }}
          >
            Compra <strong>R${product.basePrice.toFixed(2)}</strong>
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#4f535f"
            }}
          >Lucro</Typography>
          <Typography
            sx={{
              color: "#46AF7B",
              fontSize: "16px",
              fontWeight: 600
            }}
          >
            {`R$${((product.value - product.basePrice) * product.quantitySold).toFixed(2)}`}
          </Typography>
        </div>
      </div>
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
