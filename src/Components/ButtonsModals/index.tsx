import { Button } from "@mui/material"


type ButtonsModalsProps = {
  onClickBack?: () => void
  onClickConfirm?: () => void
  disableConfirm?: boolean
}

export default function ButtonsModals({
  onClickBack,
  onClickConfirm,
  disableConfirm
}: ButtonsModalsProps) {

  return <div style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  }}>
    <Button
      color="success"
      variant="contained"
      fullWidth
      style={{ marginRight: '5px', textTransform: "none", borderRadius: '8px' }}
      onClick={onClickBack}
    >Voltar</Button>
    <Button
      color="primary"
      variant="contained"
      fullWidth
      style={{ marginLeft: '5px', textTransform: "none", borderRadius: '8px' }}
      disabled={disableConfirm}
      onClick={onClickConfirm}
    >Confirmar</Button>
  </div>
}
