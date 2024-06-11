export const APPLY_STATUS = {
  AUDIT: 0,
  PASS: 1,
  REJECT: 2,
}
export const applyStatusList = [
  { label: '待审核', value: APPLY_STATUS.AUDIT },
  { label: '已通过', value: APPLY_STATUS.PASS },
  { label: '已拒绝', value: APPLY_STATUS.REJECT },
]

export const APPLY_TYPE = {
  FRIEND: 0, // 申请加好友
  GROUP: 1, // 申请加群
}

