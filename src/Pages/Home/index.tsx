import { useContext, useEffect, useState } from "react"
import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { ScroolCustom } from "../../Styles"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Chip, Skeleton, TextField } from "@mui/material"
import { QrCodeScannerModal } from "../../Components/Modals/QrCodeScanner"
import { MinimarketContext } from "../../Context/minimarket"
import { Dayjs } from "dayjs"

import { ButtonsActions } from "./buttonsActions"

interface IFilters {
  all: boolean,
  owing: boolean,
  usersSales: boolean,
  name: string,
  dateUsersSales: Dayjs | null
}

export const Home = () => {

  const { user } = useContext(MinimarketContext)
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filter, setFilter] = useState('')
  const [openQr, setOpenQr] = useState<boolean>(false);
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<IFilters>({
    all: true,
    name: '',
    owing: false,
    usersSales: false,
    dateUsersSales: null
  })

  const findCustomers = async () => {
    try {

      setLoading(true)

      if (filters.usersSales && filters.dateUsersSales === null) return

      let usersSales = undefined
      if (filters.usersSales) usersSales = user.email

      const result = filter === '' ?
        await findCustomersHandler(usersSales, filters.dateUsersSales, filters.owing) :
        await findByNameCustomersHandler(filter, usersSales, filters.owing)

      setCustomers(result as ICustomer[])
      setLoading(false)

      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('customerId') !== null) {
      localStorage.removeItem('customerId')
      localStorage.removeItem('amountToPay')
    }
    findCustomers()
  }, [filter, filters.dateUsersSales, filters.owing])

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
        height: '15dvh',
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
          label="Todos"
          color={filters.all ? 'info' : 'default'}
          variant={filters.all ? 'filled' : 'outlined'}
          onClick={() => {
            setFilters({
              ...filters, ...{
                owing: false,
                usersSales: false,
                all: !filters.all
              }
            })
          }}
        />
        <Chip
          sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
          label="Veacos"
          color={filters.owing ? 'info' : 'default'}
          variant={filters.owing ? 'filled' : 'outlined'}
          onClick={() => {
            setFilters({
              ...filters, ...{
                owing: !filters.owing,
                usersSales: false,
                all: false
              }
            })
          }}
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
        flex: 1,
      }}
    >
      <ButtonsActions
        openScanner={openQr}
        setOpenScanner={setOpenQr}
      />
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
