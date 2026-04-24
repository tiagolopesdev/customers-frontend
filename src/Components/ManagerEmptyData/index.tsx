import { Typography } from "@mui/material"

interface EmptyDataProps {
  title: string
  subtitle: string
  condition: boolean
  dataToShow: JSX.Element
}

export const EmptyData = (
  {
    condition,
    title,
    subtitle,
    dataToShow
  }: EmptyDataProps) => {
  return condition ?
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {subtitle}
      </Typography>
    </div>
    : dataToShow
}
