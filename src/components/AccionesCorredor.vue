<template>
    <div>
        <b-button @click="setAction('starting')" class="mr-2" variant="danger" :disabled="loading.starting || disabled">
            <b-spinner v-if="loading.starting" small></b-spinner>
            <font-awesome-icon v-else icon="play" />
        </b-button>
        <b-button @click="setAction('alerting')" class="mr-2" variant="warning" :disabled="loading.alerting || disabled">
            <b-spinner v-if="loading.alerting" small></b-spinner>
            <font-awesome-icon v-else icon="exclamation-triangle" />
        </b-button>
        <b-button @click="setAction('stopping')" variant="secondary" :disabled="loading.stopping || disabled">
            <b-spinner v-if="loading.stopping" small></b-spinner>
            <font-awesome-icon v-else icon="stop" />
        </b-button>
    </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    props: {
        sirens: Array,
        disabled: Boolean
    },
    data(){
        return{
            loading: {
                starting: false,
                alerting: false,
                stopping: false
            }
        }
    },
    methods: {
        ...mapActions({
            goAction: 'actions/goAction'
        }),
        setAction(action){

            const data = {
                key_loading: action,
                loading: this.loading,
                sirens: this.sirens
            }

            this.goAction(data)

        }
    }
}
</script>