const {chrome} = window

let bk = null

let background = () => {
  return new Promise((resolve, reject) => {
    if (bk) {
      return resolve(bk)
    }
    chrome.runtime.getBackgroundPage((background) => {
      if (!background) {
        reject(new Error('background error'))
      }
      bk = background
      resolve(background)
    })
  })
}

export {
  background
}
