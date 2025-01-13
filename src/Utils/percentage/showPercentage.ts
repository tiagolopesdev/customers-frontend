import { enviroments } from "../../config/enviroments"
import { calculetePercentage } from "./calculatePercentage"

export const showPercentage = (showValue: boolean, paymentMethod: string, value: number): string => {
  if (showValue) {
    return paymentMethod === 'CARD' ?
      `${value.toFixed(2)} (${calculetePercentage(value)})` :
      `${value.toFixed(2)}`
  } else {
    return paymentMethod === 'CARD' ?
      `${paymentMethod} (${enviroments.VITE_CUSTOMER_API.replace('.', ',')}3,58%)` :
      `${paymentMethod}`
  }
}
