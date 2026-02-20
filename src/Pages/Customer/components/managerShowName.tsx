import { CSSProperties, useState } from "react"
import { ICustomer } from "../../../Types/ICustomer"
import { TextField, Typography } from "@mui/material"

import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';

const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#f8f7f7',
  width: '100%',
  padding: '15px',
  borderRadius: '8px'
}

const iconActionStyle: CSSProperties = {
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

  return <div
    style={{
      display: 'flex',
      alignItems: 'center',
      width: '90%',
    }}
  >
    {
      !editName.isEdit ?
        <div
          style={containerStyle}
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
          >{customer.name}</Typography>
          <EditIcon
            style={{
              fontSize: '14pt',
              color: '#3896f3',
              marginLeft: '10px'
            }}
            onClick={() => { setEditName({ isEdit: !editName.isEdit, currentName: customer.name }) }}
          />
        </div> :
        <div
          style={containerStyle}
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
            style={{
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
            style={{
              color: '#E35151',
              backgroundColor: '#FBEBEB',
              ...iconActionStyle
            }}
            onClick={() => { setEditName({ isEdit: false, currentName: '' }) }}
          />
        </div>
    }
  </div>
}