import { Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
  createData('Gingerbread', 356, 16.0, 49),
  createData('Gingerbread', 356, 16.0, 49),
  createData('Gingerbread', 356, 16.0, 49),
  createData('Gingerbread', 356, 16.0, 49),
];

export const ShoppingCard = () => {

  return <Card sx={{
    minWidth: '35vw',
    maxWidth: '90vw',
    minHeight: '35vh',
    maxHeight: '30vh',
    backgroundColor: "#EFEFEF",
    marginTop: '10px'
  }}
  >
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
        padding: "8px",
        '&:last-child': {
          paddingBottom: "8px"
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: "space-between",
          width: '100%'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 650
          }}
        >
          Compras
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 650,
            color: "#64BC6D"
          }}
        >
          R$ 00,00
        </Typography>
        <Button>Adicionar</Button>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 300
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ padding: 0 }}>
            <TableRow>
              <TableCell colSpan={1} sx={{ padding: 1, width: '5px' }} align="left">Produto</TableCell>
              <TableCell colSpan={1} sx={{ padding: 1, width: '10px' }} align="center">Quant.</TableCell>
              <TableCell colSpan={1} sx={{ padding: 1, width: '10px' }} align="center">Preço Uni.</TableCell>
              <TableCell colSpan={1} sx={{ padding: 1, width: '10px' }} align="right">Preço Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell colSpan={1} sx={{ padding: 1 }} component="th" scope="row">{row.name}</TableCell>
                <TableCell sx={{ padding: 1 }} align="center">{row.calories}</TableCell>
                <TableCell sx={{ padding: 1 }} align="center">{row.fat}</TableCell>
                <TableCell sx={{ padding: 1 }} align="right">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
}
