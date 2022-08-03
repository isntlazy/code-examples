export default () => {
  const withCurrency = (amount) => {
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const percentDiffValue = (toCompare, comparingWith) => {
    if (comparingWith === 0) {
      return ''
    }
    const percentResult = Math.round(((toCompare - comparingWith) / comparingWith) * 100)
    let formattedStr = ''
    if (percentResult === 0) {
      return formattedStr
    }
    if (percentResult > 0) {
      return `(+${percentResult}%)`
    }
    return `(${percentResult}%)`
  }
  return { withCurrency, percentDiffValue }
}