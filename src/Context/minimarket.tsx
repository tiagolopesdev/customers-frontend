import { ReactNode, createContext, useState } from "react";
import { IProduct } from "../Types/IProduct";


interface IMinimarketContextProvider {
  children: ReactNode
}

interface IMinimarketContext {
  selectedProducts: IProduct[];
  setSelectProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
}

export const MinimarketContext = createContext({} as IMinimarketContext)

export const MinimarketProvider = ({ children }: IMinimarketContextProvider) => {

  const [selectedProducts, setSelectProducts] = useState<IProduct[]>([])

  return <MinimarketContext.Provider value={{
    selectedProducts,
    setSelectProducts
  }}>
    {children}
  </MinimarketContext.Provider>
}
