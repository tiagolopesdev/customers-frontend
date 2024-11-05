import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Customer } from './Pages/Customer'
import { MinimarketProvider } from './Context/minimarket'

function App() {

  return <MinimarketProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/customer' element={<Customer />} />
      </Routes>
    </BrowserRouter>
  </MinimarketProvider>
}

export default App
