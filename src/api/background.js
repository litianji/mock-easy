const {chrome} = window

let background = () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.getBackgroundPage((background) => {
      if (!background) {
        reject(new Error('background error'))
      }
      resolve(background)
    })
  })
}

export {
  background
}
