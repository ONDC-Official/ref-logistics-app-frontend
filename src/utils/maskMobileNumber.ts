export const maskMobileNumber = (num: string) => {
  if (typeof num === 'string' && num.length >= 10) {
    const firstTwo = num.slice(0, 2)
    const lastFour = num.slice(-3)
    const maskedNumber = `${firstTwo}****${lastFour}`
    return maskedNumber
  } else {
    return num
  }
}
