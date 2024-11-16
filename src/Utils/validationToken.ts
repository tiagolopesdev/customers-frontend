

export const validationToken = (nbf: number, exp: number) => {
  return (exp * 1000) < Date.now() || (nbf * 1000) > Date.now() ? 
    false : 
    true
}