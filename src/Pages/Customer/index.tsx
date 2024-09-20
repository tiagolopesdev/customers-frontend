import { Button, TextField } from "@mui/material"
import { Values } from "../../Components/Values"
import { ShoppingCard } from "../../Components/Cards/Shopping"
import { PaymentsCard } from "../../Components/Cards/Payments"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { findByIdCustomersHandler } from "../../Handlers/GetByIdCustomer"
import { ICustomer } from "../../Types/ICustomer"
import { ObjectIsEquals } from "../../Utils/objectIsEqual"
import { initialStateCustomer } from "../../Types/InitialStateCustomer"


export const Customer = () => {

  const [paramsUrl] = useSearchParams()
  const [customer, setCustomer] = useState<ICustomer>(initialStateCustomer)
  const [customerOrigin, setCustomerOrigin] = useState<ICustomer>(initialStateCustomer)
  const [loading, setLoading] = useState(true)

  const findCustomer = async () => {

    const customerId = paramsUrl.get('identity') as string

    let result: ICustomer = initialStateCustomer

    if (customerId) {
      result = await findByIdCustomersHandler(customerId) as ICustomer
    }

    setCustomer(result)
    setCustomerOrigin(structuredClone(result))
    setLoading(!loading)
  }

  useEffect(() => {
    if (loading) findCustomer()
  }, [loading])

  console.log('Custeomr: ', customer)
  console.log('Custeomr origin: ', customerOrigin)

  const showComponent = (): JSX.Element | string => {
    return !loading ? <div
      style={{
        display: 'flex',
        flexDirection: "column",
        height: '100dvh',
        alignItems: "center"
      }}
    >
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(event: any) => { setCustomer({ ...customer, name: event.nativeEvent.data }) }}
          />
          <Values amountPaid={customer.amountPaid} amountToPay={customer.amountToPay} />
        </div>
        <ShoppingCard customer={customer} setCustomer={setCustomer} />
        <PaymentsCard payments={customer.payments} />
      </div>
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
          color="success"
          disabled={ObjectIsEquals(customer, customerOrigin)}
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
    </div> : ''
  }

  useEffect(() => {
    console.log('Esu')
    showComponent()
  }, [customer.buys, customer.payments])

  return showComponent()
}
