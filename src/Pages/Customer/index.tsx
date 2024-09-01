import { TextField } from "@mui/material"
import { Footer } from "../../Components/Footer"
import { Values } from "../../Components/Values"
import { ShoppingCard } from "../../Components/Cards/Shopping"


export const Customer = () => {

  return <div
    style={{
      display: 'flex',
      flexDirection: "column",
      height: '100vh',
      alignItems: "center"
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        maxWidth: '95vw',
        minWidth: '45vw',
        height: '100vh',
        display: 'flex',
        // justifyContent: "space-between",
        flexDirection: "column",
        padding: '25px',
      }}
    >
      <div>
        <TextField
          id="standard-basic"
          variant="standard"
          style={{
            width: '100%',
            marginBottom: '20px'
          }}
        />
        <Values amountPaid={234} amountToPay={8667} />
      </div>
      <ShoppingCard />
      <ShoppingCard />
    </div>
    <div
      style={{
        display: "flex",
        flex: 1
      }}
    >
      <Footer isOnlyBack />
    </div>
  </div>
}
