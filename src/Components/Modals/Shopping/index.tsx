import { Box, Button, Modal, TextField } from "@mui/material"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 2.5,
};

interface IShoppingModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShoppingModal = ({ open, setOpen }: IShoppingModal) => {

  const handleModalState = () => setOpen(!open)

  return <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{
      borderRadius: '5px',
      ...style
    }}>
      <TextField style={{ width: '100%' }} id="outlined-basic" label="Produto" variant="outlined" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px'
        }}
      >
        <TextField slotProps={{ input: 'number' }} style={{ width: '60%', paddingRight: '50px' }} id="outlined-basic" label="Quant." variant="outlined" />
        <TextField style={{ width: '100%' }} id="outlined-basic" label="Preço Uni." variant="outlined" />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '25px'
      }}>
        <Button color="success" variant="contained" onClick={() => { handleModalState() }}>Voltar</Button>
        <Button color="success" variant="contained" onClick={() => { }}>Confirmar</Button>
      </div>
    </Box>
  </Modal>
}
