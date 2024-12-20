import { Button } from "@mui/material"
import { useContext } from "react"
import { MinimarketContext } from "../../Context/minimarket"
import { Link } from "react-router-dom"

import AddIcon from '@mui/icons-material/Add';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';

interface IButtonsActions {
  openScanner: boolean,
  setOpenScanner: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonsActions = ({ openScanner, setOpenScanner }: IButtonsActions) => {

  const { logout, user } = useContext(MinimarketContext)

  return <div
    style={{
      position: "sticky",
      bottom: 0,
      backgroundColor: '#1864BA',
      display: "flex",
      padding: '10px',
      width: '100dvw',
      justifyContent: "center",
      height: '10dvh',
      flexShrink: 0,
      alignItems: 'center'
    }}
  >
    <Button
      style={{ height: '7vh', margin: '0px 5px' }}
      color="success"
      variant="contained"
    >
      <Link
        to="/customer"
        style={{
          color: '#ffffff'
        }}
      ><AddIcon /></Link>
    </Button>
    <Button
      style={{ height: '7vh', margin: '0px 5px' }}
      color="primary"
      variant="contained"
      onClick={() => setOpenScanner(!openScanner)}
    ><CenterFocusWeakIcon /></Button>
    {
      user.role.includes('Admin') ?
        <Button
          style={{ height: '7vh', margin: '0px 5px' }}
          color="success"
          variant="contained"
        >
          <Link
            to="/products"
            style={{
              color: '#ffffff'
            }}
          ><AttachMoneyIcon /></Link>
        </Button> :
        ''
    }
    <Button
      style={{ height: '7vh', margin: '0px 5px' }}
      color="success"
      variant="contained"
    >
      <Link
        to="/received"
        style={{
          color: '#ffffff'
        }}
      ><AttachMoneyIcon /></Link>
    </Button>
    <Button
      style={{ height: '7vh', margin: '0px 5px' }}
      color="error"
      variant="contained"
      onClick={() => { logout() }}
    ><LogoutIcon /></Button>
  </div>
}
