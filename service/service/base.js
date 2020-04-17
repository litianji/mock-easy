const { chrome } = window
const timeout = 2000
// chrome api to promise
export default class BaseStorage {
  static set (data) {
    return new Promise((resolve, reject) => {
      if (!data) {
        reject(new Error('can not find data!'))
      }
      let timer = setTimeout(() => {
        reject(new Error('set storage.local time out!'))
      }, timeout)
      chrome.storage.local.set(data, () => {
        clearTimeout(timer)
        resolve(data)
      })
    })
  }

  static get (key) {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        reject(new Error('get storage.local time out!'))
      }, timeout)

      chrome.storage.local.get(key, (data = {}) => {
        clearTimeout(timer)
        if (key) {
          resolve(data[key])
        } else {
          resolve(data)
        }
      })
    })
  }

  static remove (key) {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        reject(new Error('remove storage.local time out!'))
      }, timeout)
      chrome.storage.local.remove(key, () => {
        clearTimeout(timer)
        resolve(key)
      })
    })
  }

  static createId () {
    return new Date().getTime().toString(16)
  }
}
