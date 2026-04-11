/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { IBuys } from "../../../../Types/IBuys"

import { Chip, TextField } from "@mui/material";
import { CurrencyInput } from "react-currency-mask";

import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

export const DiscountManager = ({ buy }: { buy: IBuys }) => {

  const [editPrice, setEditPrice] = useState(false)
  const [lastPrice, setLastPrice] = useState(buy.price)

  const showToEditPrice = () => {
    return <>
      <CurrencyInput
        onChangeValue={(
          _event: React.ChangeEvent<HTMLInputElement>,
          originalValue: string | number,
          _maskedValue: string | number
        ) => {
          buy.price = originalValue as number
        }}
        InputElement={
          <TextField
            sx={{
              '& .MuiInputBase-input': {
                padding: '5px 15px',
                width: '70px'
              }
            }}
          />
        }
      />
      <CheckIcon
        sx={{
          color: "#29A366",
          backgroundColor: '#D8EBE3',
          padding: '4px',
          borderRadius: '15px'
        }}
        onClick={() => { setEditPrice(false) }}
      />
    </>
  }
  const showEditedPrice = () => {
    return <>
      <p
        style={{
          fontWeight: 700,
          margin: "0px"
        }}
      >{`R$ ${buy.price.toFixed(2)}`}</p>
      {lastPrice !== buy.price &&
        <p
          style={{
            fontSize: '10pt',
            textDecoration: 'line-through',
            margin: "0px"
          }}
        >{`R$ ${lastPrice.toFixed(2)}`}</p>
      }
      <EditIcon
        sx={{
          color: '#2680F2',
        }}
        onClick={() => { setEditPrice(true) }}
      />
      {lastPrice !== buy.price &&
        <Chip
          sx={{
            color: '#35A568',
            backgroundColor: '#E2EFEA',
            border: '1px solid #35A568',
            padding: 0,
            height: '22px',
            fontSize: '12px',
          }}
          label={`${(((lastPrice - buy.price) / lastPrice) * 100).toFixed(2)}%`}
        />
      }
    </>
  }

  return !buy.id &&
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <span
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#dbdbdb'
        }}
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          minHeight: '40px',
        }}
      >

        <p style={{
          fontSize: '10pt',
          margin: "0px"
        }}>Unitário:</p>
        {editPrice ? showToEditPrice() : showEditedPrice()}
      </div>
    </div>

}
