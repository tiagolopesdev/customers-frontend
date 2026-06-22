import { Card, CardContent } from "@mui/material"
import { IProduct } from "../../../../Types/IProduct"

import { useState } from "react"
import { ProductModal } from "../Modal"

import ProductBaseInfo from "./Parts/ProductBaseInfo"
import ProductSalesAnalysis from "./Parts/ProductSalesAnalysis";


interface IProductCard {
  product: IProduct
}

export const ProductCard = ({ product }: IProductCard) => {


  const [openModal, setOpenModal] = useState(false)

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
      <ProductBaseInfo
        dateCreated={product.dateCreated}
        description={product.description}
        name={product.name}
        setOpenModal={setOpenModal}
      />
      <ProductSalesAnalysis
        basePrice={product.basePrice}
        quantity={product.quantity}
        quantitySold={product.quantitySold}
        value={product.value}
      />
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
