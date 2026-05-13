import { useContext, useEffect, useState } from "react"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Accordion, AccordionDetails, AccordionSummary, Chip, TextField, TextFieldProps, Typography } from "@mui/material"
import { MinimarketContext } from "../../Context/minimarket"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import { showPercentage } from "../../Utils/percentage/showPercentage"
import { ManagerShowData } from "../../Components/ManagerShowData"
import { IStateShowData } from "../../Types/IStateShowData"
import { FiltersContainer, PaymentMethodsContainer, PaymentMethodsType, ReceivedContainer, SelectDateContainer } from "./style"
import { enviroments } from "../../config/enviroments"
import formatDate from "../../Utils/formatDate"
import { IBaseFilters } from "../../Types/IFilters"
import { ElementLink, GroupButtonsActions } from "../../Styles"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { defaultPagination } from "../../Types/IPagination"

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
  const [expanded, setExpanded] = useState<string | false>(false);


  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const findCustomers = async () => {
    try {

      if (filters.dateUsersSales === null) return

      setState({ state: 'IN_PROGRESS' })

      //TODO: adjustment and implement pagination logic
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
        // await findCustomersHandler(user.email, filters.dateUsersSales) :
        // await findByNameCustomersHandler(filter, user.email)

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

  const showCustomers = () => {
    return customers.map((item) => {
      return <Accordion expanded={expanded === `${item.id}`} onChange={handleChange(`${item.id}`)}>
        <AccordionSummary
          id="panel1bh-header"
          sx={{
            '.MuiAccordionSummary-content': {
              display: 'flex',
              justifyContent: 'space-between',
            }
          }}
        >
          <Typography sx={{
            flexShrink: 0,
            fontWeight: 550,
            fontSize: 19,
          }}
            color="textPrimary"
          >
            {item.name}
          </Typography>
          <Typography color="error">{`Valor à pagar R$${item.amountToPay !== undefined ? item.amountToPay.toFixed(2) : 0}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            item.payments?.map((buy) => {
              return <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: 5,
                backgroundColor: '#eeeeee',
                padding: '5px',
                borderRadius: '5px'
              }}>
                <div style={{ display: 'flex' }}>
                  <Typography sx={{
                    fontSize: 18,
                    fontWeight: 550
                  }}
                    color="success"
                  >
                    {`R$ ${showPercentage(true, buy.paymentMethod, buy.value)}`}
                  </Typography>
                  <Chip
                    sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
                    label={buy.updatedBy}
                    color='default'
                    variant='filled'
                  />
                </div>
                <div style={{ display: 'flex', marginLeft: '15px' }}>
                  <Chip
                    sx={{ height: 18, fontWeight: 550, marginTop: '5px', marginRight: '10px' }}
                    label={showPercentage(false, buy.paymentMethod, buy.value)}
                    color='success'
                    variant='filled'
                  />
                  <Chip
                    sx={{ height: 18, fontWeight: 550, marginTop: '5px' }}
                    label={formatDate(buy.dateCreated as string)}
                    color='info'
                    variant='outlined'
                  />
                </div>
              </div>
            })
          }
        </AccordionDetails>
      </Accordion>
    })
  }

  const managerShowData = () => {
    return state.state === '' ?
      <SelectDateContainer>
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
      </SelectDateContainer> :
      <ManagerShowData
        data={<div>{showCustomers()}</div>}
        state={state}
      />
  }

  const showSumPaymentMethod = (paymentMethodFilter: string) => {
    let pixMethodSum = 0
    customers.forEach((customer) => {
      const sumValue = customer.payments?.filter((filter) => {
        return filter.paymentMethod === paymentMethodFilter && filter.updatedBy === user.email
      }).reduce((accumulator, item) => {
        return accumulator += item.value
      }, 0)
      pixMethodSum += sumValue ?? 0
    })
    return pixMethodSum
  }

  return <ReceivedContainer>
    <FiltersContainer>
      <TextField
        id="standard-basic"
        label="Pesquise pelo nome do cliente"
        variant="standard"
        sx={{ width: '80dvw' }}
        defaultValue={filter}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => { setFilter(event.target.value ?? '') }}
      />
      {
        state.state === 'SUCCESS' || state.state === 'NOT_FOUND' ?
          <Chip
            sx={{ height: 25, margin: '10px 5px', fontWeight: 550 }}
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
    </FiltersContainer>
    <PaymentMethodsContainer>
      <PaymentMethodsType>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Pix</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {showSumPaymentMethod('PIX').toFixed(2)}
        </Typography>
      </PaymentMethodsType>
      <PaymentMethodsType>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Cartão</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {
            `${showSumPaymentMethod('CARD')} (${(showSumPaymentMethod('CARD') + (showSumPaymentMethod('CARD') * (Number(enviroments.PERCENTAGE_CARD) / 100))).toFixed(2)})`
          }
        </Typography>
      </PaymentMethodsType>
      <PaymentMethodsType>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Espécie</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {showSumPaymentMethod('CASH').toFixed(2)}
        </Typography>
      </PaymentMethodsType>
    </PaymentMethodsContainer>
    {managerShowData()}
    <div
      style={{
        display: "flex",
        flex: 1
      }}
    >
      <GroupButtonsActions>
        <ElementLink
          to="/"
        >
          <ArrowBackIcon />
          Voltar
        </ElementLink>
      </GroupButtonsActions>
    </div>
  </ReceivedContainer>
}
