

export const validationToken = (nbf: number, exp: number) => {
  const currentTime = Math.floor(Date.now() / 1000)
  if (currentTime < nbf) return false
  if (currentTime > exp) return false
  return true
}