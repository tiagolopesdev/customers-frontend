import { Button, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { ShoppingModal } from "../../Modals/Shopping";
import { TableComponent } from "../../Table";
import { IBuys } from "../../../Types/IBuys";
import { ITableRowProps } from "../../../Types/TableProps";

interface IShoppingCard {
  buys?: IBuys[]
}

export const ShoppingCard = ({ buys }: IShoppingCard) => {

  const [open, setOpen] = useState(false);
  const [buysTotal, setBuysTotal] = useState(0)

  const handleStateModal = () => setOpen(!open)
  
  const buildBuysForRender = (): ITableRowProps[] => {
    const listRow: ITableRowProps[] = []

    if (!buys) return listRow
    
    buys.map((item: IBuys) => {
      const listToReturn: ITableRowProps = {
        rows: [
          { style: { width: '10dvw' }, name: 'name_product', align: 'left' },
          { style: { width: '10dvw' }, name: `${item.quantity}`, align: 'center' },
          { style: { width: '10dvw' }, name: `${item.price}`, align: 'center' },
          { style: { width: '10dvw' }, name: `${item.total}`, align: 'center' },
          { style: { width: '5px' }, name: 'jkgjhjgh', align: 'center', actions: <Button variant="contained" >Ex</Button> },
        ]
      }
      listRow.push(listToReturn)
    })

    return listRow
  }

  const buysTotalCalculate = () => {
    if (!buys) return 0
    const result = buys.reduce((accumulator, item) => { return accumulator += item.total }, 0)
    setBuysTotal(result)
  }

  useEffect(() => { 
    buildBuysForRender() 
    buysTotalCalculate()
  }, [buys])

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
            {`R$ ${buysTotal}`}
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
        /> :
        ''
    }
  </>
}
