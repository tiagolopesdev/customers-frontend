import { useContext } from "react"
import { MinimarketContext } from "../../Context/minimarket"
import { GroupButtonsActions, ElementLink } from "../../Styles";

import PersonIcon from '@mui/icons-material/Person';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import DiscountIcon from '@mui/icons-material/Discount';
import { Box, Link } from "@mui/material";

interface ButtonsActionsProps {
  openScanner: boolean,
  setOpenScanner: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonsActions = ({ openScanner, setOpenScanner }: ButtonsActionsProps) => {

  const { logout, user } = useContext(MinimarketContext)

  return <Box sx={GroupButtonsActions}>
    <Link
      href="/customer" 
      sx={ElementLink}
    >
      <PersonIcon />
      Cadastro
    </Link>
    <Link
      href=""
      onClick={() => setOpenScanner(!openScanner)}
      sx={ElementLink}
    >
      <CenterFocusWeakIcon />
      Scanner
    </Link>
    {
      user.role.includes('Admin') ?
        <Link
          href="/products"
          sx={ElementLink}
        >
          <DiscountIcon />
          Produtos
        </Link>
        : ''
    }
    <Link
      href="/received"
      sx={ElementLink}
    >
      <AttachMoneyIcon />
      Prestação
    </Link>
    <Link
      href=""
      onClick={() => { logout() }}
      sx={ElementLink}
    >
      <LogoutIcon />
      Sair
    </Link>
  </Box>
}
