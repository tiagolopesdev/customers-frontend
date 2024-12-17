import { CSSProperties, useContext, useEffect, useState } from "react"
import { ScroolCustom } from "../../Styles"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Skeleton, TextField, TextFieldProps, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { MinimarketContext } from "../../Context/minimarket"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"

interface IFilters {
  all: boolean,
  usersSales: string,
  name: string,
  dateUsersSales: Dayjs | null
}

interface IStateFindData {
  state: 'selectdate' | 'error' | 'search' | ''
}

const stateStyle: CSSProperties = {
  width: '95vw',
  height: '75vh',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const Received = () => {

  const { logout, user } = useContext(MinimarketContext)
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filter, setFilter] = useState('')
  const [state, setState] = useState<IStateFindData>({ state: 'selectdate' })
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

      setState({ state: 'search' })

      const result = filter === '' ?
        await findCustomersHandler(user.email, filters.dateUsersSales) :
        await findByNameCustomersHandler(filter, user.email)

      setCustomers(result as ICustomer[])
      setState({ state: '' })

      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {
      setState({ state: 'error' })
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
          <Typography color="error">{`Valor à pagar R$${item.amountToPay}`}</Typography>
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
                    {`R$ ${buy.value}`}
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
                    label={buy.paymentMethod}
                    color='success'
                    variant='filled'
                  />
                  <Chip
                    sx={{ height: 18, fontWeight: 550, marginTop: '5px' }}
                    label={dayjs(buy.dateCreated).format('DD/MM/YYYY HH:MM A')}
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
    if (state.state === 'selectdate') {
      return <div style={stateStyle}>
        <DatePicker
          inputFormat="DD/MM/YYYY"
          value={filters.dateUsersSales}
          onChange={(newValue: Dayjs | null) => {
            setFilters({ ...filters, dateUsersSales: newValue })
          }}
          renderInput={(params: TextFieldProps) => <TextField
            style={{ width: '200px', marginRight: '10px' }}
            {...params}
            label="Insira a data"
          />
          }
        />
      </div >
    } else if (state.state === 'search') {
      return <div style={{ margin: '10px', height: '100%' }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: '95vw',
            height: '75vh',
            borderRadius: '10px'
          }}
        />
      </div>
    } else if (state.state === 'error') {
      return <div style={stateStyle}>
        <Typography
          sx={{ fontWeight: 550, color: '#7a7a7a' }}
        >Não foi possível obter os dados</Typography>
      </div >
    } else {
      return <ScroolCustom>
        {showCustomers()}
      </ScroolCustom>
    }
  }
  const handleDelete = () => {
    setState({ state: 'selectdate' })
    setFilters({ ...filters, dateUsersSales: null })
  };

  const stylePaymentMethodCard = (): CSSProperties => {
    return {
      backgroundColor: '#eeeeee',
      margin: '18px',
      width: '20vw',
      height: '10vh',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }
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
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
      }}
    >
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
        state.state === '' ?
          <Chip
            sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
            label={`Data: ${dayjs(filters.dateUsersSales).format('DD/MM/YYYY')}`}
            color='info'
            variant='filled'
            onDelete={handleDelete}
          /> :
          ''
      }
    </div>
    <div
      style={{
        backgroundColor: '#FFFFFF',
        margin: '10px',
        borderRadius: '5px',
        height: '15vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={stylePaymentMethodCard()}>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Pix</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {showSumPaymentMethod('PIX').toFixed(2)}
        </Typography>
      </div>
      <div style={stylePaymentMethodCard()}>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Cartão</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {showSumPaymentMethod('CARD').toFixed(2)}
        </Typography>
      </div>
      <div style={stylePaymentMethodCard()}>
        <Typography sx={{ color: '#555555', fontWeight: 550, fontSize: 13 }}>Espécie</Typography>
        <Typography sx={{ color: '#2e7d32', fontWeight: 800, fontSize: 20 }}>
          {showSumPaymentMethod('CASH').toFixed(2)}
        </Typography>
      </div>
    </div>
    {managerShowData()}
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
            to="/"
            style={{
              color: '#ffffff'
            }}
          >Voltar</Link>
        </Button>
        <Button
          style={{ height: '7vh', margin: '0px 5px' }}
          color="error"
          variant="contained"
          onClick={() => { logout() }}
        >Sair</Button>
      </div>
    </div>
  </div>
}
