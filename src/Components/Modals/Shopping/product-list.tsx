import styled from "styled-components"
import { ICustomer } from "../../../Types/ICustomer"
import { IProduct } from "../../../Types/IProduct"
import { ProductCard } from "./product-card"

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

  const renderList = () => {
    return ([] as IProduct[]).concat(products ?? [])?.map((item: IProduct) => {
      return <ProductCard product={item} key={`card-product-${item.id}`}/>
    })
  }

  return <CardListGroup>
    {renderList()}
  </CardListGroup>
}
