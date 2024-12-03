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

    console.log('UserLocal: ', userLocalStorage)

    if (userLocalStorage === null) {
      setIsValid(false)
      return //<Login toRedirect={redirect} />
    }

    const user = JSON.parse(userLocalStorage)

    console.log('User converted ', user)

    if (validationToken(user.nbf, user.exp)) {
      loadUserLocalStorage()
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [loadUserLocalStorage])

  return isValid ? permitedElement : <Login toRedirect={redirect} />

  // const managerAccess = () => {

  //   const userLocalStorage = localStorage.getItem('user')

  //   console.log('UserLocal: ', userLocalStorage)

  //   if (userLocalStorage === null) return <Login toRedirect={redirect} />

  //   const user = JSON.parse(userLocalStorage)

  //   // validationToken(user.nbf, user.exp)

  //   console.log('User converted ', user)

  //   if (!validationToken(user.nbf, user.exp)) {
  //     console.log('Not validated: ', user)
  //     return <Login toRedirect={redirect} />
  //   } else {
  //     console.log('Validated: ', user)
  //     loadUserLocalStorage()
  //     return permitedElement
  //   }
  // }

  // return managerAccess()
}
