
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export const ObjectIsEquals = (firstObject: Object, secondObject: Object): boolean => {  
  
  //Comparar a quantidade de atributos
  if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
    return false
  }
 
  return (Object.keys(firstObject) as (keyof typeof firstObject)[]).every((key) => {

    const firstValue = firstObject[key];
    const secondValue = secondObject[key];

    if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
      return (
        firstValue.length === secondValue.length &&
        firstValue.every((element, index) => ObjectIsEquals(element, secondValue[index]))
      )
    }

    // Compara valores primitivos
    return firstValue === secondValue;
  })
}
