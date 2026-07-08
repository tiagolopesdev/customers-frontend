import { useContext, useEffect, useState } from "react"
import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Box, Chip, TextField, Typography } from "@mui/material"
import { QrCodeScannerModal } from "../../Components/Modals/QrCodeScanner"
import { MinimarketContext } from "../../Context/minimarket"

import { ButtonsActions } from "./Components/ButtonsActions"

import { ManagerShowData } from "../../Components/ManagerShowData"
import { IStateShowData } from "../../Types/IStateShowData"
import { IBaseFilters } from "../../Types/IFilters"

import SearchIcon from '@mui/icons-material/Search';
import { defaultPagination, IPagination } from "../../Types/IPagination"
import { fullSize } from "../../Utils/sizesDevices"

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
    <Box
      sx={{
        backgroundColor: '#ffffff',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: {
            xs: "10px 20px",
            sm: "10px 20px",
            md: "10px 60px"
          },
          maxWidth: fullSize,
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
            marginTop: '10px',
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
      </Box>
    </Box>
    <ManagerShowData
      data={<CustomerCardList customers={customers} />}
      state={state}
      pagination={pagination}
      setPagination={setPagination}
    />
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: "#FFFFFF",
      }}
    >
      <ButtonsActions
        openScanner={openQr}
        setOpenScanner={setOpenQr}
      />
    </Box>
    {
      openQr ?
        <QrCodeScannerModal
          open={openQr}
          setOpen={setOpenQr}
        /> : ''
    }
  </div>
}
