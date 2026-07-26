import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from "@mui/material"
import { ICustomer } from "../../../../Types/ICustomer"
import { fullSize } from "../../../../Utils/sizesDevices"

import PersonIcon from '@mui/icons-material/Person';
import { showPrice } from "../../../../Utils/showPrice"
import CustomerReceivedDetailsCard from "./Components/Card"


export default function CustomerReceivedDetails({
  item,
  expanded,
  onChange
}: {
  item: ICustomer,
  expanded: string | undefined,
  onChange: (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => void
}) {

  const isNotPendent = (item.amountToPay || 0) <= 0

  return <Accordion
    expanded={expanded === `${item.id}`}
    onChange={onChange(`${item.id}`)}
    square
    key={`${item.id}-${item.dateCreated}`}
    sx={{
      width: "100%",
      maxWidth: fullSize,
      borderRadius: "8px",
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <PersonIcon
            style={{
              backgroundColor: '#E6F2FD',
              color: '#3896f3',
              borderRadius: '15px',
              padding: '6px',
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <Typography sx={{
              flexShrink: 0,
              fontWeight: 550,
              fontSize: "18px",
            }}
              color="textPrimary"
            >
              {item.name}
            </Typography>
            <Typography sx={{
              flexShrink: 0,
              fontWeight: 400,
              fontSize: "12px",
            }}
              color="textSecondary"
            >
              {`${item.payments?.length} pagamento(s)`}
            </Typography>
          </Box>
          <Chip
            label={isNotPendent ? "Quitado" : "Pendente"}
            sx={{
              height: 25,
              margin: 0,
              fontWeight: 550,
              color: isNotPendent ? "#3BA366" : "#df3a3a",
              border: isNotPendent ? "1px solid #3BA366" : "1px solid #df3a3a",
              backgroundColor: isNotPendent ? "#E9F5EF" : "#fbebeb"
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <Typography sx={{
            flexShrink: 0,
            fontWeight: 400,
            fontSize: "12px",
          }}
            color="textSecondary"
          >
            {isNotPendent ? "RECEBIDO" : "A PAGAR"}
          </Typography>
          <Typography sx={{
            flexShrink: 0,
            fontWeight: 550,
            fontSize: "18px",
            color: isNotPendent ? "#3BA366" : "#df3a3a"
          }}
          >
            {showPrice(
              item.amountToPay !== undefined && item.amountToPay > 0
                ? item.amountToPay
                : item.payments?.reduce((accumulator, item) => {
                  return accumulator += item.value
                }, 0) || 0
            )}
          </Typography>
        </Box>
      </Box>
    </AccordionSummary>
    <AccordionDetails>
      {
        item.payments?.map((buy) => {
          return <CustomerReceivedDetailsCard buy={buy}/>
        })
      }
    </AccordionDetails>
  </Accordion>
}
