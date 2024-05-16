import { form, loading } from '@props'
import { email, captcha } from '@rules/user'

export const props = { form, loading }

export const rules = { email, captcha }
