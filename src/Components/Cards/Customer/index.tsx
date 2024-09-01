import { Card, CardContent, Typography } from "@mui/material"
import { Values } from "../../Values"

export const CustomerCard = () => {

  return <Card sx={{
    minWidth: '35vw',
    maxWidth: '90vw',
    minHeight: '10vh'
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
      <Values amountPaid={123} amountToPay={456}/>
    </CardContent>
  </Card>
}
