import { isEmail } from '@utils/regular.js'

/* 昵称 */
export const nickname = [
  { required: true, message: '请输入昵称', trigger: 'blur' }
]
/* 性别 */
export const sex = [
  { required: true, message: '请选择性别', trigger: 'change' }
]
/* 邮箱 */
const checkEmail = (_rule, value, callback) => {
  if (!isEmail(value)) {
    callback(new Error('请输入正确的邮箱地址'))
  }
  callback()
}
export const email = [
  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
  { validator: checkEmail, trigger: 'blur' }
]
/* 验证码 */
export const captcha = [
  { required: true, message: '请输入验证码', trigger: 'blur' }
]
