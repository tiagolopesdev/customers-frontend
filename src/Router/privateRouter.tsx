import { useContext, useEffect, useState } from "react"
import { Login } from "../Pages/Login"
import { MinimarketContext } from "../Context/minimarket"


interface IPrivateRouter {
  permitedElement: JSX.Element
  redirect?: string
}

export const PrivateRouter = ({ permitedElement, redirect }: IPrivateRouter) => {

  const { loadUserLocalStorage } = useContext(MinimarketContext)

  const [isValid, setIsValid] = useState(false)

  const validationToken = (nbf: number, exp: number) => {
    const currentTime = Math.floor(Date.now() / 1000)
    return currentTime >= nbf && currentTime <= exp;
  }

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user')

    if (userLocalStorage === null) {
      setIsValid(false)
      return
    }

    const user = JSON.parse(userLocalStorage)

    if (validationToken(user.nbf, user.exp)) {
      loadUserLocalStorage()
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [loadUserLocalStorage])

  return isValid ? permitedElement : <Login toRedirect={redirect} />
}
