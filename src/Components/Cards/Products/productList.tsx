import { ProductCard } from "."
import { IProduct } from "../../../Types/IProduct"
import { renderList } from "../../../Utils/cardsList"
import { CardListGroup } from "./style"

interface IProductCardList {
  products: IProduct[]
}

export const ProductCardList = ({ products }: IProductCardList) => {

  const ProductComponent = ({ item }: { item: IProduct }) => {
    return <ProductCard product={item} />
  }

  return <CardListGroup>
    {renderList(products, ProductComponent)}
  </CardListGroup>
}
