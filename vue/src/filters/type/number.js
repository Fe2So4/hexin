export function numberString (number) {
  return number.toFixed ? number.toLocaleString() : number
}

export function numberPercent (number) {
  return number.toFixed ? (number * 100).toFixed(2) + '%' : number
}

export function numberFixed (number, fixNum) {
  return number.toFixed ? number.toFixed(fixNum || 2) : number
}
