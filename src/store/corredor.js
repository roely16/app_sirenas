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
    async checkConnection(state, payload){

        try {
            
            payload.testing = true

            const { timeout = 8000 } = {timeout: 6000};

            const url = 'http://' + payload.IP + ':8888'

            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            await fetch(url, {
                method: 'GET',
                mode: 'no-cors',
                timeout: 1000,
                signal: controller.signal
            })

            clearTimeout(id)

            payload.testing = false
            
            payload.estado = {
                'color': 'green',
                'text': 'En Línea',
                'loss': 0,
            }

        } catch (error) {
            
            payload.estado = {
                'color': 'red',
                'text': 'Sin conexión',
                'loss': 100
            }
            payload.testing = false

        }

    }

}

const getters = {

    getEnableSirens(){

        let sirenas = []

        state.corredores.forEach(corredor => {
            
            // Buscar aquellas sirenas que están activas y que se pueden activar con fetch
            let result = corredor.sirenas.filter(sirena => sirena.enable) 

            result.forEach(element => {
                sirenas.push(element)
            });

        });

        return sirenas

    }

}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}