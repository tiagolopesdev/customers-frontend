import { useContext, useEffect, useState } from "react"
import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Chip, TextField } from "@mui/material"
import { QrCodeScannerModal } from "../../Components/Modals/QrCodeScanner"
import { MinimarketContext } from "../../Context/minimarket"
import { Dayjs } from "dayjs"

import { ButtonsActions } from "./buttonsActions"

import { ManagerShowData } from "../../Components/ManagerShowData"
import { IStateShowData } from "../../Types/IStateShowData"

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
  const [openQr, setOpenQr] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    all: true,
    name: '',
    owing: false,
    usersSales: false,
    dateUsersSales: null
  })
  const [state, setState] = useState<IStateShowData>({
    state: ""
  })

  const findCustomers = async () => {
    try {

      setState({ state: "IN_PROGRESS" })

      if (filters.usersSales && filters.dateUsersSales === null) return

      let usersSales = undefined
      if (filters.usersSales) usersSales = user.email

      const result = filters.name === '' ?
        await findCustomersHandler(usersSales, filters.dateUsersSales, filters.owing) :
        await findByNameCustomersHandler(filters.name, usersSales, filters.owing)

      if (result.length === 0) {
        setState({ state: "NOT_FOUND" })
      } else {
        setCustomers(result as ICustomer[])
        setState({ state: "SUCCESS" })
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setState({ state: "ERROR" })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('customerId') !== null) {
      localStorage.removeItem('customerId')
      localStorage.removeItem('amountToPay')
    }
    findCustomers()
  }, [filters.name, filters.dateUsersSales, filters.owing])

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
        label="Pesquise pelo nome do cliente"
        variant="standard"
        sx={{ width: '80dvw' }}
        defaultValue={filters.name}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => {
          setFilters({
            ...filters, name: event.target.value ?? ''
          })
        }}
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
    <ManagerShowData
      data={<CustomerCardList customers={customers} />}
      state={state}
    />
    <ButtonsActions
      openScanner={openQr}
      setOpenScanner={setOpenQr}
    />
    {
      openQr ?
        <QrCodeScannerModal
          open={openQr}
          setOpen={setOpenQr}
        /> : ''
    }
  </div>
}
