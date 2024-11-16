import { validationToken } from "../Utils/validationToken"
import { Navigate } from "react-router-dom"


interface IPrivateRouter {
  permitedElement: JSX.Element
  redirect?: string
}

export const PrivateRouter = ({ permitedElement, redirect }: IPrivateRouter) => {

  const managerAccess = () => {

    const exp = localStorage.getItem('exp')
    const nbf = localStorage.getItem('nbf')
    
    const redirectToSend = redirect && redirect !== '' ?
    `/login?redirect=${redirect}` :
    '/login'

    if (!exp || !nbf) return <Navigate to={redirectToSend} />

    if (!validationToken(Number(nbf), Number(exp))) {
      return <Navigate to={redirectToSend} />
    } else {
      return permitedElement
    }
  }

  return managerAccess()
}
