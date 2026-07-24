import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from "@mui/material"
import formatDate from "../../../../Utils/formatDate"
import { showPercentage } from "../../../../Utils/percentage/showPercentage"
import { ICustomer } from "../../../../Types/ICustomer"
import { fullSize } from "../../../../Utils/sizesDevices"


export default function CustomerReceivedDetails({
  item,
  expanded,
  onChange
}: {
  item: ICustomer,
  expanded: string | undefined,
  onChange: (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => void
}) {


  return <Accordion
    expanded={expanded === `${item.id}`}
    onChange={onChange(`${item.id}`)}
    sx={{
      width: "100%",
      maxWidth: fullSize
    }}
  >
    <AccordionSummary
      id="panel1bh-header"
      sx={{
        '.MuiAccordionSummary-content': {
          display: 'flex',
          justifyContent: 'space-between',
        }
      }}
    >
      <Typography sx={{
        flexShrink: 0,
        fontWeight: 550,
        fontSize: 19,
      }}
        color="textPrimary"
      >
        {item.name}
      </Typography>
      <Typography color="error">{`Valor à pagar R$${item.amountToPay !== undefined ? item.amountToPay.toFixed(2) : 0}`}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {
        item.payments?.map((buy) => {
          return <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: 5,
            backgroundColor: '#eeeeee',
            padding: '5px',
            borderRadius: '5px'
          }}>
            <div style={{ display: 'flex' }}>
              <Typography sx={{
                fontSize: 18,
                fontWeight: 550
              }}
                color="success"
              >
                {`R$ ${showPercentage(true, buy.paymentMethod, buy.value)}`}
              </Typography>
              <Chip
                sx={{ height: 25, margin: '0px 5px', fontWeight: 550 }}
                label={buy.updatedBy}
                color='default'
                variant='filled'
              />
            </div>
            <div style={{ display: 'flex', marginLeft: '15px' }}>
              <Chip
                sx={{ height: 18, fontWeight: 550, marginTop: '5px', marginRight: '10px' }}
                label={showPercentage(false, buy.paymentMethod, buy.value)}
                color='success'
                variant='filled'
              />
              <Chip
                sx={{ height: 18, fontWeight: 550, marginTop: '5px' }}
                label={formatDate(buy.dateCreated as string)}
                color='info'
                variant='outlined'
              />
            </div>
          </div>
        })
      }
    </AccordionDetails>
  </Accordion>
}
