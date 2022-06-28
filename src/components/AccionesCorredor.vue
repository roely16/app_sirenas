<template>
    <div>
        <b-button @click="setAction('starting')" class="mr-2" variant="danger" :disabled="loading.starting">
            <b-spinner v-if="loading.starting" small></b-spinner>
            <font-awesome-icon v-else icon="play" />
        </b-button>
        <b-button @click="setAction('alerting')" class="mr-2" variant="warning" :disabled="loading.alerting">
            <b-spinner v-if="loading.alerting" small></b-spinner>
            <font-awesome-icon v-else icon="exclamation-triangle" />
        </b-button>
        <b-button @click="setAction('stopping')" variant="secondary" :disabled="loading.stopping">
            <b-spinner v-if="loading.stopping" small></b-spinner>
            <font-awesome-icon v-else icon="stop" />
        </b-button>
    </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
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
                loading: this.loading
            }

            this.goAction(data)

        }
    }
}
</script>