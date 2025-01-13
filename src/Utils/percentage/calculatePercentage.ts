import { enviroments } from "../../config/enviroments";

export const calculetePercentage = (value: number): string => (value + (value * (Number(enviroments.PERCENTAGE_CARD) / 100))).toFixed(2)
