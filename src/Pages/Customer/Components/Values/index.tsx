import CallReceivedIcon from '@mui/icons-material/CallReceived';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { CSSProperties } from "react";


interface IValues {
  amountPaid: number
  amountToPay: number
}

const containerInfoStyle: CSSProperties = {
  backgroundColor: '#FFFFFF',
  width: '100%',
  height: '30px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '10px',
  marginTop: '5px',
  gap: '7px'
}

const iconInfoStyle: CSSProperties = {
  fontSize: '14pt',
  padding: '5px',
  borderRadius: '15px',
}

const groupInfoStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center'
}

const typeInfoStyle: CSSProperties = {
  fontWeight: 500,
  fontSize: 12,
  color: '#4f535f',
  margin: '0px 0px 2px 0px'
}

const valueInfoStyle: CSSProperties = {
  fontWeight: 800,
  fontSize: 15,
  margin: '0px 0px 5px 0px',
  lineHeight: '0.8'
}

export const Values = ({ amountPaid, amountToPay }: IValues) => {

  return <div
    style={{
      display: 'flex',
      flexDirection: "row",
      gap: '5px',
      width: '95%',
    }}
  >
    <div style={containerInfoStyle} >
      <CallReceivedIcon
        style={{
          backgroundColor: '#DFF1E8',
          color: '#2A9C63',
          ...iconInfoStyle
        }}
      />
      <div style={groupInfoStyle}>
        <p style={typeInfoStyle}>Recebido</p>
        <p
          style={{
            color: '#2A9C63',
            ...valueInfoStyle
          }}
        >{`R$ ${amountPaid.toFixed(2)}`}</p>
      </div>
    </div>
    <div style={containerInfoStyle} >
      <AttachMoneyIcon
        style={{
          backgroundColor: '#FBEBEB',
          color: '#DF3A3A',
          ...iconInfoStyle
        }}
      />
      <div style={groupInfoStyle}>
        <p style={typeInfoStyle}>Pendente</p>
        <p
          style={{
            color: '#DF3A3A',
            ...valueInfoStyle
          }}
        >{`R$ ${amountToPay.toFixed(2)}`}</p>
      </div>
    </div>
  </div>
}
