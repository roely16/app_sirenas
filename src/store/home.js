const namespaced = true

const state = {
    search: null
}

const mutations = {
    setSearch: (state, payload) => {
        state.search = payload
    }
}

export default {
    namespaced,
    state,
    mutations
}