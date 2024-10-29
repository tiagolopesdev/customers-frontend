import { ReactNode, createContext, useState } from "react";

interface IUserContextProvider {
  children: ReactNode
}

interface IUserContext {
  permissionAccess: boolean
}

export const UserContext = createContext<IUserContext>({ permissionAccess: false })

export const AuthProvider = ({ children }: IUserContextProvider) => {

  const [permissionAccess, setPermissionAccess] = useState(false)

  return (
    <UserContext.Provider value={{ permissionAccess }}>
      {children}
    </UserContext.Provider>
  )

  // return (
  //   <UserContext.Provider value={{ permissionAccess }}>{children}</AuthContext.Provider>
  // )
}
