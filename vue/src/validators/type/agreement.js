const cycleRules = (rule, value, callback) => {
  var cycleRules = RegExp(/^(?:1[0-2]|[1-9])$/)
  if (cycleRules.test(value)) {
    callback()
  } else {
    callback(new Error('只能输入 1-12'))
  }
}
export const settlecycleValidator = [
  {
    validator: cycleRules, trigger: 'blur'
  }
]
