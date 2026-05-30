import { Alert, Button, Card, CardContent, CircularProgress, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { MinimarketContext } from "../../Context/minimarket"
import { IMessageFeedback } from "../../Types/IMessageFeedback"
import { useNavigate } from "react-router-dom"
import { getToken } from "../../Services/Users"
import { IUser } from "../../Types/IUser"
import { jwtDecode } from "jwt-decode"

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface ILogin {
  toRedirect?: string
}

export const Login = ({ toRedirect }: ILogin) => {

  const { setUser } = useContext(MinimarketContext)

  const navigate = useNavigate();

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

      const token = await getToken(email)

      const claims: IUser = jwtDecode(token)

      setUser(claims)

      localStorage.setItem('user', JSON.stringify(claims))
      setLoading(false)

      navigate(`${toRedirect === 'home' ? '' : toRedirect}`)

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
    flexDirection: "column",
    alignItems: 'center',
    width: '100vw',
    height: '70vh',
    gap: "5px"
  }}>
    <StorefrontIcon
      style={{
        backgroundColor: "#0D81F0",
        borderRadius: "15px",
        padding: "10px",
        width: "40px",
        height: "40px",
        boxShadow: "1px 1px 5px 0px rgb(126, 135, 144)"
      }}
    />
    <Typography
      style={{
        fontSize: "22px",
        color: "#151316",
        fontWeight: 700
      }}
    >Olá, bem-vindo</Typography>
    <Typography
      style={{
        fontSize: "14px",
        color: "#7E8790",
        marginBottom: "20px"
      }}
    >Acesse sua conta para gerenciar seus clientes</Typography>
    <Card sx={{
      width: { xs: "85%", sm: "60%", md: "35%" },
      minHeight: '10vh',
      borderRadius: "12px"
    }}
      key={`login-page`}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: "20px",
          alignItems: 'center',
        }}
      >
        <TextField
          id="standard-basic"
          label="Digite seu e-mail"
          sx={{
            width: "100%",
            ".MuiInputBase-root": {
              borderRadius: "10px",
            }
          }}
          defaultValue={email}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any) => { setEmail(event.target.value ?? '') }}
        />

        <Button
          sx={{
            marginTop: "25px",
            width: '100%',
            textTransform: "none",
            fontWeight: 500,
            borderRadius: "8px",
            padding: "10px"
          }}
          variant="contained"
          onClick={async () => {
            handleClick()
          }}
        >{
            loading ?
              <CircularProgress size={25} sx={{ color: '#ffffff' }} /> :
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%"
                }}
              >
                <span>Acessar</span>
                <ArrowForwardIcon
                  style={{
                    width: "18px",
                    height: "18px"
                  }}
                />
              </div>
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
