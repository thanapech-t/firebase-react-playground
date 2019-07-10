import queryString from 'querystring'
// import moment from './moment-buddhist'

// import addressData from '../static/data/address_data.json'

// moment.locale('th')

export const isPassword = value => {
  const upperRegex = /[A-Z]+/
  const lowerRegex = /[a-z]+/
  const alphabetRegex = /[0-9]+/
  const scopeCharactorRegex = /^[A-Za-z0-9@#]+$/
  return (
    upperRegex.test(value) &&
    lowerRegex.test(value) &&
    alphabetRegex.test(value) &&
    scopeCharactorRegex.test(value)
  )
}

export const isPasswordNoon = value => {
  const length = 6
  return value.length >= length
}

// export const getThaiDate = date => {
//   const d = new Date(date)
//   d.setFullYear(parseInt(d.getFullYear()) + 543)
//   return moment(d).format('ll')
// }

export const isNull = value => value === undefined || value === null

export const isEmpty = value =>
  value === '' || (value instanceof Object && Object.keys(value).length === 0)
export const isBlank = value => isNull(value) || isEmpty(value)
export const isPresent = value => !isBlank(value)

export const isPhoneNumber = value => {
  var s = value

  if (!value) {
    return value
  }

  if (s.length < 10) {
    return false
  }

  const reg = /0[896][0-9]{8}/
  return reg.test(s)
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const isEmail = value => emailRegex.test(value)

const intOrFloatRegex = /[+-]?[0-9][0-9]*/
export const isNumber = value => intOrFloatRegex.test(value)

// export const generateAddressStructure = addressData => {
//   var obj = []
//   addressData.map((province, i) =>
//     province[1].map((district, j) =>
//       district[1].map((subDistrict, k) =>
//         subDistrict[1].map((postcode, l) => {
//           var newObj = {
//             value: {
//               province: province[0],
//               district: district[0],
//               subDistrict: subDistrict[0],
//               postcode: `${postcode}`,
//             },
//             label: `${province[0]} >> ${district[0]} >> ${
//               subDistrict[0]
//             } >> ${postcode}`,
//           }
//           obj.push(newObj)
//         }),
//       ),
//     ),
//   )
//   return obj
// }

// export const addressStructure = generateAddressStructure(addressData)

export const displayNumber = value => {
  let nums = ('' + value).split('.')
  const onlyNums = nums[0].replace(/[^-\d]/g, '')
  let rgx = /(\d+)(\d{3})/
  let x1 = onlyNums
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  if (nums.length > 1) x1 = x1 + '.' + nums[1]
  return x1
}

export const lessThan = (value, maxValue) => {
  var nums = ('' + value).split('.')
  const onlyNums = nums[0].replace(/[^\d]/g, '')
  let NewOnlyNums
  if (onlyNums <= maxValue) NewOnlyNums = onlyNums
  else NewOnlyNums = maxValue.toString()
  var rgx = /(\d+)(\d{3})/
  var x1 = NewOnlyNums
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  if (nums.length > 1) x1 = x1 + '.' + nums[1]
  return x1
}

export const inRange = (a, b) => (value, previousValue) => {
  if (!value) {
    return a
  }
  if (parseFloat(value) < a) {
    return a
  }
  if (parseFloat(value) > b) {
    return b
  }
  var x1 = (!isNaN(parseFloat(value)) ? parseFloat(value) : value) + ''
  return x1
}

export const validId = (id = '') => {
  if (id.length !== 13) return false
  var checksum = id.split('').reduce((mem, char, i) => {
    if (i !== 12) {
      return mem + parseInt(char) * (13 - i)
    } else return mem
  }, 0)
  checksum = (11 - (checksum % 11)) % 10
  return checksum === parseInt(id[12])
}

export const hiddenPhoneFormatter = number => {
  if (!number) return ''
  // NNN-NNN-NNNN
  const splitter = /.{1,3}/g
  const hidden = /.{1,6}/
  number = number.replace(/[^\d|^X]/g, '')
  if (number === '') return ''
  number = number.substring(0, 10)
  const arrayN = number.split('')
  const replaceX = collectX => collectX + 'X'
  const collectArray = arrayN.reduce(replaceX, '')
  number = number.replace(hidden, collectArray.substring(0, 6))

  return (
    number
      .substring(0, 7)
      .match(splitter)
      .join('-') + number.substring(7)
  )
}

export const creditCardFormatter = number => {
  const pattern = 'XXXX-XXXX-XXXX-XXXX'
  return formatter(pattern, number)
}

// Parser

export const formatParser = string => (string ? string.replace(/-/g, '') : '')
export const numberParser = string =>
  parseFloat(string ? string.replace(/,/g, '') : '')

export const dateParser = string => (string ? string.replace(/\//g, '') : '')

// Formatter

export const idFormatter = number => {
  if (!number) return ''
  // I-IIII-IIIII-II-I
  number = number.replace(/[^\d]/g, '')
  if (number === '') return ''

  const pattern = 'X-XXXX-XXXXX-XX-X'
  return formatter(pattern, number)
}

export const ThaiDateFormatter = date => {
  if (!date) return ''

  date = date.replace(/[^\d]/g, '')
  if (date === '') return ''

  const pattern = 'XX/XX/XXXX'
  return formatter(pattern, date)
}

export const phoneFormatter = number => {
  if (!number) return ''
  // NNN-NNN-NNNN
  const splitter = /.{1,3}/g
  number = number.replace(/[^\d]/g, '')
  if (number === '') return ''
  number = number.substring(0, 10)
  return (
    number
      .substring(0, 7)
      .match(splitter)
      .join('-') + number.substring(7)
  )
}

export const formatter = (pattern = '', number = '') => {
  return pattern.split('').reduce(
    (mem, c) => {
      if (number.length < mem.i + 1) {
        return mem
      }
      if (c === 'X')
        return {
          i: mem.i + 1,
          result: (mem.result += number[mem.i]),
        }
      else {
        return {
          i: mem.i,
          result: (mem.result += c),
        }
      }
    },
    { i: 0, result: '' },
  ).result
}

export const onlyEng = (value, previousValue) => {
  const eng = /^[a-zA-Z]*$/
  if (eng.test(value)) return value
  return previousValue
}

export const onlyThai = (value, previousValue) => {
  const eng = /^[ก-ฮะาิีึ์ุูโเแ์ำัฯืฺไใาๆ่้๊๋็]*$/
  if (eng.test(value)) return value
  return previousValue
}

// export const getAge = birthdate =>
//   moment().diff(
//     typeof birthdate === 'string' && birthdate
//       ? moment(birthdate, 'DD-MM-BBBB')
//       : birthdate,
//     'years',
//   )

export const getValueFormOptions = (options = [], value) => {
  const selected = options.find(o => o.value === value)
  if (selected) return selected.label
  return ''
}

export const url2Obj = params => queryString.parse(params)
export const obj2Url = params => queryString.stringify(params)

export const normalizeDate = value => {
  return value
}

export const filterObj = (object = {}, filter = []) =>
  Object.keys(object)
    .filter(key => filter.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key]
      return obj
    }, {})

export const removefilterObj = (object = {}, filter = []) =>
  Object.keys(object)
    .filter(key => !filter.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key]
      return obj
    }, {})

export const convertNaNtoZero = arg =>
  isNaN(parseInt(arg)) ? 0 : parseInt(arg)
