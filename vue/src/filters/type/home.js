export function claimType (type) {
  let result = ''
  switch (type) {
    case 'V' :
      result = '绿色通道任务'
      break
    case 'U' :
      result = '重大风险案件'
      break
    default :
      result = '其他案件任务'
  }
  return result
}

export function riskTypeFilter (type) {
  let result = ''
  switch (type) {
    case '1' :
      result = '新任务'
      break
    case '2' :
      result = '调查中'
      break
    case '3' :
      result = '调查完成'
      break
    case '4' :
      result = '审核完成'
      break
    default :
      result = '审核完成'
  }
  return result
}
