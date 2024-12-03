

export const validationToken = (nbf: number, exp: number) => {

  const currentTime = Math.floor(Date.now() / 1000)

  return currentTime < nbf || currentTime > exp ? false : true
}