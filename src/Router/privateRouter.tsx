import { useContext } from "react"
import { Login } from "../Pages/Login"
import { validationToken } from "../Utils/validationToken"
import { MinimarketContext } from "../Context/minimarket"


interface IPrivateRouter {
  permitedElement: JSX.Element
  redirect?: string
}

export const PrivateRouter = ({ permitedElement, redirect }: IPrivateRouter) => {

  const { loadUserLocalStorage } = useContext(MinimarketContext)

  const managerAccess = () => {

    const userLocalStorage = localStorage.getItem('user')

    if (userLocalStorage === null) return <Login toRedirect={redirect} />

    const user = JSON.parse(userLocalStorage)

    if (!validationToken(Number(user.nbf), Number(user.exp))) {
      return <Login toRedirect={redirect} />
    } else {
      loadUserLocalStorage()
      return permitedElement
    }
  }

  return managerAccess()
}
