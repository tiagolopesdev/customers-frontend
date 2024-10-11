import { useEffect, useState } from "react"
import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { Navbar } from "../../Components/Navbar"
import { ScroolCustom } from "../../Styles"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import QrReader from "../../Components/QrCodeRead/QrReader"
import { QrCodeScannerModal } from "../../Components/Modals/QrCodeScanner"


export const Home = () => {

  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filter, setFilter] = useState('')
  const [openQr, setOpenQr] = useState<boolean>(false);

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
      <div
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: '#1864BA',
          display: "flex",
          padding: '10px',
          width: '100vw',
          justifyContent: "center",
          height: '10dvh',
          flexShrink: 0,
          alignItems: 'center'
        }}
      >
        <Button
          style={{ height: '7vh', margin: '0px 5px' }}
          color="success"
          variant="contained"
        >
          <Link
            to="/customer"
            style={{
              color: '#ffffff'
            }}
          >Adicionar</Link>
        </Button>
        <Button
          style={{ height: '7vh', margin: '0px 5px' }}
          color="primary"
          variant="contained"
          onClick={() => setOpenQr(!openQr)}
        >Scanner</Button>
        {/* <div>
          {openQr ?
            <QrReader /> :
            <Button
              style={{ height: '7vh', margin: '0px 5px' }}
              color="primary"
              variant="contained"
              onClick={() => setOpenQr(!openQr)}
            >Scanner</Button>
          }
        </div> */}
        <Button style={{ height: '7vh', margin: '0px 5px' }} color="info" variant="contained">Exportar</Button>
      </div>
    </div>
    {
      openQr ?
        <QrCodeScannerModal
          open={openQr}
          setOpen={setOpenQr}
        /> : ''
    }
  </div>
}
