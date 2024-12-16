import { Button, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { TableComponent } from "../../Table";
import { PaymentsModal } from "../../Modals/Payments";
import { ITableRowProps } from "../../../Types/TableProps";
import { IPayments } from "../../../Types/IPayments";
import { initialStatePayments } from "../../../Types/InitialStatePayments";
import { ICustomer } from "../../../Types/ICustomer";
import { ObjectIsEquals } from "../../../Utils/objectIsEqual";
import dayjs from "dayjs";
import { IBuys } from "../../../Types/IBuys";


interface IPaymentsCard {
  customer: ICustomer
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>
}

export const PaymentsCard = ({ customer, setCustomer }: IPaymentsCard) => {

  const [open, setOpen] = useState(false);
  const [paymentsTotal, setPaymentsTotal] = useState(0)
  const [paymentManipulation, setPaymentManipulation] = useState<IPayments>(initialStatePayments)

  const handleStateModal = () => setOpen(!open)

  const buildPaymentsForRender = (): ITableRowProps[] => {
    const listRow: ITableRowProps[] = []

    if (!customer.payments) return listRow

    customer.payments.map((item: IPayments) => {
      const listToReturn: ITableRowProps = {
        rows: [
          { name: `${item.value}`, align: 'left', style: { width: 50 } },
          { name: `${item.paymentMethod}`, align: 'center', style: { width: 50 } },
          {
            name: `${item.dateCreated !== '' ?
              dayjs(item.dateCreated).format('DD/MM/YYYY HH:MM A') :
              ''
              }`, align: 'center', style: { width: 80 }
          },
        ]
      }
      listRow.push(listToReturn)
    })
    return listRow
  }

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

    buildPaymentsForRender()
    paymentsTotalCalculate()
  }, [customer.payments, paymentManipulation])

  return <>
    <Card sx={{
      minWidth: '35vw',
      maxWidth: '90vw',
      minHeight: '32vh',
      maxHeight: '30vh',
      backgroundColor: "#EFEFEF",
      marginTop: '10px'
    }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: "flex-start",
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
          <Button
            variant="contained"
            color="success"
            onClick={() => { handleStateModal() }}
          >Adicionar</Button>
        </div>
        <TableComponent
          tableCell={[
            { name: 'Valor', align: 'left', style: { width: 50 } },
            { name: 'Forma', align: 'center', style: { width: 50 } },
            { name: 'Data e horário', align: 'center', style: { width: 80 } }
          ]}
          tableRows={buildPaymentsForRender()}
          width={100}
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
