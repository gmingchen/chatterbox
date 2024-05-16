import { form, loading } from '@props'
import { nickname, sex, email, captcha, } from '@rules/user'

export const props = { form, loading }

export const rules = { nickname, sex, email, captcha, }
