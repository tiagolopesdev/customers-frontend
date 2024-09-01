import { CustomerCardList } from "../../Components/Cards/Customer/customerList"
import { Footer } from "../../Components/Footer"
import { ScroolCustom } from "../../Styles"


export const Customer = () => {

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
      <Footer isOnlyBack/>
    </div>
  </div>
}
