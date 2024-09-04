import { Card, CardContent, Typography } from "@mui/material"
import { Values } from "../../Values"
import { useNavigate } from "react-router-dom"

export const CustomerCard = () => {

  const navigate = useNavigate();

  return <Card sx={{
    minWidth: '35vw',
    maxWidth: '90vw',
    minHeight: '10vh'
  }}
  onClick={() => { 
    navigate("/customer?identity=428d06d1-e7f9-41e5-a937-c0bd991df88d") 
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
      <Typography
        variant="h5"
        sx={{
          fontWeight: 650
        }}
      >
        João  sdkslkdslksldklsdsk
      </Typography>
      <Values amountPaid={123} amountToPay={456} />
    </CardContent>
  </Card>
}
