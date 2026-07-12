/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";
import { Box } from "@mui/material";
import { renderList } from "../../Utils/cardsList";

export default function ListContainer({
  elements,
  componentToShow
}: {
  elements: any[];
  componentToShow: ComponentType<any>;
}) {

  return <Box
    sx={{
      padding: "10px",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    }}
  >
    {renderList(elements, componentToShow)}
  </Box>
}
