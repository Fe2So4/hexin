const validateNum = (rule, value, callback) => {
  const relNum = RegExp(/^[0-9]+$/)
  if (!relNum.test(value) && value !== '') {
    callback(new Error('请输入正整数！'))
  } else {
    callback()
  }
}

const saveDecimal = (rule, value, callback) => {
  if (value !== '' && value !== null && value !== undefined) {
    // const validateNumZero = RegExp(/^\d+(\.\d{0,2})?$/)
    // const validateNumZero = RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/)
    const validateNumZero = RegExp(/^((\d+\.\d*[1-9]\d{1})|(\d*[1-9]\d*\.\d{2}))$/)
    if (!validateNumZero.test(value)) {
      callback(new Error('请输入大于0的两位小数！'))
      // callback(new Error('此金额必须大于0，请仔细检查'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export const numValidator = [
  {
    validator: validateNum, trigger: 'blur'
  }
]

export const noValidator = [
  {
    required: false, message: '', trigger: 'change'
  }
]

export const decimalValidator = [
  {
    validator: saveDecimal, trigger: 'blur'
  }
]
