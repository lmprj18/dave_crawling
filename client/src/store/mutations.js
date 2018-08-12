const mutations = {
  clearBestItems (state) {
    state.bestItems = []
  },
  setBestItems (state, payload) {
    state.bestItems = payload
  }
}

export default mutations
