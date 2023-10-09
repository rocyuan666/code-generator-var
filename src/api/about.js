import { request } from '@/utils/request'

export function getCaptcha(params) {
  return request({
    url: '/captcha',
    method: 'get',
    params,
  })
}
