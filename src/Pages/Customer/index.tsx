import { TextField } from "@mui/material"
import { Footer } from "../../Components/Footer"
import { Values } from "../../Components/Values"
import { ShoppingCard } from "../../Components/Cards/Shopping"
import { PaymentsCard } from "../../Components/Cards/Payments"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { findByIdCustomersHandler } from "../../Handlers/GetByIdCustomer"
import { ICustomer } from "../../Types/ICustomer"


export const Customer = () => {

  const [paramsUrl] = useSearchParams()
  const [customer, setCustomer] = useState<ICustomer>({
    id: '',
    amountPaid: 0,
    amountToPay: 0,
    name: '',
    buys: [],
    payments: []
  })

  const findCustomer = async () => {

    const customerId = paramsUrl.get('identity') as string

    const result = await findByIdCustomersHandler(customerId) as ICustomer

    setCustomer(result)
  }

  useEffect(() => { findCustomer() }, [])

  console.log('Customer name: ', customer.name)

  return <div
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
        // justifyContent: "space-between",
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
          value={customer.name}
          defaultValue={customer.name}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any) => { setCustomer({...customer, name: event.nativeEvent.data})  }}
        />
        <Values amountPaid={customer.amountPaid} amountToPay={customer.amountToPay} />
      </div>
      <ShoppingCard buys={customer.buys} />
      <PaymentsCard payments={customer.payments}/>
    </div>
    <div
      style={{
        display: "flex",
        flex: 1
      }}
    >
      <Footer isOnlyBack />
    </div>
  </div>
}
