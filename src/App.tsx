import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Customer } from './Pages/Customer'
import { MinimarketProvider } from './Context/minimarket'
import { Login } from './Pages/Login'
import { PrivateRouter } from './Router/privateRouter'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Received } from './Pages/Received'

function App() {

  return <MinimarketProvider>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
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
          <Route
            path='/received'
            element={
              <PrivateRouter
                permitedElement={<Received />}
                redirect='received'
              />
            }
          />
        </Routes>
      </LocalizationProvider>
    </BrowserRouter>
  </MinimarketProvider>
}

export default App
