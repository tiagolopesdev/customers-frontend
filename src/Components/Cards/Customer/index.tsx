import { Card, CardContent, Typography } from "@mui/material"

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
      <div
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
        >
          Valor pago: R$ 00,00
        </Typography>
        <Typography
          style={{
            color: '#B03333',
            fontWeight: 550
          }}
        >
          Valor a pagar: R$ 00,00
        </Typography>
      </div>
    </CardContent>
  </Card>
}
