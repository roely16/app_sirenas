/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
	state: {
		sirenas: [],
		corredores: [],
		corredores_seleccionados: []
	},
	mutations: {

		setSirenas(state, payload){

			state.sirenas = payload

		},
		setCorredores(state, payload){

			state.corredores = payload

		},
		setCorredoresSeleccionados(state, payload){
			state.corredores_seleccionados = payload
		},
		quitarCorredor(state, payload){

			state.corredores.push(payload)

			// Quitar del listado de seleccionados
			let result = state.corredores_seleccionados.filter(item => item.ID != payload.ID)

			state.corredores_seleccionados = result
		}

	},
	actions: {

		getSirenas({state}, payload){

			let result = state.corredores.filter(corredor => corredor.ID == payload)

			if (result.length > 0) {
				
				result = result[0]

				// Solicitar las sirenas de este corredor
				
				axios.post(process.env.VUE_APP_API_URL, {
					name: 'obtener_sirenas',
					param: {
						id_corredor: payload
					}
				}).then((response) => {
	
					// this.commit('setSirenas', response.data.response.result)
					result.sirenas = response.data.response.result
	
				})

				state.corredores_seleccionados.unshift(result)

				let restantes = state.corredores.filter(corredor => corredor.ID != payload)

				state.corredores = restantes

			}

		},
		getCorredores(){

			axios.post(process.env.VUE_APP_API_URL, {
				name: 'obtener_corredores',
				param: {}
			}).then((response) => {

				this.commit('setCorredores', response.data.response.result)

			})

		},
		expandCorredor({state}, payload){

			let result = state.corredores_seleccionados.filter(item => item.ID == payload.ID)

			if (result.length > 0) {
				
				result = result[0]

				result.expand = !result.expand

			}
		}

	},
	getters: {

		getSirenas: state => state.sirenas,
		getCorredores: state => state.corredores,
		getCorredoresSeleccionados: state => state.corredores_seleccionados

	}
})
