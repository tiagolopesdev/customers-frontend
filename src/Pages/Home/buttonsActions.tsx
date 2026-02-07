import { useContext } from "react"
import { MinimarketContext } from "../../Context/minimarket"
import { GroupButtonsActions, ElementLink } from "../../Styles";

import PersonIcon from '@mui/icons-material/Person';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import DiscountIcon from '@mui/icons-material/Discount';

interface IButtonsActions {
  openScanner: boolean,
  setOpenScanner: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonsActions = ({ openScanner, setOpenScanner }: IButtonsActions) => {

  const { logout, user } = useContext(MinimarketContext)

  return <GroupButtonsActions>
    <ElementLink
      to="/customer"     
    >
      <PersonIcon />
      Cadastro
    </ElementLink>
    <ElementLink
      to=""
      onClick={() => setOpenScanner(!openScanner)}
    >
      <CenterFocusWeakIcon />
      Scanner
      </ElementLink>
    {
      user.role.includes('Admin') ?
        <ElementLink
          to="/products"
        >
          <DiscountIcon />
          Produtos
        </ElementLink>
        : ''
    }
    <ElementLink
      to="/received"
    >
      <AttachMoneyIcon />
      Prestação
    </ElementLink>
    <ElementLink
      to=""
      onClick={() => { logout() }}
    >
      <LogoutIcon />
      Sair
    </ElementLink>
  </GroupButtonsActions>
}
