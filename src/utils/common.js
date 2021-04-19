export const getAverage = (...args) => {

 const sum = args.reduce((prevNumber, currentNumber) => {
   return +prevNumber + +currentNumber
 })

 return sum / args.length
}

export const getNumberFormat = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ` `)
}
