import { useContext, useEffect, useState } from "react"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Box, Chip, Link, TextField, TextFieldProps, Typography } from "@mui/material"
import { MinimarketContext } from "../../Context/minimarket"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import { ManagerShowData } from "../../Components/ManagerShowData"
import { IStateShowData } from "../../Types/IStateShowData"
import { FiltersContainer, ReceivedContainer, SelectDateContainer } from "./style"
import { IBaseFilters } from "../../Types/IFilters"
import { ElementLink, GroupButtonsActions } from "../../Styles"

import { defaultPagination } from "../../Types/IPagination"
import { fullSize } from "../../Utils/sizesDevices"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ListContainer from "../../Components/ListContainer"
import CustomerReceivedDetails from "./Components/CustomerReceivedDetails"
import PaymentMethods from "./Components/PaymentMethods"
import { Values } from "../../Components/Values"

interface IFilters extends IBaseFilters {
  usersSales: string,
}

export const Received = () => {

  const { user } = useContext(MinimarketContext)
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filter, setFilter] = useState('')
  const [state, setState] = useState<IStateShowData>({ state: '' })
  const [filters, setFilters] = useState<IFilters>({
    all: true,
    name: '',
    usersSales: '',
    dateUsersSales: null
  })
  const [expanded, setExpanded] = useState<string>();


  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : undefined);
    };

  const findCustomers = async () => {
    try {

      if (filters.dateUsersSales === null) return

      setState({ state: 'IN_PROGRESS' })

      const result = filter === '' ?
        await findCustomersHandler({
          pagination: defaultPagination,
          usersSales: user.email,
          dateUsersSales: filters.dateUsersSales
        }) :
        await findByNameCustomersHandler({
          pagination: defaultPagination,
          usersSales: user.email,
          name: filter
        })

      setCustomers(result.data as ICustomer[])
      if (result.data.length === 0) {
        setState({ state: 'NOT_FOUND' })
      } else {
        setState({ state: 'SUCCESS' })
      }

      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {
      setState({ state: 'ERROR' })
    }
  }

  useEffect(() => {
    findCustomers()
  }, [filters.dateUsersSales])

  const managerShowData = () => {
    return state.state === '' ?
      <Box sx={SelectDateContainer}>
        <DatePicker
          inputFormat="DD/MM/YYYY"
          value={filters.dateUsersSales}
          onChange={(newValue: Dayjs | null) => {
            setFilters({ ...filters, dateUsersSales: newValue?.toISOString() })
          }}
          renderInput={(params: TextFieldProps) => <TextField
            style={{ width: '200px', marginRight: '10px' }}
            {...params}
            label="Insira a data"
          />
          }
        />
      </Box> :
      <ManagerShowData
        data={
          <ListContainer
            componentToShow={
              ({ item }: { item: ICustomer }) =>
                <CustomerReceivedDetails
                  expanded={expanded}
                  item={item}
                  onChange={handleChange}
                />
            }
            elements={customers}
          />
        }
        state={state}
      />
  }

  const amount = {
    amountPaid: customers.reduce((accumulator, item) => { return accumulator + (item.amountPaid || 0) }, 0),
    amountToPay: customers.reduce((accumulator, item) => { return accumulator + (item.amountToPay || 0) }, 0)
  }

  return <Box sx={ReceivedContainer}>
    <Box sx={FiltersContainer}>
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
          >Prestação de contas</Typography>
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
            defaultValue={filter}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(event: any) => { setFilter(event.target.value ?? '') }}
          />
        </div>
        {
          state.state === 'SUCCESS' || state.state === 'NOT_FOUND' ?
            <Chip
              sx={{
                width: "100%",
                maxWidth: "180px",
                height: 25,
                margin: '10px 5px',
                fontWeight: 550
              }}
              label={`Data: ${dayjs(filters.dateUsersSales?.toString()).format('DD/MM/YYYY')}`}
              color='info'
              variant='filled'
              onDelete={() => {
                setState({ state: '' })
                setFilters({ ...filters, dateUsersSales: null })
                setCustomers([])
              }}
            /> :
            ''
        }
      </Box>
    </Box>
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <PaymentMethods customers={customers} />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: fullSize,
          boxSizing: 'border-box',
          px: {
            xs: "10px",
            sm: "10px",
            md: "0px"
          },
        }}
      >
        <Values amountPaid={amount.amountPaid} amountToPay={amount.amountToPay} />
      </Box>
    </Box>
    {managerShowData()}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box sx={GroupButtonsActions}>
        <Link
          href="/"
          sx={ElementLink}
        >
          <ArrowBackIcon />
          Voltar
        </Link>
      </Box>
    </Box>
  </Box>
}
