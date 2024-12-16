import { Button, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { ShoppingModal } from "../../Modals/Shopping";
import { TableComponent } from "../../Table";
import { IBuys } from "../../../Types/IBuys";
import { ITableRowProps } from "../../../Types/TableProps";
import { ICustomer } from "../../../Types/ICustomer";
import DeleteIcon from '@mui/icons-material/Delete';

interface IShoppingCard {
  customer: ICustomer
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>
}

export const ShoppingCard = ({ customer, setCustomer }: IShoppingCard) => {

  const [open, setOpen] = useState(false);
  const [buysTotal, setBuysTotal] = useState(0)
  const [buyManipulation, setBuyManipulation] = useState<IBuys[]>([])

  const handleStateModal = () => setOpen(!open)

  const buildBuysForRender = (): ITableRowProps[] => {
    const listRow: ITableRowProps[] = []

    if (!customer.buys) return listRow

    customer.buys.map((item: IBuys) => {
      if (item.isEnable) return
      const listToReturn: ITableRowProps = {
        rows: [
          { style: { width: '12dvw' }, name: `${item.name}`, align: 'left', useTooltip: true },
          { style: { width: '10dvw' }, name: `${item.quantity}`, align: 'center' },
          { style: { width: '10dvw' }, name: `${item.price}`, align: 'center' },
          { style: { width: '10dvw' }, name: `${(item.price * item.quantity).toFixed(2)}`, align: 'center' },
          {
            style: { width: '5px' },
            name: 'jkgjhjgh',
            align: 'center',
            actions: <Button
              variant="contained"
              sx={{ padding: 0.4, margin: 0 }}
              onClick={() => {
                if (!customer.buys) return

                const result: IBuys[] = structuredClone(customer.buys)

                result.forEach((buySearch: IBuys) => {
                  if (item.id === undefined) {
                    if (item.name === buySearch.name) buySearch.isEnable = true
                  } else {
                    if (item.id === buySearch.id) buySearch.isEnable = true
                  }
                })

                setCustomer({
                  ...customer, ...{
                    buys: result,
                    amountToPay: result.filter((item) => { return !item.isEnable }).reduce((accumulate, item) => accumulate += (item.total ?? 0), 0)
                  }
                })
              }}
            ><DeleteIcon sx={{ width: 20 }} /></Button>
          },
        ]
      }
      listRow.push(listToReturn)
    })

    return listRow
  }

  const buysTotalCalculate = () => {
    if (customer.buys === undefined) return 0
    const result = customer.buys.filter((item) => { return !item.isEnable }).reduce((accumulator, item) => { return accumulator += (item.price * item.quantity) }, 0)
    setBuysTotal(result)
  }

  useEffect(() => {

    if (buyManipulation.length > 0) {

      const buysToInsert: IBuys[] = customer.buys ?? []

      buyManipulation.forEach((item) => {

        const buyNotAdd = buysToInsert.findIndex((buy: IBuys) => {
          return buy.name === item.name && !buy.id
        })

        if (buyNotAdd > 0) {
          buysToInsert.splice(buyNotAdd, 1, item)
        } else {
          buysToInsert.push(item)
        }
      })

      setCustomer({
        ...customer,
        ...{
          buys: buysToInsert,
          amountToPay: Number(
            (
              buysToInsert
                .filter((item) => { return !item.isEnable })
                .reduce((accumulator, item) => {
                  return accumulator += (item.price * item.quantity)
                }, 0) - (customer.amountPaid ?? 0)
            ).toFixed(2)
          )
        }
      })
      setBuyManipulation([])
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
            { name: 'Produto', align: 'left', style: { width: 100 } },
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
