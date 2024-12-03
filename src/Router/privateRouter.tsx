import { useContext, useEffect, useState } from "react"
import { Login } from "../Pages/Login"
import { MinimarketContext } from "../Context/minimarket"


interface IPrivateRouter {
  permitedElement: JSX.Element
  redirect?: string
}

export const PrivateRouter = ({ permitedElement, redirect }: IPrivateRouter) => {

  const { loadUserLocalStorage } = useContext(MinimarketContext)

  const [isValidToken, setIsValidToken] = useState(false)

  const validationToken = (nbf: number, exp: number) => {
    const currentTime = Math.floor(Date.now() / 1000)
    if (currentTime < nbf) setIsValidToken(false)
    if (currentTime > exp) setIsValidToken(false)
    return setIsValidToken(true)
  }

  const managerAccess = () => {

    const userLocalStorage = localStorage.getItem('user')

    console.log('UserLocal: ', userLocalStorage)

    if (userLocalStorage === null) return <Login toRedirect={redirect} />

    const user = JSON.parse(userLocalStorage)

    validationToken(user.nbf, user.exp)

    // console.log('User converted ', user)

    // if (!validationToken(user.nbf, user.exp)) {
    //   console.log('Not validated: ', user)
    //   return <Login toRedirect={redirect} />
    // } else {
    //   console.log('Validated: ', user)
    //   loadUserLocalStorage()
    //   return permitedElement
    // }
  }

  const showElement = () => {    
    if (isValidToken) {
      return <Login toRedirect={redirect} />
    } else {
      loadUserLocalStorage()
      return permitedElement
    }
  }

  useEffect(() => { managerAccess() }, [isValidToken])

  return showElement()
}
