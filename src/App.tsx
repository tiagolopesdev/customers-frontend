import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Customer } from './Pages/Customer'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/customer' element={<Customer />}/>
    </Routes>    
  </BrowserRouter>
}

export default App
