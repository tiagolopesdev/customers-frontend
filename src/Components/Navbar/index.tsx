import { TextField } from "@mui/material"


export const Navbar = () => {

  return <div
    style={{
      backgroundColor: '#ffffff',
      height: '10dvh',
      display: 'flex',
      padding: '10px',
      borderRadius: '0px 0px 10px 10px'
    }}
  >
    <TextField
      id="standard-basic"
      label="Pesquise pelo nome do comprador"
      variant="standard"
      sx={{ width: '80dvw' }}
    />
  </div>
}
