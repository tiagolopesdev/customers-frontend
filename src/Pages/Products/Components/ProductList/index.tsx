import { ProductCard } from "../Card"
import { IProduct } from "../../../../Types/IProduct"
import { renderList } from "../../../../Utils/cardsList"
import { Box } from "@mui/material"

interface IProductCardList {
  products: IProduct[]
}

export const ProductList = ({ products }: IProductCardList) => {

  const ProductComponent = ({ item }: { item: IProduct }) => {
    return <ProductCard product={item} />
  }

  return <Box
    sx={{
      padding: "10px",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    }}
  >
    {renderList(products, ProductComponent)}
  </Box>
}
