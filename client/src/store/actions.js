import axios from 'axios'

const actions = {
  requestBestItems ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/humor')
        .then((res) => {
          if (res && res.data && res.data.items && res.data.items.length > 0) {
            commit('clearBestItems')
            commit('setBestItems', res.data.items)
          }
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default actions
