import { Tooltip, Typography } from "@mui/material"
import { IBuys } from "../../../../Types/IBuys"

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Buy = ({ item, key }: {
  item: IBuys,
  key: number
}) => {
  return <div
    key={key}
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#F7F8F9',
      width: '90%',
      height: '50px',
      margin: '2px 0px',
      padding: '5px 15px',
      borderRadius: '8px',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Tooltip title={item.name} placement="top-start" arrow>
          <Typography
            style={{
              fontWeight: '550',
              color: '#4f535f',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '21dvh'
            }}
          >{item.name}</Typography>
        </Tooltip>
        {!item.id &&
          <p
            style={{
              color: '#2680F2',
              padding: '1px 6px',
              backgroundColor: '#D4E6F8',
              fontSize: '10pt',
              margin: '0 0 0 15px',
              borderRadius: '15px',
              border: '1px solid #2680F2'
            }}
          >Rascunho</p>
        }
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px'
      }}>
        <Typography
          style={{
            color: '#8E959F',
            fontSize: '9pt'
          }}
        >{`${item.quantity}x`}</Typography>
        <Typography
          style={{
            color: '#8E959F',
            fontSize: '10pt'
          }}
        >{`R$ ${item.price.toFixed(2)}`}</Typography>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px'
      }}
    >
      <Typography
        style={{
          fontWeight: 700,
          color: '#4f535f'
        }}
      >
        {`R$ ${item.total?.toFixed(2)}`}
      </Typography>
      <DeleteOutlineIcon color="error" />
    </div>
  </div>
}
