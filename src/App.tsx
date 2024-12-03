import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Customer } from './Pages/Customer'
import { MinimarketProvider } from './Context/minimarket'
import { Login } from './Pages/Login'
import { PrivateRouter } from './Router/privateRouter'

function App() {

  return <MinimarketProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <PrivateRouter
              permitedElement={<Home />}
              redirect='home'
            />
          }
        />
        <Route
          path='/customer'
          element={
            <PrivateRouter
              permitedElement={<Customer />}
              redirect='customer'
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </MinimarketProvider>
}

export default App
