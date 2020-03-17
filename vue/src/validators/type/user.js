const validateSpecial = (rule, value, callback) => {
  var containSpecial = RegExp(/[( )(~)(!)(#)($)(%)(^)(&)(*)(()())(+)(=)([)(\])({)(})(|)(\\)(;)(:)(')(")(,)(/)(<)(>)(?)()]+/)
  if (containSpecial.test(value)) {
    callback(new Error('用户名中不能包含特殊字符'))
  } else {
    callback()
  }
}
const validatePassWordNum = (rule, value, callback) => {
  const validateNum = RegExp(/^[1-9]\d*$/)
  if (validateNum.test(value)) {
    callback(new Error('密码不能为纯数字'))
  } else {
    callback()
  }
}
const validatePassWordUpper = (rule, value, callback) => {
  if (value.toUpperCase() === value || value.toLowerCase() === value) {
    callback(new Error('密码必须包含大小写字母混合'))
  } else {
    callback()
  }
}
export const userNameValidator = [
  {
    required: true, message: '请输入用户名', trigger: 'change'
  },
  {
    min: 3, max: 20, message: '用户名长度必须在3-20位之间', trigger: 'change'
  },
  {
    validator: validateSpecial, trigger: 'change'
  }
]
export const passWordValidator = [
  {
    required: true, message: '请输入密码', trigger: 'change'
  },
  {
    min: 6, max: 20, message: '密码长度必须在6-20位之间', trigger: 'change'
  },
  {
    validator: validatePassWordNum, trigger: 'change'
  },
  {
    validator: validatePassWordUpper, trigger: 'change'
  }
]
const biggerZero = (rule, value, callback) => {
  const validateNumZero = RegExp(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/)
  if (!validateNumZero.test(value)) {
    callback(new Error('此金额必须大于0，请仔细检查!'))
  } else {
    callback()
  }
}
// 只能为数字
const onlyNumber = (rule, value, callback) => {
  const validateonlyNum = RegExp(/^[0-9]*$/)
  if (!validateonlyNum.test(value)) {
    callback(new Error('只能输入数字'))
  } else {
    callback()
  }
}
export const biggerzeroValidator = [
  {
    required: true, message: '请输入缴费金额', trigger: 'change'
  },
  {
    validator: biggerZero, trigger: 'change'
  }
]
export const biggerzeroValidator2 = [
  {
    required: true, message: '请输入缴费金额', trigger: 'change'
  }
]
//  保险金额校验
export const riskPremiumValidator = [
  {
    validator: biggerZero, trigger: 'change'
  }
]
const insurtypenumber = (rule, value, callback) => { // 险种信息校验的份数
  if (value !== '') {
    // const validateNumZero = RegExp(/^[+]{0,1}(\d+)$/)
    const validateNumZero = RegExp(/^[1-9]\d*$/)
    if (!validateNumZero.test(value)) {
      callback(new Error('此金额必须大于0，请仔细检查!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const insurtypenumberValidator = [
  {
    validator: insurtypenumber, trigger: 'change'
  }
]
export const inputOnlyNumber = [
  {
    validator: onlyNumber, trigger: 'change'
  }
]
const insurtypeaddPremium = (rule, value, callback) => { // 险种信息校验 -----应缴保费
  if (value !== '') {
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
const insurtypeaddPremium2 = (rule, value, callback) => { // 险种信息校验 -----应缴保费
  // const validateNumZero = RegExp(/^\d+(\.\d{0,2})?$/)
  // const validateNumZero = RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/)
  const validateNumZero = RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/)
  if (!validateNumZero.test(value) && value !== '0' && value !== 0) {
    callback(new Error('请输入最多保留两位小数的数字！'))
    // callback(new Error('此金额必须大于0，请仔细检查'))
  } else {
    callback()
  }
}
export const insurtypeaddPremiumValidator = [
  {
    required: true, message: '必填项不能为空！', trigger: 'change'
  },
  {
    validator: insurtypeaddPremium, trigger: 'change'
  }
]
export const insurtypeaddPremiumValidator2 = [
  {
    validator: insurtypeaddPremium2, trigger: 'change'
  }
]
// const insurtypeaddPremium1 = (rule, value, callback) => { // 险种信息校验 ----- 加费金额
//   if (value !== '') {
//     // const validateNumZero = RegExp(/^\d+(\.\d{0,2})?$/)
//     const validateNumZero = RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/)
//     if (!validateNumZero.test(value)) {
//       callback(new Error('请输入大于等于0的两位小数！!'))
//     } else {
//       callback()
//     }
//   } else {
//     callback()
//   }
// }
export const insurtypeaddPremiumValidator1 = [
  {
    validator: insurtypeaddPremium2, trigger: 'change'
  }
]
const letterNumber = (rule, value, callback) => {  // 投保单号大写字母和数字的校验
  const validateNumZero = RegExp(/^[A-Z\d]+$/)
  if (!validateNumZero.test(value)) {
    callback(new Error('投保单号只能是数字或大写字母!'))
  } else {
    callback()
  }
}
export const letterNumberValidator = [
  {
    required: true, message: '请输入投保单号', trigger: 'change'
  },
  {
    validator: letterNumber, trigger: 'change'
  }
]
export const billNumberValidator = [
  {
    required: true, message: '请输入保单号', trigger: 'change'
  },
  {
    validator: letterNumber, trigger: 'change'
  }
]

const phone = (rule, value, callback) => { // 固定电话校验
  console.log(value)
  if (value !== '') {
    // const validateNumZero = RegExp(/0\d{2,3}-\d{7,8}/)
    const validateNumZero = RegExp(/^((0\d{2,3})-)(\d{7,8})$/)
    if (!validateNumZero.test(value)) {
      callback(new Error('固定电话格式错误，请重新输入!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const phoneValidator = [
  {
    validator: phone, trigger: 'change'
  }
]
const introtype = (rule, value, callback) => { // 介绍人类型的正则
  if (value !== '') {
    const validateNumZero = RegExp(/^[A-Z]+$/)
    if (!validateNumZero.test(value)) {
      callback(new Error('只能输入大写字母!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const introTypeValidator = [
  {
    max: 10, message: '不能超过十位', trigger: 'change'
  },
  {
    validator: introtype, trigger: 'change'
  }
]
const email = (rule, value, callback) => { // 邮箱的正则
  if (value !== '' && value !== null && value !== undefined) {
    const validateNumZero = RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/)
    if (!validateNumZero.test(value)) {
      callback(new Error('邮箱格式不正确!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const emailValidator = [
  {
    validator: email, trigger: 'change'
  }
]
const fene = (rule, value, callback) => { // 收益份额
  // if (value !== '') {
  //   const validateNumZero = RegExp(/^100$|^(\d|[1-9]\d)(\.\d+)*$/)
  //   if (!validateNumZero.test(value)) {
  //     callback(new Error('不能填写大于100的值!'))
  //   } else {
  //     callback()
  //   }
  // } else {
  //   callback()
  // }
  const validateNumZero = RegExp(/^100$|^(\d|[1-9]\d)(\.\d+)*$/)
  if (!validateNumZero.test(value)) {
    callback(new Error('不能填写大于100的值!'))
  } else {
    callback()
  }
}
export const benefitValidator = [
  {
    required: true, message: '请输入受益份额', trigger: 'change'
  },
  {
    validator: fene, trigger: 'change'
  }
]
