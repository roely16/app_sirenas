<template>
    <div>
        <b-button @click="setAction('encender')" class="mr-2" variant="danger" :disabled="(loading.encender && !all_finish) || disabled">
            <b-spinner v-if="(loading.encender && !all_finish)" small></b-spinner>
            <font-awesome-icon v-else icon="play" />
        </b-button>
        <b-button @click="setAction('intermitente')" class="mr-2" variant="warning" :disabled="(loading.intermitente && !all_finish) || disabled">
            <b-spinner v-if="(loading.intermitente && !all_finish)" small></b-spinner>
            <font-awesome-icon v-else icon="exclamation-triangle" />
        </b-button>
        <b-button @click="setAction('apagar')" variant="secondary" :disabled="(loading.apagar && !all_finish) || disabled">
            <b-spinner v-if="(loading.apagar && !all_finish)" small></b-spinner>
            <font-awesome-icon v-else icon="stop" />
        </b-button>
    </div>
</template>

<script>

import { mapActions, mapState, mapMutations } from 'vuex'

export default {
    props: {
        sirens: Array,
        disabled: Boolean
    },
    data(){
        return{
            loading: {
                encender: false,
                intermitente: false,
                apagar: false
            }
        }
    },
    methods: {
        ...mapActions({
            goAction: 'actions/goAction'
        }),
        ...mapMutations({
            'setSending': 'actions/setSending'
        }),
        setAction(action){

            const data = {
                key_loading: action,
                loading: this.loading,
                sirens: this.sirens
            }

            this.goAction(data)

        }
    },
    computed: {
        ...mapState({
            sending: state => state.actions.sending,
            sirens_process: state => state.actions.sirens_process,
            action_name: state => state.actions.action_name
        }),
        all_finish: function(){

            if (this.sirens_process.length == this.sirens.length) {
                
                this.loading[this.action_name] = false 
                
                return true

            }

            return false

        }
    }
}
</script>