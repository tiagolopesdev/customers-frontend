import { useContext, useEffect, useState } from "react"
import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Chip, TextField, Typography } from "@mui/material"
import { QrCodeScannerModal } from "../../Components/Modals/QrCodeScanner"
import { MinimarketContext } from "../../Context/minimarket"

import { ButtonsActions } from "./buttonsActions"

import { ManagerShowData } from "../../Components/ManagerShowData"
import { IStateShowData } from "../../Types/IStateShowData"
import { IBaseFilters } from "../../Types/IFilters"

import SearchIcon from '@mui/icons-material/Search';

interface IFilters extends IBaseFilters {
  owing: boolean,
  usersSales: boolean,
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
        height: '16dvh',
        display: 'flex',
        padding: '10px 20px',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', alignItems: "flex-start", flexDirection: 'column' }}>
        <Typography
          color="textSecondary"
          fontSize={18}
          fontWeight={550}
        >Clientes</Typography>
        <Typography
          color="textSecondary"
          fontSize={13}
        >Pesquise abaixo pelo nome dos clientes</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <SearchIcon color="action" />
        <TextField
          id="standard-basic"
          variant="standard"
          sx={{ width: '90dvw' }}
          defaultValue={filters.name}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any) => {
            setFilters({
              ...filters, name: event.target.value ?? ''
            })
          }}
        />
      </div>
      <div
        style={{
          margin: '10px 0px',
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <Chip
          sx={{
            height: 25,
            margin: '0px 5px',
            fontWeight: 550,
          }}
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
