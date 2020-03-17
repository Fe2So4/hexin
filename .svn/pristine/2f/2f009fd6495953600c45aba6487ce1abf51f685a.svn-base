import { Message, MessageBox } from 'element-ui'

/**
 * @description 对象键值进行排序
 * */
export function keysSort (param) {
  const obj = {}
  const paramKeys = Object.keys(param).sort()
  for (const i in paramKeys) {
    obj[paramKeys[i]] = param[paramKeys[i]]
  }
  return obj
}

/**
 * @description 删除提示
 * @param name 名称
 * @param method 删除方法
 * */
export function removeConfirm (name, method) {
  MessageBox.confirm(`此操作将删除此${name}, 是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    method()
  }).catch(() => {
    Message({
      type: 'info',
      message: '已取消删除'
    })
  })
}
/**
 * @description 操作调用接口成功
 * @param tip 提交名称
 */
export function apiSuccess (tip) {
  // 消息提示
  Message({
    type: 'success',
    message: `${tip}成功!`
  })
}

/**
 * @description 过滤word文档多余字符
 * @param content 内容
 * */
export function wordContentFilters (content) {
  content = content.replace(/(\n)/g, '')
  content = content.replace(/(\t)/g, '')
  content = content.replace(/(\r)/g, '')
  content = content.replace(/<meta(\n|.)*?>/ig, '')
  content = content.replace(/<!(\n|.)*?>/ig, '')
  content = content.replace(/<style[^>]*>(\n|.)*?<\/style>/ig, '')
  content = content.replace(/<script[^>]*>(\n|.)*?<\/script>/ig, '')
  content = content.replace(/<w:[^>]+>(\n|.)*?<\/w:[^>]+>/ig, '')
  content = content.replace(/<xml>(\n|.)*?<\/xml>/ig, '')
  content = content.replace(/\r\n|\n|\r/ig, '')
  content = content.replace(/<\/?[^>]*>/g, '')
  content = content.replace(/\s*/g, '')
  return content
}

/**
 * @description 格式化金额
 * @param number: 要格式化的数字
 * @param decimals: 保留几位小数
 * @param decPoint: 小数点符号
 * @param thousandsSep: 千分位符号
 * @param roundtag: 舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
 * */
export function formatAmount (
  number,
  decimals,
  decPoint,
  thousandsSep,
  roundtag
) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  roundtag = roundtag || 'ceil' // "ceil","floor","round"
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''
  function toFixedFix (n, prec) {
    const k = Math.pow(10, prec)
    return (
      '' +
      parseFloat(
        Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
      ) /
        k
    )
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * @description 转化时间为刚刚、几分钟前、几小时前……
 * @param time 接口传过来的时间
 * */
export function getDateDiff (dateTimeStamp) {
  dateTimeStamp = dateTimeStamp + ''
  dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/g, '/'))
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  // const halfamonth = day * 15
  const month = day * 30
  const now = new Date().getTime()
  const diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    // 若日期不符则弹出窗口告之
    // alert("结束日期不能小于开始日期！");
  }
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute
  if (monthC >= 1) {
    return parseInt(monthC) + '个月前'
  } else if (weekC >= 1) {
    return parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    return parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    return parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    return parseInt(minC) + '分钟前'
  } else {
    return '刚刚'
  }
}

export const appId = '123'

export const appType = '123'

/**
 * @description 转化为 xx|xx|xx 形式字符串
 */
export function paramsToString (paramsList) {
  let params = ''
  const length = paramsList.length
  paramsList.forEach((i, index) => {
    if (index === length - 1) {
      params += i
    } else {
      params += i + '|'
    }
  })
  return params
}
