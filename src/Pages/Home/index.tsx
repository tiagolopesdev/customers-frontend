import { useEffect, useState } from "react"
import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { Navbar } from "../../Components/Navbar"
import { ScroolCustom } from "../../Styles"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Button, Skeleton } from "@mui/material"
import { Link } from "react-router-dom"
import { QrCodeScannerModal } from "../../Components/Modals/QrCodeScanner"


export const Home = () => {

  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filter, setFilter] = useState('')
  const [openQr, setOpenQr] = useState<boolean>(false);
  const [loading, setLoading] = useState(false)

  const findCustomers = async () => {
    try {

      setLoading(true)

      const result = filter === '' ?
        await findCustomersHandler() :
        await findByNameCustomersHandler(filter)
      setCustomers(result as ICustomer[])
      setLoading(false)

      // eslint-disable-next-line no-empty
    } catch (error) {
      setLoading(false)
    }
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
    {
      loading ?
        <div style={{ margin: '10px', height: '100%' }}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '95vw',
              height: '75vh',
              borderRadius: '10px'
            }}
          />
        </div> :
        <ScroolCustom>
          <CustomerCardList customers={customers} />
        </ScroolCustom>
    }
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
