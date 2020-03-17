export function sexType (type) {
  return parseInt(type) === 1 ? '男' : '女'
}

export function checkType (type) {
  let result = ''
  switch (type) {
    case '1' :
      result = '审核通过'
      break
    case '2' :
      result = '审核不通过'
      break
    case '3' :
      result = '待审核'
      break
  }
  return result
}

// 折标系数审核状态
export function rateCheckType (type) {
  let result = ''
  switch (type) {
    case '1' :
      result = '待审核'
      break
    case '2' :
      result = '审核通过'
      break
    case '3' :
      result = '审核不通过'
      break
  }
  return result
}

// 证件类型
export function certificateType (type) {
  let result = ''
  switch (type) {
    case '1' :
      result = '身份证'
      break
    case '2' :
      result = '户口簿'
      break
    case '3' :
      result = '军官证'
      break
    case '4' :
      result = '驾驶证'
      break
    case '5' :
      result = '护照'
      break
    case '6' :
      result = '港澳居民来往大陆通行证'
      break
    case '7' :
      result = '台湾居民来往大陆通行证'
      break
    case '8' :
      result = '其他'
      break
    case '9' :
      result = '出生医学证明'
      break
  }
  return result
}

// 保单状态
export function policyStatusType (type) {
  let result = ''
  switch (type) {
    case '1' :
      result = '未承保'
      break
    case '2' :
      result = '有效'
      break
    case '3' :
      result = '拒保'
      break
    case '4' :
      result = '退保'
      break
    case '5' :
      result = '犹退'
      break
    case '6' :
      result = '失效'
      break
    case '7' :
      result = '永久失效'
      break
    case '8' :
      result = '理赔中'
      break
    case '9' :
      result = '理赔终止'
      break
    case '10' :
      result = '减额交清'
      break
    case '11' :
      result = '交清'
      break
    case '12' :
      result = '交清'
      break
    case '13' :
      result = '到期终止'
      break
    case '14' :
      result = '死亡理赔'
      break
  }
  return result
}

// 主附险标识
export function mainFlagType (type) {
  let result = ''
  switch (type) {
    case '1' :
      result = '主险'
      break
    case '0' :
      result = '附险'
      break
    case '3' :
      result = '主/附险'
      break
  }
  return result
}

// 缴费频率
export function payFrequencyType (type) {
  let result = ''
  switch (type) {
    case '0' :
      result = '天缴'
      break
    case '1' :
      result = '月缴'
      break
    case '2' :
      result = '季缴'
      break
    case '3' :
      result = '年缴'
      break
    case '4' :
      result = '趸交'
      break
    case '5' :
      result = '半年缴'
      break
  }
  return result
}
