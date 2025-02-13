import { ReactNode, createContext, useState } from "react";
import { IProduct } from "../Types/IProduct";
import { getToken } from "../Services/Users";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../Types/IUser";
import { ObjectIsEquals } from "../Utils/objectIsEqual";


interface IMinimarketContextProvider {
  children: ReactNode
}

interface IMinimarketContext {
  user: IUser,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  selectedProducts: IProduct[];
  setSelectProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  login: (email: string) => Promise<void>,
  logout: () => void
  loadUserLocalStorage: () => void
  productWasManipulated: boolean
  setProductWasManipulated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialPropertiesUser: IUser = {
  email: '',
  exp: 0,
  iat: 0,
  nameId: '',
  nbf: 0,
  role: '',
  unique_name: ''
}

export const MinimarketContext = createContext({} as IMinimarketContext)

export const MinimarketProvider = ({ children }: IMinimarketContextProvider) => {

  const [selectedProducts, setSelectProducts] = useState<IProduct[]>([])
  const [user, setUser] = useState<IUser>(initialPropertiesUser)
  const [productWasManipulated, setProductWasManipulated] = useState(false)

  const loadUserLocalStorage = () => {
    if (!ObjectIsEquals(user, initialPropertiesUser)) return
    const userFounded: IUser = JSON.parse(localStorage.getItem('user') as string)
    if (localStorage.getItem('user') !== null) setUser(userFounded)
  }

  const login = async (email: string) => {
    try {

      const token = await getToken(email)

      const claims: IUser = jwtDecode(token)

      setUser(claims)

      localStorage.setItem('user', JSON.stringify(claims))

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const logout = () => {
    setUser(initialPropertiesUser)
    localStorage.clear()
  }

  return <MinimarketContext.Provider value={{
    selectedProducts,
    setSelectProducts,
    login,
    logout,
    user,
    setUser,
    loadUserLocalStorage,
    productWasManipulated,
    setProductWasManipulated
  }}>
    {children}
  </MinimarketContext.Provider>
}
