import { form, loading } from '@props'

export const props = { 
  form, 
  loading, 
  groupings: { type: Array, default: () => [] }
}

export const rules = { 
  groupingId: [{ required: true, message: '请选择分组', trigger: 'change' }],
  content: [{ required: true, message: '请输入申请内容', trigger: 'blur' }],
}
