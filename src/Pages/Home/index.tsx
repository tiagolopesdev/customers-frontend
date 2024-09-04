import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { Footer } from "../../Components/Footer"
import { Navbar } from "../../Components/Navbar"
import { ScroolCustom } from "../../Styles"


export const Home = () => {

  return <div
    style={{
      display: 'flex',
      flexDirection: "column",
      height: '100dvh',
    }}
  >
    <Navbar />
    <ScroolCustom>
      <CustomerCardList />
    </ScroolCustom>
    <div
      style={{
        display: "flex",
        flex: 1
      }}
    >
      <Footer />
    </div>
  </div>
}
