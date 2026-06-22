import { Box, Button, Typography } from "@mui/material"
import dayjs from "dayjs"
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


type ProductBaseInfoProps = {
  name: string;
  description: string;
  dateCreated: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductBaseInfo({
  dateCreated,
  description,
  name,
  setOpenModal
}: ProductBaseInfoProps) {

  return <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }}
    key={`${dateCreated}-${name}`}
  >
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "inherit"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 600,
          }}
        >{name}</Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: '#4f535f',
          }}
        >{description}</Typography>
      </div>
      <Button
        color="info"
        variant="text"
        size="small"
        sx={{
          backgroundColor: "#E6F2FD",
          borderRadius: "12px",
          minHeight: "42px",
          minWidth: "42px"
        }}
        onClick={() => { setOpenModal(true) }}
      >
        <EditIcon sx={{ width: '25px' }} />
      </Button>
    </Box>
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "6px",
        alignItems: "center"
      }}
    >
      <CalendarTodayIcon sx={{ width: "14px", color: "#4f535f" }} />
      <Typography
        sx={{
          fontSize: "13px",
          color: "#4f535f"
        }}
      >
        {`Incluido em: ${dayjs(dateCreated).format('DD/MM/YYYY HH:MM')}`}
      </Typography>
    </Box>
  </Box>
}
