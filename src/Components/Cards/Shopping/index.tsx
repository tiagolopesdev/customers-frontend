import { Button, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { ShoppingModal } from "../../Modals/Shopping";
import { TableComponent } from "../../Table";
import { IBuys } from "../../../Types/IBuys";
import { ITableRowProps } from "../../../Types/TableProps";
import { ICustomer } from "../../../Types/ICustomer";
import { initialStateBuys } from "../../../Types/InitialStateBuys";
import { ObjectIsEquals } from "../../../Utils/objectIsEqual";

interface IShoppingCard {
  customer: ICustomer
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>
}

export const ShoppingCard = ({ customer, setCustomer }: IShoppingCard) => {

  const [open, setOpen] = useState(false);
  const [buysTotal, setBuysTotal] = useState(0)
  const [buyManipulation, setBuyManipulation] = useState<IBuys>(initialStateBuys)

  const handleStateModal = () => setOpen(!open)

  const buildBuysForRender = (): ITableRowProps[] => {
    const listRow: ITableRowProps[] = []

    if (!customer.buys) return listRow

    customer.buys.map((item: IBuys) => {
      const listToReturn: ITableRowProps = {
        rows: [
          { style: { width: '10dvw' }, name: `${item.name}`, align: 'left' },
          { style: { width: '10dvw' }, name: `${item.quantity}`, align: 'center' },
          { style: { width: '10dvw' }, name: `${item.price}`, align: 'center' },
          { style: { width: '10dvw' }, name: `${(item.price * item.quantity).toFixed(2)}`, align: 'center' },
          {
            style: { width: '5px' },
            name: 'jkgjhjgh',
            align: 'center',
            actions: <Button variant="contained"
              onClick={() => {
                if (!customer.buys) return

                const result: IBuys[] = []

                customer.buys.forEach((element) => {
                  if (element.id !== item.id) result.push(element)
                })

                setCustomer({ ...customer, ...{
                  buys: result,
                  amountToPay: result.reduce((accumulate, item) => accumulate += item.total, 0)
                } })
              }}
            >Ex</Button>
          },
        ]
      }
      listRow.push(listToReturn)
    })

    return listRow
  }

  const buysTotalCalculate = () => {
    if (!customer.buys) return 0
    const result = customer.buys.reduce((accumulator, item) => { return accumulator += item.total }, 0)
    setBuysTotal(result)
  }

  useEffect(() => {
    
    if (!ObjectIsEquals(buyManipulation, initialStateBuys)) {
      const buysListToAdd = customer.buys
      buysListToAdd?.push(buyManipulation)
      setCustomer({...customer, buys: buysListToAdd})
      setBuyManipulation(initialStateBuys)
      return
    }

    buildBuysForRender()
    buysTotalCalculate()
  }, [customer.buys, buyManipulation])

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
            Compras
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 650,
              color: "#64BC6D"
            }}
          >
            {`R$ ${buysTotal.toFixed(2)}`}
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => { handleStateModal() }}
          >Adicionar</Button>
        </div>
        <TableComponent
          tableCell={[
            { name: 'Produto', align: 'left' },
            { name: 'Quant.', align: 'center' },
            { name: 'Unitário', align: 'center' },
            { name: 'Total', align: 'center' },
            { name: 'Ações', align: "center" }
          ]}
          tableRows={buildBuysForRender()}
        />
      </CardContent>
    </Card>
    {
      open ?
        <ShoppingModal
          open={open}
          setOpen={setOpen}
          buyProps={buyManipulation}
          setBuyProps={setBuyManipulation}
        /> :
        ''
    }
  </>
}
