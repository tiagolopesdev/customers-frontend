import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { Footer } from "../../Components/Footer"
import { ScroolCustom } from "./style"


export const Home = () => {

  return <div
    style={{
      display: 'flex',
      flexDirection: "column",
      height: '100vh',
    }}
  >
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
