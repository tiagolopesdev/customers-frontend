import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Customer } from './Pages/Customer'
import { MinimarketContext, MinimarketProvider } from './Context/minimarket'
import { Login } from './Pages/Login'
import { useContext } from 'react'
import { validationToken } from './Utils/validationToken'

function App() {

  const { loadUserLocalStorage } = useContext(MinimarketContext)

  const managerAccess = (
    permitedElement: JSX.Element,
    redirect?: string
  ) => {

    const userLocalStorage = localStorage.getItem('user')

    console.log('UserLocal: ', userLocalStorage)

    if (userLocalStorage === null) return <Login toRedirect={redirect} />

    const user = JSON.parse(userLocalStorage)

    console.log('User converted ', user)

    if (!validationToken(user.nbf, user.exp)) {
      console.log('Not validated: ', user)
      return <Login toRedirect={redirect} />
    } else {
      console.log('Validated: ', user)
      loadUserLocalStorage()
      return permitedElement
    }
  }

  return <MinimarketProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            managerAccess(<Home />, 'home')
            // <PrivateRouter
            //   permitedElement={<Home />}
            //   redirect='home'
            // />
          }
        />
        <Route
          path='/customer'
          element={
            managerAccess(<Customer />, 'customer')
            // <PrivateRouter
            //   permitedElement={<Customer />}
            //   redirect='customer'
            // />
          }
        />
      </Routes>
    </BrowserRouter>
  </MinimarketProvider>
}

export default App
