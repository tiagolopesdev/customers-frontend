

import { Skeleton, Typography } from '@mui/material';
import { ScroolCustom } from '../../Styles';
import { IStateShowData } from '../../Types/IStateShowData';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

interface IManagerShowData {
  state: IStateShowData
  data: JSX.Element,
  scrool?: boolean | undefined
}

const style: React.CSSProperties = {
  height: '100%',
  width: 'inherit'
}


export const ManagerShowData = ({ data, state, scrool }: IManagerShowData) => {
  switch (state.state) {
    case 'ERROR':
      return <div style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      >
        <ReportGmailerrorredIcon style={{ fontSize: '40pt', color: '#e60202' }} />
        <Typography style={{ color: '#6e6e6e', fontWeight: 550 }} >
          Não foi possível obter o(s) dado(s)
        </Typography>
      </div>
    case 'NOT_FOUND':
      return <div style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      >
        <WarningAmberIcon style={{ fontSize: '40pt', color: '#e6cf02' }} />
        <Typography style={{ color: '#6e6e6e', fontWeight: 550 }} >
          Registro(s) pesquisado não encontrado(s)
        </Typography>
      </div>
    case 'IN_PROGRESS':
      return <div style={style}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: 'inherit',
            height: 'inherit',
            borderRadius: '10px'
          }}
        />
      </div>
    case 'SUCCESS':
      return scrool === undefined || scrool ? <ScroolCustom>
        {data}
      </ScroolCustom> : data
  }
}
