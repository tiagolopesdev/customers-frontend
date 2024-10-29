import { Card, CardContent, TextField, Typography } from "@mui/material"
import { useState } from "react"


export const Login = () => {

  const [email, setEmail] = useState()

  return <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '40vh'
  }}>
    <Card sx={{
      minWidth: '90vw',
      maxWidth: '65vw',
      minHeight: '10vh'
    }}
      onClick={() => {
        // navigate(`/customer?identity=${customer.id}`)
      }}
      key={`login-page`}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: "20px",
          '&:last-child': {
            paddingBottom: "8px"
          }
        }}
      >
        <Typography
          sx={{
            fontWeight: 550,
            marginBottom: '10px'
          }}
        >
          Acesse com seu e-mail
        </Typography>
        <TextField
          id="standard-basic"
          label="Digite seu e-mail"
          // variant="standard"
          sx={{ width: '80dvw' }}
          defaultValue={email}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any) => { setEmail(event.target.value ?? '') }}
        />
      </CardContent>
    </Card>
  </div>
}
