import { Box, Typography } from "@mui/material";
import { containerStyleDinamic, labelStyleDinamic } from "./style";

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


type ProductSalesAnalysisProps = {
  quantity: number;
  value: number;
  quantitySold: number;
  basePrice: number;
}

export default function ProductSalesAnalysis({
  basePrice,
  quantity,
  quantitySold,
  value
}: ProductSalesAnalysisProps) {

  return <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-evenly"
      }}
    >
      <Box
        sx={containerStyleDinamic}
      >
        <label style={labelStyleDinamic}>
          <InventoryIcon sx={{ width: "18px", color: "#767F8E" }} />
          Estoque
        </label>
        <span
          style={{ fontWeight: 700 }}
        >
          {quantity}
        </span>
      </Box>
      <Box
        sx={containerStyleDinamic}
      >
        <label style={labelStyleDinamic}>
          <LocalOfferIcon sx={{ width: "18px", color: "#0288D1" }} />
          Preço Uni.
        </label>
        <span
          style={{ fontWeight: 700 }}
        >
          {value.toFixed(2)}
        </span>
      </Box>
      <Box
        sx={containerStyleDinamic}
      >
        <label style={labelStyleDinamic}>
          <ShoppingBagIcon sx={{ width: "18px", color: "#46AF7B" }} />
          Vendidos
        </label>
        <span
          style={{ fontWeight: 700 }}
        >
          {quantitySold}
        </span>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px"
        }}
      >
        <TrendingUpIcon sx={{ width: "20px", color: "#46AF7B" }} />
        <Typography
          sx={{
            fontSize: "14px",
            color: "#4f535f"
          }}
        >
          Compra <strong>R${basePrice.toFixed(2)}</strong>
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end"
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "#4f535f"
          }}
        >Lucro</Typography>
        <Typography
          sx={{
            color: "#46AF7B",
            fontSize: "16px",
            fontWeight: 600
          }}
        >
          {`R$${((value - basePrice) * quantitySold).toFixed(2)}`}
        </Typography>
      </Box>
    </Box>
  </Box>
}