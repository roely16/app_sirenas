const namespaced = true

const state = {}

const mutations = {}

const actions = {

    goAction(state, payload){

        payload.loading[payload.key_loading] = !payload.loading[payload.key_loading]
        
    }

}

export default {
    namespaced,
    state,
    mutations,
    actions
}