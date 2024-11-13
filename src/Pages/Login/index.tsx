import { Alert, Button, Card, CardContent, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material"
import { useState } from "react"


export const Login = () => {

  const [email, setEmail] = useState()
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  const handleClick = () => {
    setMessage("Estamos validando seu acesso")
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
          },
          alignItems: 'center'
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
        <Button
          sx={{ marginTop: 2, width: '50dvw' }}
          variant="contained"
          onClick={handleClick}
        >Acessar</Button>
      </CardContent>
    </Card>
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  </div>
}
