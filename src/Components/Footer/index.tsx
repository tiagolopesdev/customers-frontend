import { Button } from "@mui/material"
import { Link } from "react-router-dom"

interface IFooter {
  isCustomerPage?: boolean
}

export const Footer = ({ isCustomerPage }: IFooter) => {

  const onlyOneAction = (): JSX.Element => {
    return <>
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
        >Adicionar</Link>
      </Button>
      <Button style={{ height: '7vh', margin: '0px 5px' }} color="success" variant="contained">Scanner</Button>
    </>
  }

  const customerPage = (): JSX.Element => {
    return <>
      <Button
        style={{ height: '7vh', margin: '0px 5px' }}
        color="success"
        variant="contained"
      >
        <Link
          to="/"
          style={{
            color: '#ffffff'
          }}
        >Voltar</Link>
      </Button>
      <Button
        style={{ height: '7vh', margin: '0px 5px' }}
        color="success"
        variant="contained"
      >Salvar</Button>
    </>
  }

  return <div
    style={{
      position: "sticky",
      bottom: 0,
      backgroundColor: '#1864BA',
      display: "flex",
      padding: '10px',
      width: '100vw',
      justifyContent: "center",
      height: '10dvh',
      flexShrink: 0,
      alignItems: 'center'
    }}
  >
    {
      onlyOneAction()
    }
  </div>
}
