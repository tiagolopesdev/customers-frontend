import { Button, Skeleton, TextField } from "@mui/material"
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


export const Customer = () => {

  const navigate = useNavigate()
  const [customer, setCustomer] = useState<ICustomer>(initialStateCustomer)
  const [customerOrigin, setCustomerOrigin] = useState<ICustomer>(initialStateCustomer)
  const [loading, setLoading] = useState(true)

  const findCustomer = async () => {

    /*

    Possível erro do 404: const customerId = paramsUrl.get('identity') as string
      - Avaliar possibilidade de colocar no localStorage ou no Context da aplicação
    
      */
    // const customerId = paramsUrl.get('identity') as string

    const customerId = localStorage.getItem('customerId')

    let result: ICustomer = initialStateCustomer

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
          <Values amountPaid={customer.amountPaid ?? 0} amountToPay={customer.amountToPay as number} />
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

  useEffect(() => { showComponent() }, [customer.buys, customer.payments])

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
        onClick={async () => {
          if (customer.id) {
            await updateCustomerHandler(customer)
            // setLoading(true)
          } else {
            await createCustomerHandler(customer)
            // window.location.assign(`${window.location.protocol}//${window.location.host}/customer`)
          }
          setLoading(true)
        }}
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
  </div>
}
