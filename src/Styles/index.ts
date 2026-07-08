import { SxProps, Theme } from "@mui/material";
import { fullSize } from "../Utils/sizesDevices";

export const ElementLink: SxProps<Theme> = {
  color: "#6C757D",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 400,
  fontSize: "small",
  textDecoration: "none",

  "&:hover": {
    fontWeight: 700,
    color: "#0D6EFD"
  }
}

export const ElementButton: SxProps<Theme> = {
  color: "#6C757D",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 400,
  fontSize: "small",
  textTransform: "none",

  "&:hover": {
    fontWeight: 700,
    textTransform: "none"
  }
}

export const GroupButtonsActions: SxProps<Theme> = {
  position: "sticky",
  bottom: 0,
  display: "flex",
  padding: "10px",
  width: "100%",
  height: "7dvh",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "space-evenly",
  maxWidth: fullSize,
}

export const ScroolCustom: SxProps<Theme> = {
  flex: "1",
  height: "100%",
  width: "100%",
  overflowY: "auto",
  scrollBehavior: "auto",

  "::-webkit-scrollbar": {
    width: "5px"
  },
  "::-webkit-scrollbar-track": {
    background: "#f1f1f1"
  },
  "::-webkit-scrollbar-thumb": {
    background: "rgb(159 159 159)",
    borderRadius: "10px"
  }
}