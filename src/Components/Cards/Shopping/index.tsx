/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { ShoppingModal } from "../../Modals/Shopping";
import { IBuys } from "../../../Types/IBuys";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { ElementButton, ScroolCustom } from "../../../Styles";
import { Buy } from "../../../Pages/Customer/Components/Buy";
import { MinimarketContext } from "../../../Context/minimarket";


export const ShoppingCard = () => {

  const [open, setOpen] = useState(false);

  const { customer } = useContext(MinimarketContext)

  const handleStateModal = () => setOpen(!open)

  const buysTotalCalculate = () => {
    if (customer.buys === undefined) return 0
    const result = customer.buys.filter((item) => { return !item.isEnable }).reduce((accumulator, item) => { return accumulator += (item.price * item.quantity) }, 0)
    return result.toFixed(2)
  }

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
          flex: 1,
          minHeight: 0,
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
            {`R$ ${buysTotalCalculate()}`}
          </Typography>
          <ElementButton
            variant="contained"
            onClick={() => { handleStateModal() }}
            style={{ flexDirection: 'row', color: "#FFFFFF", borderRadius: '8px' }}
          >
            <AddShoppingCartIcon />
          </ElementButton>
        </div>
        <ScroolCustom>
          {
            customer.buys?.map((item: IBuys, index: number) => {
              return <Buy item={item} key={index} />
            })
          }
        </ScroolCustom>
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
