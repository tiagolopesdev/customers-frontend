import { useEffect, useState } from "react"
import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { Footer } from "../../Components/Footer"
import { Navbar } from "../../Components/Navbar"
import { ScroolCustom } from "../../Styles"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"


export const Home = () => {

  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filter, setFilter] = useState('')

  const findCustomers = async () => {
    console.log('Value: ', filter)
    const result = filter === '' ?
      await findCustomersHandler() :
      await findByNameCustomersHandler(filter)
    setCustomers(result as ICustomer[])
  }

  useEffect(() => { findCustomers() }, [filter])

  return <div
    style={{
      display: 'flex',
      flexDirection: "column",
      height: '100dvh',
    }}
  >
    <Navbar
      filter={filter}
      setFilter={setFilter}
    />
    <ScroolCustom>
      <CustomerCardList customers={customers} />
    </ScroolCustom>
    <div
      style={{
        display: "flex",
        flex: 1
      }}
    >
      <Footer />
    </div>
  </div>
}
