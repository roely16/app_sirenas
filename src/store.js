/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
	state: {
		sirenas: [],
		corredores: []
	},
	mutations: {

		setSirenas(state, payload){

			state.sirenas = payload

		},
		setCorredores(state, payload){

			state.corredores = payload

		}

	},
	actions: {

		getSirenas(state, payload){

			axios.post(process.env.VUE_APP_API_URL, {
				name: 'obtener_sirenas',
				param: {
					id_corredor: payload
				}
			}).then((response) => {

				this.commit('setSirenas', response.data.response.result)

			})

		},
		getCorredores(){

			axios.post(process.env.VUE_APP_API_URL, {
				name: 'obtener_corredores',
				param: {}
			}).then((response) => {

				this.commit('setCorredores', response.data.response.result)

			})

		}

	},
	getters: {

		getSirenas: state => state.sirenas,
		getCorredores: state => state.corredores

	}
})
