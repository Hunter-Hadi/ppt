import isURL from 'validator/lib/isURL'

export const checkIsDomain = (domain: string) => {
  if (!domain) {
    return false
  }
  return isURL(domain)
}
export const domain2HttpsDomain = (domain: string, filterExtension = false) => {
  if (!domain) {
    return ''
  }
  if (domain.search(/^http[s]?:\/\//) == -1) {
    domain = 'https://' + domain
  }
  if (filterExtension) {
    domain = domain.replace(/\.(json)+$/i, '')
  }
  return domain
}

/**
 * base64 to blob
 */
export function dataURItoBlob(dataURI: string) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0] // mime类型
  const byteString = self.atob(dataURI.split(',')[1]) //base64 解码
  const arrayBuffer = new ArrayBuffer(byteString.length) //创建缓冲数组
  const intArray = new Uint8Array(arrayBuffer) //创建视图

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: mimeString })
}

export const currency2CurrencySymbol = (currency: string, locale = 'en-US') => {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    })
    let symbol
    formatter.formatToParts(0).forEach(({ type, value }) => {
      if (type === 'currency') {
        symbol = value
      }
    })
    return symbol
  } catch (e) {
    return undefined
  }
}
