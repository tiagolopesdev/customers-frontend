import { userChannel } from "../Bases/api"


export const getToken = async (email: string) => {
  try {

    const response = await userChannel.post("api/Token", { email })

    return response.data

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('MEer ', error)
    throw new Error(error.response.data)
  }
}
