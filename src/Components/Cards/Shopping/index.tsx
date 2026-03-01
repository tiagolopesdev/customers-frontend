/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, CardContent, Chip, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { ShoppingModal } from "../../Modals/Shopping";
import { TableComponent } from "../../Table";
import { IBuys } from "../../../Types/IBuys";
import { ITableRowProps } from "../../../Types/TableProps";
import { ICustomer } from "../../../Types/ICustomer";
import { CurrencyInput } from "react-currency-mask";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import { ElementButton, ScroolCustom } from "../../../Styles";

interface IShoppingCard {
  customer: ICustomer
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>
}

export const ShoppingCard = ({ customer, setCustomer }: IShoppingCard) => {

  const [open, setOpen] = useState(false);
  const [buysTotal, setBuysTotal] = useState(0)
  const [buyManipulation, setBuyManipulation] = useState<IBuys[]>([])
  const [updatedUnitValue, setUpdatedUnitValue] = useState(false)

  const handleStateModal = () => setOpen(!open)

  const buildBuysForRender = (): ITableRowProps[] => {
    const listRow: ITableRowProps[] = []

    if (!customer.buys) return listRow

    customer.buys.map((item: IBuys, indexBuy: number) => {
      if (item.isEnable) return

      let priceUpdated = 0

      const listToReturn: ITableRowProps = {
        rows: [
          {
            style: { width: '12dvw' }, name: !item.id || item.id === undefined ?
              <Chip
                sx={{ height: 25, fontWeight: 550 }}
                label={`${item.name}`}
                color='info'
                variant='outlined'
              /> : item.name
            , align: 'left', useTooltip: true
          },
          { style: { width: '10dvw' }, name: `${item.quantity}`, align: 'center' },
          {
            style: { width: '10dvw' }, name: !item.id || item.id === undefined ?
              <div style={{ display: 'flex' }}>
                <IconButton onClick={() => {
                  customer.buys?.splice(indexBuy, 1, {
                    name: item.name,
                    price: priceUpdated,
                    quantity: item.quantity,
                    total: item.quantity * priceUpdated,
                    productId: item.productId,
                    updatedBy: item.updatedBy,
                    dateCreated: item.dateCreated,
                    id: item.id,
                    isEnable: item.isEnable
                  } as IBuys)
                  setUpdatedUnitValue(true)
                }}>
                  <CheckCircleIcon color="info" />
                </IconButton>
                <CurrencyInput
                  defaultValue={item.total?.toFixed(2)}
                  onChangeValue={(
                    _event: React.ChangeEvent<HTMLInputElement>,
                    originalValue: string | number,
                    _maskedValue: string | number
                  ) => {
                    priceUpdated = originalValue as number
                  }}
                  InputElement={
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                      size="small"
                      defaultValue={item.price.toFixed(2)}
                      style={{ minWidth: '100px' }}
                    />
                  }
                />
                {/* <IconButton onClick={() => {
                  customer.buys?.splice(indexBuy, 1, {
                    name: item.name,
                    price: fixedValue,
                    quantity: item.quantity,
                    total: item.quantity * item.price,
                    productId: item.productId,
                    updatedBy: item.updatedBy,
                    dateCreated: item.dateCreated,
                    id: item.id,
                    isEnable: item.isEnable
                  } as IBuys)
                  setUpdatedUnitValue(true)
                }}>
                  <ReplayIcon color="warning" />
                </IconButton> */}
              </div> : `${item.price.toFixed(2)}`, align: 'center'
          },
          {
            style: { width: '10dvw' }, name: `${(item.price * item.quantity).toFixed(2)}`, align: 'center'
          },
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

  const tableComponentToShow = () => <TableComponent
    tableCell={[
      { name: 'Produto', align: 'left', style: { width: 100 } },
      { name: 'Quant.', align: 'center' },
      { name: 'Unitário', align: 'center' },
      { name: 'Total', align: 'center' },
      { name: 'Ações', align: "center" }
    ]}
    tableRows={buildBuysForRender()}
  />

  useEffect(() => {
    if (updatedUnitValue) {
      tableComponentToShow()
      setUpdatedUnitValue(false)
    }
  }, [updatedUnitValue])

  return <>
    <Card sx={{
      minWidth: '35vw',
      maxWidth: '90vw',
      minHeight: '35vh',
      maxHeight: '30vh',
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
            {`R$ ${buysTotal.toFixed(2)
              }`}
          </Typography>
          <ElementButton
            variant="contained"
            onClick={() => { handleStateModal() }}
            style={{ flexDirection: 'row', color: "#FFFFFF", borderRadius: '8px' }}
          >
            <AddShoppingCartIcon />
          </ElementButton>
        </div>
        <ScroolCustom style={{ width: '100%', height: '25dvh' }}>
          {
            customer.buys?.map((item: IBuys, index: number) => {
              return <div>
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#F7F8F9',
                    width: '90%',
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
                    <Tooltip title={item.name} placement="top-start" arrow>
                      <Typography
                        style={{
                          fontWeight: '550',
                          color: '#4f535f',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          maxWidth: '21dvh'
                        }}
                      >{item.name}</Typography>
                    </Tooltip>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '15px'
                    }}>
                      <Typography
                        style={{
                          color: '#8E959F',
                          fontSize: '9pt'
                        }}
                      >{`${item.quantity}x`}</Typography>
                      <Typography
                        style={{
                          color: '#8E959F',
                          fontSize: '10pt'
                        }}
                      >{`R$ ${item.price.toFixed(2)}`}</Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '20px'
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: 700,
                        color: '#4f535f'
                      }}
                    >
                      {`R$ ${item.total?.toFixed(2)}`}
                    </Typography>
                    <DeleteOutlineIcon color="error" />
                  </div>
                </div>
              </div>
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
          buyProps={buyManipulation}
          setBuyProps={setBuyManipulation}
        /> :
        ''
    }
  </>
}
