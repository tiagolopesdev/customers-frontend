import { Card, CardContent, Typography } from "@mui/material"
import { Values } from "../../Values"
import { useNavigate } from "react-router-dom"
import { ICustomer } from "../../../Types/ICustomer"

interface ICustomerCard {
  customer: ICustomer
}

export const CustomerCard = ({ customer }: ICustomerCard) => {

  const navigate = useNavigate();

  return <Card sx={{
    minWidth: '90vw',
    maxWidth: '65vw',
    minHeight: '10vh'
  }}
    onClick={() => {
      navigate(`/customer?identity=${customer.id}`)
    }}
    key={`customer-${customer.name}-${customer.id}`}
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
      <Typography
        variant="h5"
        sx={{
          fontWeight: 650
        }}
      >
        {customer.name}
      </Typography>
      <Values amountPaid={customer.amountPaid} amountToPay={customer.amountToPay} />
    </CardContent>
  </Card>
}
