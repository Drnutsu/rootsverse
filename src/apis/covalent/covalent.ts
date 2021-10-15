import URL from './url'

export const url = (path: string, params?: unknown) => {
  return URL(process.env.REACT_APP_COVALENT_ENDPOINT, path, params)
}
