import { Button, Card, CardContent, Typography } from "@mui/material"
import { useState } from "react";
import { ShoppingModal } from "../../Modals/Shopping";
import { TableComponent } from "../../Table";
import { PaymentsModal } from "../../Modals/Payments";


// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number
// ) {
//   return { name, calories, fat, carbs };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24),
//   createData('Ice cream sandwich', 237, 9.0, 37),
//   createData('Eclair', 262, 16.0, 24),
//   createData('Cupcake', 305, 3.7, 67),
//   createData('Gingerbread', 356, 16.0, 49),
//   createData('Gingerbread', 356, 16.0, 49),
//   createData('Gingerbread', 356, 16.0, 49),
//   createData('Gingerbread', 356, 16.0, 49),
//   createData('Gingerbread', 356, 16.0, 49),
// ];

export const PaymentsCard = () => {

  const [open, setOpen] = useState(false);

  const handleStateModal = () => setOpen(!open)

  return <>
    <Card sx={{
      minWidth: '35vw',
      maxWidth: '90vw',
      minHeight: '32vh',
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
            width: '100%',
            marginBottom: '15px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 650
            }}
          >
            Pagamentos
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
          <Button
            variant="contained"
            color="success"
            onClick={() => { handleStateModal() }}
          >Adicionar</Button>
        </div>
        <TableComponent 
          tableCell={[
            { name: 'Valor', align: 'left' },
            { name: 'Data e horário', align: 'center' }
          ]}
          tableRows={[
            {
              rows: [
                { name: 'dsdsdsdsds', align: 'left'},
                { name: 'jkgjhjgh', align: 'center'},
              ]
            },
            {
              rows: [
                { name: 'dsdsdsdsds', align: 'left'},
                { name: 'jkgjhjgh', align: 'center'},
              ]
            }
          ]}
        />        
      </CardContent>
    </Card>
    {
      open ?
        <PaymentsModal
          open={open}
          setOpen={setOpen}
        /> :
        ''
    }
  </>
}
