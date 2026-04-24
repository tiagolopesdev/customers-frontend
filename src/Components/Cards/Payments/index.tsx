import { Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { PaymentsModal } from "../../Modals/Payments";
import { IPayments } from "../../../Types/IPayments";
import { initialStatePayments } from "../../../Types/InitialStatePayments";
import { ICustomer } from "../../../Types/ICustomer";
import { ObjectIsEquals } from "../../../Utils/objectIsEqual";
import { IBuys } from "../../../Types/IBuys";
import { showPercentage } from "../../../Utils/percentage/showPercentage";
import formatDate from "../../../Utils/formatDate";
import { ElementButton, ScroolCustom } from "../../../Styles";

import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EmptyData } from "../../ManagerEmptyData";

interface IPaymentsCard {
  customer: ICustomer
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>
}

// TODO: change the local file, to place inside ./pages/customer/componentes 
export const PaymentsCard = ({ customer, setCustomer }: IPaymentsCard) => {

  const [open, setOpen] = useState(false);
  const [paymentsTotal, setPaymentsTotal] = useState(0)
  const [paymentManipulation, setPaymentManipulation] = useState<IPayments>(initialStatePayments)

  const handleStateModal = () => setOpen(!open)

  const paymentsTotalCalculate = () => {
    if (!customer.payments) return 0
    const result = customer.payments.reduce((accumulator, item) => { return accumulator += item.value }, 0)
    setPaymentsTotal(result)
    localStorage.setItem('amountToPay', (customer.amountToPay ?? 0).toString())
  }

  useEffect(() => {

    if (!ObjectIsEquals(paymentManipulation, initialStatePayments)) {
      const buysListToAdd = customer.payments
      buysListToAdd?.push(paymentManipulation)

      const amountPaidUpdated = buysListToAdd?.reduce((accumulator, item) => { return accumulator += item.value }, 0)
      const amountToPayUpdated = ([] as IBuys[]).concat(customer.buys ?? [])?.reduce((accumulator, item) => { return accumulator += (item.price * item.quantity) }, 0) - ([] as IPayments[]).concat(customer.payments ?? [])?.reduce((accumulator, item) => { return accumulator += item.value }, 0)

      setCustomer({
        ...customer,
        ...{
          payments: buysListToAdd,
          amountPaid: amountPaidUpdated,
          amountToPay: amountToPayUpdated
        }
      })
      setPaymentManipulation(initialStatePayments)
      return
    }
    paymentsTotalCalculate()
  }, [customer.payments, paymentManipulation])

  return <>
    <Card sx={{
      width: '95%',
      minHeight: '40vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "#ffffff",
      marginTop: '10px',
      borderRadius: '8px',
      borderTopColor: '#0D6EFD',
      borderTopStyle: 'solid',
      borderTopWidth: '4px'
    }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: "flex-start",
          flex: 1,
          minHeight: 0,
          padding: "8px",
          '&:last-child': {
            paddingBottom: "8px"
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            width: '100%',
            marginBottom: '15px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 650
            }}
          >
            Pagamentos
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 650,
              color: "#64BC6D"
            }}
          >
            {`R$ ${paymentsTotal}`}
          </Typography>
          <ElementButton
            variant="contained"
            onClick={() => { handleStateModal() }}
            style={{ flexDirection: 'row', color: "#FFFFFF", borderRadius: '8px' }}
          >
            <PriceCheckIcon />
          </ElementButton>
        </div>
        <EmptyData
          condition={customer.payments?.length === 0}
          title="Nenhum pagamento realizado."
          subtitle="Registre novos pagamentos."
          dataToShow={
            <ScroolCustom>
              {
                customer.payments?.map((item: IPayments, index: number) => {
                  return <div>
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#F7F8F9',
                        height: '50px',
                        margin: '2px 0px',
                        padding: '5px 15px',
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start'
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 'bold',
                            color: '#4f535f'
                          }}
                        >R$ {item.value.toFixed(2)}</Typography>
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '25px'
                        }}>
                          <Typography
                            style={{
                              color: '#8E959F',
                              fontSize: '9pt'
                            }}
                          >{item.dateCreated !== undefined ? formatDate(item.dateCreated) : ''}</Typography>
                          {showPercentage(false, item.paymentMethod, item.value)}
                        </div>
                      </div>
                      <DeleteOutlineIcon color="error" />
                    </div>
                  </div>
                })
              }
            </ScroolCustom>
          }
        />
      </CardContent>
    </Card>
    {
      open ?
        <PaymentsModal
          open={open}
          setOpen={setOpen}
          paymentProps={paymentManipulation}
          setPaymentProps={setPaymentManipulation}
        /> :
        ''
    }
  </>
}
