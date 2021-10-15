/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires*/
import qs from 'qs'

export default function url(url, path, params) {
  const queryParams = qs.stringify(params)
  return `${url}${path || ''}?${queryParams}`
}
