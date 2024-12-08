import { useContext, useEffect, useState } from "react"
import { ScroolCustom } from "../../Styles"
import { ICustomer } from "../../Types/ICustomer"
import { findCustomersHandler } from "../../Handlers/GetAllCustomers"
import { findByNameCustomersHandler } from "../../Handlers/GetByNameCustomers"
import { Accordion, AccordionDetails, AccordionSummary, Button, Skeleton, TextField, TextFieldProps, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { MinimarketContext } from "../../Context/minimarket"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Dayjs } from "dayjs"

interface IFilters {
  all: boolean,
  usersSales: string,
  name: string,
  dateUsersSales: Dayjs | null
}

export const Received = () => {

  const { logout, user } = useContext(MinimarketContext)
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
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

      setLoading(true)

      if (filters.dateUsersSales === null) return

      const result = filter === '' ?
        await findCustomersHandler(user.email, filters.dateUsersSales) :
        await findByNameCustomersHandler(filter, user.email)

      setCustomers(result as ICustomer[])
      setLoading(false)

      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    // if (localStorage.getItem('customerId') !== null) localStorage.removeItem('customerId')
    findCustomers()
  }, [filters.dateUsersSales])

  console.log('Filters ', filters)

  const showCustomers = () => {
    return customers.map((item) => {
      return <Accordion expanded={expanded === `${item.id}`} onChange={handleChange(`${item.id}`)}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {item.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{item.amountToPay}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            item.payments?.map((buy) => {
              return <Typography>
                {`Valor de R$ ${buy.value}, debitado por ${buy.updatedBy}`}
              </Typography>
            })
          }
        </AccordionDetails>
      </Accordion>
    })
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
      <DatePicker
        inputFormat="DD/MM/YYYY"
        value={filters.dateUsersSales}
        onChange={(newValue: Dayjs | null) => {
          setFilters({ ...filters, dateUsersSales: newValue })
        }}
        renderInput={(params: TextFieldProps) => <TextField
          style={{ width: '200px', marginRight: '10px' }}
          {...params}
          onClick={() => { console.log('Clicked ok') }}
        />
        }
      />
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
          {showCustomers()}
          {/* <CustomerCardList customers={customers} /> */}
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
