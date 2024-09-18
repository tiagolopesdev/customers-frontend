import { Button, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { TableComponent } from "../../Table";
import { PaymentsModal } from "../../Modals/Payments";
import { ITableRowProps } from "../../../Types/TableProps";
import { IPayments } from "../../../Types/IPayments";


interface IPaymentsCard {
  payments?: IPayments[]
}

export const PaymentsCard = ({ payments }: IPaymentsCard) => {

  const [open, setOpen] = useState(false);
  const [paymentsTotal, setPaymentsTotal] = useState(0)

  const handleStateModal = () => setOpen(!open)

  const buildPaymentsForRender = (): ITableRowProps[] => {
    const listRow: ITableRowProps[] = []

    if (!payments) return listRow
    
    payments.map((item: IPayments) => {
      const listToReturn: ITableRowProps = {
        rows: [
          { name: `${item.value}`, align: 'left' },
          { name: '00/00/0000', align: 'center' },
        ]
      }
      listRow.push(listToReturn)
    })    
    return listRow
  }

  const paymentsTotalCalculate = () => {
    if (!payments) return 0
    const result = payments.reduce((accumulator, item) => { return accumulator += item.value }, 0)
    setPaymentsTotal(result)
  }

  useEffect(() => { 
    buildPaymentsForRender() 
    paymentsTotalCalculate()
  }, [])

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
            { name: 'Valor', align: 'left' },
            { name: 'Data e horário', align: 'center' }
          ]}
          tableRows={buildPaymentsForRender()}
        />
      </CardContent>
    </Card>
    {
      open ?
        <PaymentsModal
          open={open}
          setOpen={setOpen}
        /> :
        ''
    }
  </>
}
