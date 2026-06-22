import { Box, Modal } from "@mui/material"


export default function ModalBase({
  open,
  children
}: {
  children: JSX.Element[]
  open: boolean
}) {

  return <Modal
    open={open}
    aria-labelledby="modal-product-add-edit-labelled"
    aria-describedby="modal-product-add-edit-described"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: "313px", sm: "400px", md: "470px" },
        bgcolor: 'background.paper',
        boxShadow: 20,
        borderRadius: "12px",
        padding: "15px 15px 25px 15px",
        gap: "30px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {children}
    </Box>
  </Modal>
}
