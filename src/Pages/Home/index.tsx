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
import { defaultPagination, IPagination } from "../../Types/IPagination"

interface IFilters extends IBaseFilters {
  owing: boolean,
  usersSales: boolean,
}

export const Home = () => {

  const { user } = useContext(MinimarketContext)
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [openQr, setOpenQr] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    all: false,
    name: '',
    owing: false,
    usersSales: false,
    dateUsersSales: null
  })
  const [state, setState] = useState<IStateShowData>({
    state: ""
  })
  const [pagination, setPagination] = useState<IPagination<ICustomer>>(defaultPagination)
  const [cleanData, setCleanData] = useState<boolean>(false)

  const findCustomers = async () => {
    try {

      // only show full-page IN_PROGRESS on initial load (pageIndex 0)
      if (pagination.pageIndex === 0) {
        setState({ state: "IN_PROGRESS" })
      }

      if (filters.usersSales && filters.dateUsersSales === null) return

      let usersSales = undefined
      if (filters.usersSales) usersSales = user.email

      const result = filters.name === '' ?
        await findCustomersHandler({
          pagination,
          usersSales,
          dateUsersSales: filters.dateUsersSales,
          owing: filters.owing
        }) :
        await findByNameCustomersHandler({
          pagination,
          name: filters.name,
          usersSales,
          owing: filters.owing
        })

      if (result.data.length === 0) {
        setState({ state: "NOT_FOUND" })
      } else {
        setPagination(result)

        setCustomers(prevCustomers => {
          if (cleanData) {
            return result.data
          } else if (pagination.pageIndex === 1) {
            return result.data
          } else {
            return [...prevCustomers, ...result.data]
          }
        })
        setState({ state: "SUCCESS" })
        setCleanData(false)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setState({ state: "ERROR" })
    }
  }


  const updateFilterInsideUrl = (isAll: boolean) =>
    localStorage.setItem("typeFilterHome", isAll ? "all" : "owing")

  const managerTypeFilter = () => {
    const foundedType = localStorage.getItem("typeFilterHome")

    if (foundedType) {
      switch (foundedType) {
        case "all":
          setFilters({ ...filters, all: true, owing: false })
          break;
        case "owing":
          setFilters({ ...filters, owing: true, all: false })
          break;
      }
    } else {
      updateFilterInsideUrl(true)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('customerId') !== null) {
      localStorage.removeItem('customerId')
      localStorage.removeItem('amountToPay')
    }
    console.log('inside useEffect')
    managerTypeFilter()

    findCustomers()
  }, [filters.name, pagination.pageIndex])

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
            setCleanData(true)
            setPagination({ ...defaultPagination, pageIndex: 0 })
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
            border: !filters.all ? "1px solid #cdced1" : "none",
            backgroundColor: !filters.all ? "#E9EBEF" : "#0288D1"
          }}
          label="Todos"
          color={filters.all ? 'info' : 'default'}
          variant={filters.all ? 'filled' : 'outlined'}
          onClick={() => {
            setFilters({
              ...filters, ...{
                owing: false,
                usersSales: false,
                all: true
              }
            })
            setCleanData(true)
            setPagination({ ...defaultPagination, pageIndex: 0 })
            updateFilterInsideUrl(true)
          }}
        />
        <Chip
          sx={{
            height: 25,
            margin: '0px 5px',
            fontWeight: 550,
            border: !filters.owing ? "1px solid #cdced1" : "none",
            backgroundColor: !filters.owing ? "#E9EBEF" : "#0288D1"
          }}
          label="Veacos"
          color={filters.owing ? 'info' : 'default'}
          variant={filters.owing ? 'filled' : 'outlined'}
          onClick={() => {
            setFilters({
              ...filters, ...{
                owing: true,
                usersSales: false,
                all: false
              }
            })
            setCleanData(true)
            setPagination({ ...defaultPagination, pageIndex: 0 })
            updateFilterInsideUrl(false)
          }}
        />
      </div>
    </div>
    <ManagerShowData
      data={<CustomerCardList customers={customers} />}
      state={state}
      pagination={pagination}
      setPagination={setPagination}
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
