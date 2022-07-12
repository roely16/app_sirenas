import Swal from 'sweetalert2'

const namespaced = true

const state = {
    sending: false,
    sirens_process: [],
    action_name: null
}

const mutations = {
    setSending: (state, payload) => {
        state.sending = payload
    },
    setSirensProcess: (state, payload) => {
        state.sirens_process.push(payload)
    },
    clearSirensProcess: (state) => {
        state.sirens_process = []
    },
    setActionName: (state, payload) => {
        state.action_name = payload
    }
}

const actions = {

    goAction({commit}, payload){

        commit('clearSirensProcess')

        // Preguntar al usuario si esta seguro 
        Swal.fire({
            title: '¿Está seguro?',
            text: "Se ejecutará la acción en las sirenas seleccionadas!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#808080',
            confirmButtonText: 'EJECUTAR!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {

            if (result.isConfirmed) {
                
                commit('setActionName', payload.key_loading)
                payload.loading[payload.key_loading] = !payload.loading[payload.key_loading]

                commit('setSending', payload.loading[payload.key_loading])

                payload.sirens.forEach(siren => {
            
                    siren.sending = true
        
                });

            }

          })        
        
    }

}

export default {
    namespaced,
    state,
    mutations,
    actions
}