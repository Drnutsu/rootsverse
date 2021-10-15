export const stageKey = 'STAGE'

const hasKey = (key: string) => {
  const result = localStorage.getItem(key)
  if (!result) return false
  try {
    return !!JSON.parse(result)
  } catch (e) {
    return false
  }
}

export const getOrSetLocalStorageItem = <T>(
  key: string,
  defaultItem?: T
): T | undefined => {
  if (!hasKey(key)) {
    const setResult = setLocalStorageItem(key, defaultItem)
    if (!setResult) return undefined
  }
  try {
    const str = localStorage.getItem(key)
    return JSON.parse(str) as T
  } catch (e) {
    return undefined
  }
}

export const setLocalStorageItem = <T>(key: string, item: T): T | undefined => {
  try {
    const serializedMsg = JSON.stringify(item)
    localStorage.setItem(key, serializedMsg)
    return item
  } catch (e) {
    console.error(e)
    return undefined
  }
}
