const validateSpecial = (rule, value, callback) => {
  var containSpecial = RegExp(/[( )(~)(!)(#)($)(%)(^)(&)(*)(()())(+)(=)([)(\])({)(})(|)(\\)(;)(:)(')(")(,)(/)(<)(>)(?)]+/)
  if (containSpecial.test(value)) {
    callback(new Error('用户名中不能包含特殊字符'))
  } else {
    callback()
  }
}

export const cardTypeValidator = [
  {
    required: true, message: '请选择证件类型', trigger: 'change'
  }
]

export const cardNoValidator = [
  {
    required: true, message: '请输入证件号', trigger: 'change'
  }
]
// 黑灰名单类型
export const bgtypeValidator = [
  {
    required: true, message: '请选择黑灰名单类型', trigger: 'change'
  }
]
// 证件类型
export const IDtypeValidator = [
  {
    required: true, message: '请选择证件类型', trigger: 'change'
  }
]
// 渠道
export const channelValidator = [
  {
    required: true, message: '请选择渠道号', trigger: 'change'
  }
]
export const nameValidator = [
  {
    required: true, message: '请输入姓名', trigger: 'change'
  },
  {
    validator: validateSpecial, message: '请输入正确的姓名', trigger: 'change'
  }
]

// 大于零的正则
// const validatebiggerzero = (rule, value, callback) => {
//   var containSpecial = RegExp(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/)
//   if (containSpecial.test(value)) {
//     callback(new Error('输入的金额必须大于0'))
//   } else {
//     callback()
//   }
// }
// export const biggerzeroValidator = [
//   {
//     required: true, message: '请输入缴费金额', trigger: 'blur'
//   },
//   {
//     validator: biggerZero, trigger: 'blur'
//   }
// ]

// 证件号码
export const IdentificationValidator = [
  {
    required: true, message: '请输入证件号码', trigger: 'change'
  },
  {
    min: 3, max: 20, message: '证件号码长度必须在3-20位之间', trigger: 'change'
  }
]
export const noEmptyValidator = [
  {
    required: true, message: '必填项不能为空', trigger: 'change'
  }
]

export const emptyValidator = [
  {
    required: true, message: '必填项不能为空', trigger: 'change'
  }
]

// 手机号校验
const validateSpecialPhone = (rule, value, callback) => {
  if (value !== '') {
    var containSpecialPhone = RegExp(/^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\\d{8})$/)
    if (containSpecialPhone.test(value)) {
      callback(new Error('手机号不符合规范'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 手机号校验
export const phoneNumberValidator = [
  {
    min: 11, max: 11, message: '手机号码长度必须为11位', trigger: 'change'
  },
  {
    validator: validateSpecialPhone, trigger: 'change'
  }
]

const idValidator = (rule, value, callback) => {
  // var containSpecial = RegExp(/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/)
  var containSpecial = RegExp(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)
  if (!containSpecial.test(value)) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}
export const IdValidator = [
  {
    required: true, message: '请输入证件号码', trigger: 'change'
  },
  {
    validator: idValidator, trigger: 'change'
  }
]
const postValidator = (rule, value, callback) => { // 邮编校验
  if (value !== '' && value !== undefined && value !== null) {
    var containSpecial = RegExp(/\d{6}(?!\d)/)
    if (!containSpecial.test(value)) {
      callback(new Error('请输入正确的邮编'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 邮编校验规则
export const PostValidator = [
  // {
  //   min: 6, max: 6, message: '邮编长度应为六位', trigger: 'change'
  // },
  {
    validator: postValidator, trigger: 'blur'
  }
]

const phoneValidator = (rule, value, callback) => { // 固话校验
  console.log(value)
  if (value !== '' && value !== null && value !== undefined) {
    var containSpecial = RegExp(/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/)
    if (!containSpecial.test(value)) {
      callback(new Error('请输入正确的固定电话！'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 校验固话
export const PhoneValidator = [
  {
    validator: phoneValidator, trigger: 'change'
  }
]

const insureModPremium = (rule, value, callback) => { // 险种信息校验 ----- 加费金额
  if (value !== '') {
    const validateNumZero = RegExp(/(^[0-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/)
    if (!validateNumZero.test(value)) {
      callback(new Error('此金额值不能小于0，请仔细检查！'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export const insModPremiumValidator = [ // 保单修改保险金额
  {
    validator: insureModPremium, trigger: 'change'
  }
]
