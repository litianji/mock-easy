const { chrome } = window
// 保存项目数据
function saveProject (projectList) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({'projectList': projectList}, function () {
      getProject().then(data => {
        resolve(data)
      })
    })
  })
}

function saveApiLists (apiLists) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ apiLists }, function () {
      getApiLists().then(data => {
        resolve(data)
      })
    })
  })
}

function getProject () {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('projectList', (data) => {
      resolve(data.projectList)
    })
  })
}

function getApiLists (id) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('apiLists', (data) => {
      if (data) {
        resolve(id ? data.apiLists[id] : data.apiLists)
      } else {
        resolve({})
      }
    })
  })
}

function delProject (id) {
  return new Promise((resolve, reject) => {
    // 删除项目
    getProject().then(data => {
      if (!data || !data.length) {
        return
      }
      if (id) {
        data = data.filter(item => item._id !== id)
      } else {
        data = []
      }
      saveProject(data).then(left => {
        resolve(left)
        delApiList(id)
      })
    })
  })
}

function delApiList (id) {
  return new Promise((resolve, reject) => {
    getApiLists().then(data => {
      if (!data) {
        return
      }

      if (id) {
        delete data[id]
      } else {
        data = {}
      }

      saveApiLists(data).then(left => {
        resolve(left)
      })
    })
  })
}

function updateApi ({projectId, mock}) {
  return new Promise((resolve, reject) => {
    getApiLists().then(data => {
      if (!data) {
        return reject(data)
      }

      if (data[projectId]) {
        data[projectId].mock = mock
        saveApiLists(data)
        return resolve(data)
      }
    })
  })
}

function getConfig () {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('config', (data = {}) => {
      if (data) {
        resolve(data.config || {})
      } else {
        reject(data)
      }
    })
  })
}

function saveConfig (config) {
  return new Promise((resolve, reject) => {
    getConfig().then(data => {
      let _config = { ...data, ...config }
      chrome.storage.local.set({ 'config': _config }, (data) => {
        resolve(data)
      })
    })
  })
}

window.saveProject = saveProject
window.saveApiLists = saveApiLists
window.getProject = getProject
window.getApiLists = getApiLists
window.delProject = delProject
window.updateApi = updateApi
window.getConfig = getConfig
window.saveConfig = saveConfig

export {
  saveProject,
  saveApiLists,
  getProject,
  delProject,
  delApiList,
  updateApi,
  getConfig,
  saveConfig
}
