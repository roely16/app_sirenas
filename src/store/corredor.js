import Swal from 'sweetalert2'

import axios from 'axios'

const namespaced = true

const state = {
    corredores: []
}

const mutations = {
    setCorredores: (state, payload) => {
        state.corredores = payload
    }
}

const actions = {

    async obtenerCorredores({commit}){

        try {
            
            const data = {
                name: 'obtener_corredores',
				param: {}
            }

            const response = await axios.post(process.env.VUE_APP_API_URL, data)

            commit('setCorredores', response.data.response.result)

        } catch (error) {
            
            console.log(error)

        }

    },
    async estadoCorredor(state, payload){
        
        try {
            
            payload.loading = true

            const data = {
                name: 'estado_corredor',
                param: {
                    id: payload.ID,
                    estado: payload.enable
                }
            }

            const response = await axios.post(process.env.VUE_APP_API_URL, data)

            if(response.data.response.status === 200){

                // Actualizar el estado de las sirenas
                payload.sirenas.forEach(sirena => {
                    sirena.enable = payload.enable
                });

                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    title: 'Excelente!',
                    text: 'La actualización se ha realizado de manera exitosa.',
                    icon: 'success',
                })

            }

            payload.loading = false

        } catch (error) {
            
            payload.loading = false
            payload.enable = !payload.enable

            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                title: 'Lo sentimos...',
                text: error,
                icon: 'error',
            })

        }
        
    },
    async estadoSirena(state, payload){

        try {
            
            payload.loading = true

            const data = {
                name: 'estado_sirena',
                param: {
                    id: payload.ID,
                    estado: payload.enable
                }
            }

            const response = await axios.post(process.env.VUE_APP_API_URL, data)

            if (response.data.response.status === 200) {
                
                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    title: 'Excelente!',
                    text: 'La actualización se ha realizado de manera exitosa.',
                    icon: 'success',
                })

            }

            payload.loading = false

        } catch (error) {
            
            payload.loading = false
            payload.enable = !payload.enable

            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                title: 'Lo sentimos...',
                text: error,
                icon: 'error',
            })

        }

    },
    checkConnection(state, payload){

        const url = 'http://' + payload.IP

        fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        })
        .then(function(response) {
            return response;
        })
        .then(function(myJson) {
            // eslint-disable-next-line no-console
            console.log(myJson);
        })
        .catch(function(error){
            // eslint-disable-next-line no-console
            console.log(error)
        });

    }

}

export default {
    namespaced,
    state,
    mutations,
    actions
}