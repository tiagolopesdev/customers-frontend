import { useState } from "react"
import { ICustomer } from "../../../../Types/ICustomer"
import { Box, SxProps, TextField, Theme, Typography } from "@mui/material"

import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';

const containerStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  width: '100%',
  padding: '15px',
  borderRadius: '8px',
}

const iconActionStyle: SxProps<Theme> = {
  fontSize: '14pt',
  marginLeft: '10px',
  borderRadius: '15px',
  padding: '4px'
}

export const ManagerShowName = ({ customer, setCustomer }: {
  customer: ICustomer,
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>
}): JSX.Element => {

  const [editName, setEditName] = useState({
    isEdit: false,
    currentName: ''
  })

  return <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    }}
  >
    {
      !editName.isEdit ?
        <Box
          sx={containerStyle}
        >
          <PersonIcon
            style={{
              backgroundColor: '#E6F2FD',
              color: '#3896f3',
              borderRadius: '15px',
              padding: '4px',
              marginRight: '10px'
            }}
          />
          <Typography
            style={{
              color: '#737B92',
              fontWeight: 'bolder',
              fontSize: '14pt'
            }}
          >{customer.name === "" ? "Defina um nome" : customer.name}</Typography>
          <EditIcon
            style={{
              fontSize: '14pt',
              color: '#3896f3',
              marginLeft: '10px'
            }}
            onClick={() => { setEditName({ isEdit: !editName.isEdit, currentName: customer.name }) }}
          />
        </Box> :
        <Box
          sx={containerStyle}
        >
          <PersonIcon
            style={{
              backgroundColor: '#E6F2FD',
              color: '#3896f3',
              borderRadius: '15px',
              padding: '4px',
              marginRight: '10px'
            }}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            fullWidth
            defaultValue={customer.name}
            onChange={(event) => { setEditName({ ...editName, currentName: event.target.value }) }}
          />
          <CheckIcon
            sx={{
              color: '#ffffff',
              backgroundColor: '#29A366',
              ...iconActionStyle
            }}
            onClick={() => {
              setCustomer({ ...customer, name: editName.currentName });
              setEditName({ isEdit: false, currentName: '' })
            }}
          />
          <CloseIcon
            sx={{
              color: '#E35151',
              backgroundColor: '#FBEBEB',
              ...iconActionStyle
            }}
            onClick={() => { setEditName({ isEdit: false, currentName: '' }) }}
          />
        </Box>
    }
  </Box>
}