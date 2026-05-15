import styled from "styled-components"
import { IProduct } from "../../../Types/IProduct"
import { ProductCard } from "./product-card"
import { renderList } from "../../../Utils/cardsList"

interface IProductCardList {
  products: IProduct[]
}

export const CardListGroup = styled.div`
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const ProductCardList = ({ products }: IProductCardList) => {

  const ProductComponent = ({ item }: { item: IProduct }) =>
    <ProductCard product={item} />

  return <CardListGroup>
    {renderList(products, ProductComponent)}
  </CardListGroup>
}
