/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, CircularProgress, Modal } from "@mui/material"
import { useState } from "react";
import QrReader from "../../QrCodeRead/QrReader";
import { createCustomerHandler } from "../../../Handlers/CreateCustomer";
import { useNavigate } from "react-router-dom";
import { findByNameCustomersHandler } from "../../../Handlers/GetByNameCustomers";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 300,
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 2.5,
};

interface IQrCodeScannerModal {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const QrCodeScannerModal = (props: IQrCodeScannerModal) => {

  const { open, setOpen } = props

  const navigate = useNavigate();

  const [nameScanned, setNameScanned] = useState('')
  const [loading, setLoading] = useState(false)

  const saveCustomer = async () => {
    try {

      setLoading(true)

      const existCustomer = await findByNameCustomersHandler(nameScanned)

      let idCustomer = ''

      if (existCustomer && existCustomer?.length > 0) {        
        idCustomer = existCustomer[0].id as string
      } else {
        idCustomer = await createCustomerHandler({ 
          name: nameScanned,
          buys: [],
          payments: []
        }) as string
      }

      localStorage.setItem('customerId', idCustomer)
      navigate(`/customer`)

      setLoading(false)

    } catch (error) {
      setLoading(false)
    }
  }

  return <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{
      borderRadius: '5px',
      ...style,
      width: "75vw",
      height: "100vw",
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <QrReader
        setValueScanned={setNameScanned}
        valueScanned={nameScanned}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Button
          disabled={nameScanned === ""}
          variant="contained"
          color="success"
          style={{ width: '100%', margin: '0px 10px' }}
          onClick={async () => { await saveCustomer() }}
        >{
            loading ? <div style={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={20} />
              <p style={{ marginLeft: '10px' }}>Redirecionando</p>
            </div> : "Confirmar"
          }</Button>
        <Button variant="contained" color="error" style={{ width: '100%', margin: '0px 10px' }} onClick={() => { setOpen(false) }} >Fechar</Button>
      </div>

    </Box>
  </Modal>
}
