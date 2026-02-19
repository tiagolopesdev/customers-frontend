import { useState } from "react"
import { ICustomer } from "../../../Types/ICustomer"
import { TextField, Typography } from "@mui/material"

import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';


export const ManagerShowName = ({ customer, setCustomer }: {
  customer: ICustomer,
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>
}): JSX.Element => {

  const [editName, setEditName] = useState({
    isEdit: false,
    currentName: ''
  })

  return <div style={{ display: 'flex', alignItems: 'center', width: '90%' }}>
    {
      !editName.isEdit ?
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#f8f7f7',
            width: '100%',
            padding: '5px',
            borderRadius: '8px'
          }}
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
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#f8f7f7',
            padding: '5px',
            borderRadius: '8px'
          }}
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
              fontSize: '14pt',
              color: '#ffffff',
              backgroundColor: '#29A366',
              marginLeft: '10px',
              borderRadius: '15px',
              padding: '4px'
            }}
            onClick={() => {
              setCustomer({ ...customer, name: editName.currentName });
              setEditName({ isEdit: false, currentName: '' })
            }}
          />
          <CloseIcon
            style={{
              fontSize: '14pt',
              color: '#E35151',
              backgroundColor: '#FBEBEB',
              marginLeft: '10px',
              borderRadius: '15px',
              padding: '4px',
              cursor: 'pointer',
              pointerEvents: 'auto',
              zIndex: 9999
            }}
            onClick={() => { setEditName({ isEdit: false, currentName: '' }) }}
          />
        </div>
    }
  </div>
}