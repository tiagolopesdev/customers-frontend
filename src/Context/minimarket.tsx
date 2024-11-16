import { ReactNode, createContext, useState } from "react";
import { IProduct } from "../Types/IProduct";
import { getToken } from "../Services/Users";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../Types/IUser";


interface IMinimarketContextProvider {
  children: ReactNode
}

interface IMinimarketContext {
  user: IUser
  selectedProducts: IProduct[];
  setSelectProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  login: (email: string) => Promise<void>,
  logout: () => void
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

  const login = async (email: string) => {
    try {

      const token = await getToken(email)

      const claims: IUser = jwtDecode(token)

      setUser(claims)

      localStorage.setItem('exp', claims.exp.toString())
      localStorage.setItem('nbf', claims.nbf.toString())

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const logout = () => {
    setUser(initialPropertiesUser)
    localStorage.removeItem('exp')
    localStorage.removeItem('nbf')
  }

  return <MinimarketContext.Provider value={{
    selectedProducts,
    setSelectProducts,
    login,
    logout,
    user
  }}>
    {children}
  </MinimarketContext.Provider>
}
