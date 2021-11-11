/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-26 08:28:30
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 20:31:37
 */
import service from '@/utils/request'

/**
 * @description: 获取分组好友
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function listApi() {
  return service({
    url: '/im/conversation/list',
    method: 'get'
  })
}

/**
 * @description: 添加聊天会话
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function createApi(params) {
  return service({
    url: '/im/conversation/create',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除聊天会话
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function deleteApi(params) {
  return service({
    url: '/im/conversation/delete',
    method: 'post',
    data: params
  })
}
