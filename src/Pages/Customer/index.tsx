import { Alert, Button, Skeleton, Snackbar, SnackbarCloseReason, TextField } from "@mui/material"
import { Values } from "../../Components/Values"
import { ShoppingCard } from "../../Components/Cards/Shopping"
import { PaymentsCard } from "../../Components/Cards/Payments"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { findByIdCustomersHandler } from "../../Handlers/GetByIdCustomer"
import { ICustomer } from "../../Types/ICustomer"
import { ObjectIsEquals } from "../../Utils/objectIsEqual"
import { initialStateCustomer } from "../../Types/InitialStateCustomer"
import { createCustomerHandler } from "../../Handlers/CreateCustomer"
import { updateCustomerHandler } from "../../Handlers/UpdateCustomer"
import { IMessageFeedback } from "../../Types/IMessageFeedback"


export const Customer = () => {

  const navigate = useNavigate()
  const [customer, setCustomer] = useState<ICustomer>(initialStateCustomer)
  const [customerOrigin, setCustomerOrigin] = useState<ICustomer>(initialStateCustomer)
  const [loading, setLoading] = useState(true)
  const [openFeedback, setOpenFeedback] = useState(false);
  const [message, setMessage] = useState<IMessageFeedback>({
    message: '',
    type: "success"
  })

  const findCustomer = async () => {

    const customerId = localStorage.getItem('customerId')

    let result: ICustomer = {
      id: '',
      amountPaid: 0,
      amountToPay: 0,
      name: '',
      buys: [],
      payments: []
    }

    if (customerId) {
      result = await findByIdCustomersHandler(customerId) as ICustomer
      result.buys?.forEach((item) => { item.isEnable = false })
    }

    setCustomer(result)
    setCustomerOrigin(structuredClone(result))
    setLoading(false)
  }

  useEffect(() => {
    if (loading) findCustomer()
  }, [loading])

  const showComponent = (): JSX.Element | string => {
    localStorage.setItem('amountToPay', (customer.amountToPay ?? 0).toString())
    return !loading ?
      <div
        style={{
          backgroundColor: '#ffffff',
          maxWidth: '95vw',
          minWidth: '45vw',
          height: '90dvh',
          display: 'flex',
          flexDirection: "column",
          padding: '25px',
        }}
      >
        <div>
          <TextField
            id="standard-basic"
            variant="standard"
            style={{
              width: '100%',
              marginBottom: '20px'
            }}
            defaultValue={customer.name}
            label="Nome do cliente"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(event: any) => { setCustomer({ ...customer, name: event.target.value }) }}
          />
          <Values amountPaid={customer.amountPaid ?? 0} amountToPay={customer.amountToPay ?? 0} />
        </div>
        <ShoppingCard customer={customer} setCustomer={setCustomer} />
        <PaymentsCard customer={customer} setCustomer={setCustomer} />
      </div> :
      <div style={{ padding: '20px' }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: '95vw',
            height: '84dvh',
            borderRadius: '10px',
          }}
        />
      </div>
  }

  useEffect(() => { showComponent() }, [customer.buys, customer.payments, customer.amountToPay])

  const saveChanges = async () => {
    try {
      if (customer.id) {
        await updateCustomerHandler(customer)
      } else {
        const customerId = await createCustomerHandler(customer)
        localStorage.setItem('customerId', customerId as string)
      }
      setLoading(true)
    } catch (error) {
      setMessage({
        message: error as string,
        type: "warning"
      })
      setOpenFeedback(true);
      console.log('Error ', error)
    }
  }

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFeedback(false);
  };

  return <div
    style={{
      display: 'flex',
      flexDirection: "column",
      height: '100dvh',
      alignItems: "center"
    }}
  >
    {showComponent()}
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
        color="info"
        variant="contained"
        onClick={() => {
          setCustomer(initialStateCustomer)
          navigate("/")
        }}
      >
        Voltar
      </Button>
      <Button
        style={{ height: '7vh', margin: '0px 5px' }}
        color="success"
        disabled={ObjectIsEquals(customer, customerOrigin)}
        onClick={async () => { saveChanges() }}
        variant="contained"
      >Salvar</Button>
      <Button
        style={{ height: '7vh', margin: '0px 5px' }}
        color="warning"
        variant="contained"
        disabled={ObjectIsEquals(customer, customerOrigin)}
        onClick={() => { setLoading(true) }}
      >Reverter</Button>
    </div>
    <Snackbar
      open={openFeedback}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Alert
        onClose={handleClose}
        severity={message.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message.message}
      </Alert>
    </Snackbar>
  </div>
}
