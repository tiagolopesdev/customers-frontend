import { TextField } from "@mui/material"

interface INavbar {
  filter: string 
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

export const Navbar = ({ filter, setFilter }: INavbar) => {

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
      defaultValue={filter}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(value: any) => { setFilter(value.nativeEvent.data ?? '') }}
    />
  </div>
}
