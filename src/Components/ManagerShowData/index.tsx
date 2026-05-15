

import { Alert, CircularProgress, Skeleton, Typography } from '@mui/material';
import { ScroolCustom } from '../../Styles';
import { IStateShowData } from '../../Types/IStateShowData';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { TriggerPagination } from '../TriggerPagination/TriggerPagination';
import { IPagination } from '../../Types/IPagination';

interface IManagerShowData<T> {
  state: IStateShowData
  data: JSX.Element,
  scrool?: boolean | undefined,
  pagination?: IPagination<T>,
  setPagination?: React.Dispatch<React.SetStateAction<IPagination<T>>>
}

const style: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  width: 'inherit',
  height: '100%',
}


export const ManagerShowData = <T,>({
  data,
  state,
  scrool,
  pagination,
  setPagination,
}: IManagerShowData<T>) => {
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
          width={'100%'}
          height={'100%'}
        />
      </div>
    case 'SUCCESS':
      return scrool === undefined || scrool
        ? <ScroolCustom id="scrool-container">
          {data}
          <TriggerPagination
            elementId="trigger-load-data"
            setPagination={setPagination as React.Dispatch<React.SetStateAction<IPagination<T>>>}
            rootId="scrool-container"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              id="trigger-load-data"
              style={{
                padding: "10px",
                margin: "5px",
                width: "87dvw",
              }}
            >
              {
                pagination?.hasMore
                  ? <CircularProgress size="0px" />
                  : <Alert
                    severity="info"
                    sx={{
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "600"
                    }}
                  >Não há mais dados para carregar</Alert>
              }
            </div>
          </div>
        </ScroolCustom>
        : data
  }
}
