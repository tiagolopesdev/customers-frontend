import { Card, CardContent, Typography } from "@mui/material"
import { Values } from "../Values"
import { useNavigate } from "react-router-dom"
import { ICustomer } from "../../../../Types/ICustomer"

import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fullSize } from "../../../../Utils/sizesDevices";

interface ICustomerCard {
  customer: ICustomer
}

export const CustomerCard = ({ customer }: ICustomerCard) => {

  const navigate = useNavigate();

  return <Card sx={{
    width: '100%',
    maxWidth: fullSize,
    borderRadius: '8px'
  }}
    onClick={() => {
      localStorage.setItem('customerId', customer.id as string)
      navigate(`/customer`)
    }}
    key={`customer-${customer.name}-${customer.id}`}
  >
    <CardContent
      sx={{
        display: 'flex',
        alignItems: "center",
        padding: "8px",
        '&:last-child': {
          paddingBottom: "8px"
        }
      }}
    >
      <PersonIcon
        style={{
          backgroundColor: '#E6F2FD',
          color: '#3896f3',
          borderRadius: '15px',
          padding: '4px',
        }}
      />
      <div style={{
        marginLeft: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%'
      }}
      >
        <Typography
          sx={{
            fontWeight: 550,
            color: '#414141'
          }}
        >
          {customer.name}
        </Typography>
        <Values amountPaid={customer.amountPaid as number} amountToPay={customer.amountToPay as number} />
      </div>
      <ArrowForwardIosIcon style={{ fontSize: '10pt', color: '#b4b5b6' }} />
    </CardContent>
  </Card>
}
