import service from '@/utils/request'
import { OSS_BASE_URL } from '@/utils/constants'

export function emojiApi() {
  return service({
    url: `${ OSS_BASE_URL }/im/emoji.txt`,
    method: 'get'
  })
}
