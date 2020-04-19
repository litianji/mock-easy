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

let choosefolder = () => {
  return new Promise((resolve, reject) => {
    chrome.fileSystem.chooseEntry({type: 'openDirectory'}, (entry) => {
      if (entry) {
        resolve(entry)
      } else {
        reject(entry)
      }
    })
  })
}

// 用于储存
let retainstr = (entry) => {
  return chrome.fileSystem.retainEntry(entry)
}

// 完整路径
let displayPath = (entry) => {
  return new Promise((resolve, reject) => {
    chrome.fileSystem.getDisplayPath(entry, (path) => {
      resolve(path)
    })
  })
}

export {
  background,
  choosefolder,
  displayPath,
  retainstr
}
