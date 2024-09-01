import { Typography } from "@mui/material"

interface IValues {
  amountPaid: number
  amountToPay: number
}

export const Values = ({ amountPaid, amountToPay }: IValues) => {

  return <div
    style={{
      display: 'flex',
      flexDirection: "row",
      paddingTop: 5
    }}
  >
    <Typography
      style={{
        marginRight: '10px',
        color: '#64BC6D',
        fontWeight: 550
      }}
    >{
        `Valor pago: R$ ${amountPaid}`
      }</Typography>
    <Typography
      style={{
        color: '#B03333',
        fontWeight: 550
      }}
    >{
      `Valor à pagar: R$ ${amountToPay}`
    }</Typography>
  </div>
}
