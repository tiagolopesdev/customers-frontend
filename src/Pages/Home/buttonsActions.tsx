import { Button } from "@mui/material"
import { useContext } from "react"
import { MinimarketContext } from "../../Context/minimarket"
import { Link } from "react-router-dom"

import AddIcon from '@mui/icons-material/Add';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import DiscountIcon from '@mui/icons-material/Discount';
import { GroupButtonsActions } from "./style";

interface IButtonsActions {
  openScanner: boolean,
  setOpenScanner: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonsActions = ({ openScanner, setOpenScanner }: IButtonsActions) => {

  const { logout, user } = useContext(MinimarketContext)

  return <GroupButtonsActions>
    <Link
      to="/customer"
      style={{
        color: '#ffffff'
      }}
    >
      <Button
        color="success"
        variant="contained"
      >
        <AddIcon />
      </Button>
    </Link>
    <Button
      color="primary"
      variant="contained"
      onClick={() => setOpenScanner(!openScanner)}
    ><CenterFocusWeakIcon /></Button>
    {
      user.role.includes('Admin') ?
        <Link
          to="/products"
          style={{
            color: '#ffffff'
          }}
        >
          <Button
            color="success"
            variant="contained"
          >
            <DiscountIcon />
          </Button>
        </Link>
        : ''
    }
    <Link
      to="/received"
      style={{
        color: '#ffffff'
      }}
    >
      <Button
        color="success"
        variant="contained"
      >
        <AttachMoneyIcon />
      </Button>
    </Link>
    <Button
      color="error"
      variant="contained"
      onClick={() => { logout() }}
    ><LogoutIcon /></Button>
  </GroupButtonsActions>
}
