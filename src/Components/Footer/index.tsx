import { Button } from "@mui/material"


export const Footer = () => {

  return <div
    style={{
      position: "sticky",
      bottom: 0,
      backgroundColor: '#1864BA',
      display: "flex",
      padding: '10px',
      width: '100vw',
      justifyContent: "center",
      height: '10vh',
      flexShrink: 0,
      alignItems: 'center'
    }}
  >
    <Button style={{ height: '7vh', margin: '0px 5px' }} color="success" variant="contained">Adicionar</Button>
    <Button style={{ height: '7vh', margin: '0px 5px' }} color="success" variant="contained">Scanner</Button>
    <Button style={{ height: '7vh', margin: '0px 5px' }} color="warning" variant="contained">Pesquisar</Button>
  </div>
}
