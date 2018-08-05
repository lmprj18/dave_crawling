import axios from 'axios'

export const get = ({
  url,
  opt = undefined
}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, opt)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const post = ({
  url, 
  opt = undefined
}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, opt)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

export const put = ({
  url,
  opt = undefined
}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, opt)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reejct(err)
    })
  })
}
  
export const del = ({
  url,
  opt = undefined
}) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, opt)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
