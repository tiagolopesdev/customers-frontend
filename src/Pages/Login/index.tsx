import { Alert, Button, Card, CardContent, CircularProgress, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { MinimarketContext } from "../../Context/minimarket"
import { IMessageFeedback } from "../../Types/IMessageFeedback"

interface ILogin {
  toRedirect?: string
}

export const Login = ({ toRedirect }: ILogin) => {

  const { login } = useContext(MinimarketContext)

  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<IMessageFeedback>({
    message: '',
    type: "success"
  })
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      if (email === '') {
        setMessage({
          message: "E-mail não é válido",
          type: "warning"
        })
        setOpen(true);
        return
      }

      setLoading(true)
      setMessage({
        message: "Validando seu acesso",
        type: "success"
      })
      setOpen(true);

      await login(email)
      setLoading(false)

      window.location.assign(`${window.location.protocol}//${window.location.host}/${toRedirect === 'home' ? '' : toRedirect}`)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false)
      setMessage({
        message: error.message,
        type: "warning"
      })
      setOpen(true);
    }
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
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
        {/* <Link
          component="button"
          variant="body2"          
          onClick={() => {
            console.info("I'm a button.");
          }}
          
        >
          Button Link
        </Link> */}
        {/* <Link to={{ pathname: toRedirect === 'home' ? '' : toRedirect }} >Acessar</Link> */}
        <Button
          sx={{ marginTop: 2, width: '50dvw' }}
          variant="contained"
          onClick={async () => {
            handleClick()
            // window.location.assign(`${window.location.protocol}//${window.location.host}/${toRedirect === 'home' ? '' : toRedirect}`)
          }}
        >{
            loading ?
              <CircularProgress size={25} sx={{ color: '#ffffff' }} /> :
              'Acessar'
          }
        </Button>
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
        severity={message.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message.message}
      </Alert>
    </Snackbar>
  </div>
}
