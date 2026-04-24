import { Alert, Box, Snackbar, SnackbarCloseReason } from "@mui/material"
import { ShoppingCard } from "../../Components/Cards/Shopping"
import { PaymentsCard } from "../../Components/Cards/Payments"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { findByIdCustomersHandler } from "../../Handlers/GetByIdCustomer"
import { ICustomer } from "../../Types/ICustomer"
import { ObjectIsEquals } from "../../Utils/objectIsEqual"
import { initialStateCustomer } from "../../Types/InitialStateCustomer"
import { createCustomerHandler } from "../../Handlers/CreateCustomer"
import { updateCustomerHandler } from "../../Handlers/UpdateCustomer"
import { IMessageFeedback } from "../../Types/IMessageFeedback"
import { ManagerShowData } from "../../Components/ManagerShowData"
import { IStateShowData } from "../../Types/IStateShowData"
import { ContainerComponent } from "./style"
import { ElementButton, GroupButtonsActions } from "../../Styles"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { Values } from "./Components/Values"
import { ManagerShowName } from "./Components/ManagerShowName"
import { MinimarketContext } from "../../Context/minimarket"

export const Customer = () => {

  const navigate = useNavigate()
  // const [customer, setCustomer] = useState<ICustomer>(initialStateCustomer)
  const [customerOrigin, setCustomerOrigin] = useState<ICustomer>(initialStateCustomer)
  const [openFeedback, setOpenFeedback] = useState(false);
  const [message, setMessage] = useState<IMessageFeedback>({
    message: '',
    type: "success"
  })
  const [state, setState] = useState<IStateShowData>({
    state: ""
  })

  const { customer, setCustomer } = useContext(MinimarketContext)

  const findCustomer = async () => {
    try {
      const customerId = localStorage.getItem('customerId')

      // if (state.state === 'SUCCESS') return

      let result: ICustomer = {
        id: '',
        amountPaid: 0,
        amountToPay: 0,
        name: '',
        buys: [],
        payments: []
      }

      setState({ state: 'IN_PROGRESS' })

      if (customerId) {
        result = await findByIdCustomersHandler(customerId) as ICustomer
        result.buys?.forEach((item) => { item.isEnable = false })
      }

      console.log(result)

      setCustomer(result)
      setCustomerOrigin(structuredClone(result))
      setState({ state: 'SUCCESS' })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setState({ state: 'ERROR' })
    }
  }

  const showComponent = (): JSX.Element | string => {
    localStorage.setItem('amountToPay', (customer.amountToPay ?? 0).toString())
    return <ManagerShowData
      data={
        <Box
          sx={{            
            width: { xs: "100%", md: "66%" },
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            overflowY: "auto",
            flex: 1,
          }}
        >
          <ShoppingCard />
          <PaymentsCard customer={customer} setCustomer={setCustomer} />
        </Box>
      }
      state={state}
      scrool={false}
    />
  }

  useEffect(() => { findCustomer() }, [])

  const saveChanges = async () => {
    try {
      console.log(customer)
      if (customer.id) {
        await updateCustomerHandler(customer)
      } else {
        const customerId = await createCustomerHandler(customer)
        localStorage.setItem('customerId', customerId as string)
      }
      findCustomer()
    } catch (error) {
      setMessage({
        message: error as string,
        type: "warning"
      })
      setOpenFeedback(true);
      setTimeout(
        () => { findCustomer() },
        2000
      )
    }
  }

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFeedback(false);
  };

  return <ContainerComponent>
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 5px 10px 5px',
      width: { xs: "100%", md: "66%" },
      backgroundColor: "#E4E4E4",
    }}>
      <ManagerShowName
        customer={customer}
        setCustomer={setCustomer}
      />
      <Values
        amountPaid={customer.amountPaid ?? 0}
        amountToPay={customer.amountToPay ?? 0}
      />
    </Box>
    {showComponent()}
    <GroupButtonsActions>
      <ElementButton
        onClick={() => {
          setCustomer(initialStateCustomer)
          navigate("/")
        }}
      >
        <ArrowBackIosNewIcon />
        Voltar
      </ElementButton>
      <ElementButton
        disabled={ObjectIsEquals(customer, customerOrigin)}
        onClick={async () => { saveChanges() }}
      >
        <SaveIcon />
        Salvar
      </ElementButton>
      <ElementButton
        disabled={ObjectIsEquals(customer, customerOrigin)}
        onClick={() => { findCustomer() }}
      >
        <UndoIcon />
        Reverter
      </ElementButton>
    </GroupButtonsActions>
    <Snackbar
      open={openFeedback}
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
  </ContainerComponent>
}
