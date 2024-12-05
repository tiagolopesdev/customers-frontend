import { useContext, useEffect, useState } from "react"
import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { ScroolCustom } from "../../Styles"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Button, Chip, Skeleton, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import { QrCodeScannerModal } from "../../Components/Modals/QrCodeScanner"
import { MinimarketContext } from "../../Context/minimarket"

interface IFilters {
  owing: boolean,
  usersSales: boolean,
  name: string
}

export const Home = () => {

  const { logout, user } = useContext(MinimarketContext)
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filter, setFilter] = useState('')
  const [openQr, setOpenQr] = useState<boolean>(false);
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<IFilters>({
    name: '',
    owing: false,
    usersSales: false
  })

  const findCustomers = async () => {
    try {

      setLoading(true)

      let usersSales = undefined
      if (filters.usersSales) usersSales = user.email

      const result = filter === '' ?
        await findCustomersHandler(usersSales, filters.owing) :
        await findByNameCustomersHandler(filter)
      setCustomers(result as ICustomer[])
      setLoading(false)

      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    localStorage.removeItem('customerId')
    findCustomers()
  }, [filter, filters.usersSales, filters.owing])

  return <div
    style={{
      display: 'flex',
      flexDirection: "column",
      height: '100dvh',
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        height: '10dvh',
        display: 'flex',
        padding: '10px',
        flexDirection: 'column'
      }}
    >
      <TextField
        id="standard-basic"
        label="Pesquise pelo nome do comprador"
        variant="standard"
        sx={{ width: '80dvw' }}
        defaultValue={filter}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => { setFilter(event.target.value ?? '') }}
      />
      <div
        style={{
          margin: '10px',
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <Chip
          sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
          label="Veacos"
          color={filters.owing ? 'info' : 'default'}
          variant={filters.owing ? 'filled' : 'outlined'}
          onClick={() => { setFilters({ ...filters, owing: !filters.owing }) }}
        />
        <Chip
          sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
          label="Minhas vendas"
          color={filters.usersSales ? 'info' : 'default'}
          variant={filters.usersSales ? 'filled' : 'outlined'}
          onClick={() => { setFilters({ ...filters, usersSales: !filters.usersSales }) }}
        />
      </div>
    </div>
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
        <Button
          style={{ height: '7vh', margin: '0px 5px' }}
          color="error"
          variant="contained"
          onClick={() => { logout() }}
        >Sair</Button>
        {/* <Button style={{ height: '7vh', margin: '0px 5px' }} color="info" variant="contained">Exportar</Button> */}
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
