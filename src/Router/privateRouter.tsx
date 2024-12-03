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

    console.log('UserLocal: ', userLocalStorage)
    
    if (userLocalStorage === null) return <Login toRedirect={redirect} />
    
    const user = JSON.parse(userLocalStorage)

    console.log('User converted ', user)
    
    if (validationToken(user.nbf, user.exp)) {
      console.log('Not validated: ', user)
      return <Login toRedirect={redirect} />
    } else {
      console.log('Validated: ', user)
      loadUserLocalStorage()
      return permitedElement
    }
  }

  return managerAccess()
}
