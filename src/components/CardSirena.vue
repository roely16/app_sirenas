<template>
    <b-card border-variant="light" class="shadow p-1 mb-2 rounded">
        <b-row align-v="center">
           <b-col @click="mostrarDetalle(data)" cols="10">
                <b-card-text class="pb-0 mb-0">
                    {{ data.NOMBRE }}
                </b-card-text>
                <small class="font-weight-light">
                    {{ data.DIRECCION }}
                </small>

                <b-card-text  v-if="!data.testing">
                    <span class="badge badge-light pl-0">
                        <font-awesome-icon size="xs" :color="data.estado.color" icon="circle" />
                        {{ data.estado.text }}
                        <b-spinner class="ml-2" variant="primary" v-if="data.sending" small label="Spinning"></b-spinner>
                    </span>
                </b-card-text>

                <b-card-text v-else>
                    <span class="badge badge-light pl-0">
                        Probando conexión...
                        <b-spinner class="ml-2" variant="primary" type="grow" small label="Spinning"></b-spinner>
                    </span>
                </b-card-text>
           </b-col>
           <b-col cols="2">
                <b-spinner v-if="data.loading" type="grow" small label="Spinning"></b-spinner>
                <b-form-checkbox v-else @change="estadoSirena(data)" v-model="data.enable" switch></b-form-checkbox>
           </b-col>
        </b-row>

        <b-row align-v="center" v-show="data.expand" class="mt-4">
            <b-col cols="12">
                <acciones :disabled="!data.enable" :sirens="data.enable ? [data] : []"></acciones>
            </b-col>
            
        </b-row>
    </b-card>
</template>

<script>

import Acciones from '@/components/AccionesCorredor'

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    props: {
        data: Object
    },
    components: {
        'acciones': Acciones
    },
    methods: {
        ...mapActions({
            'checkConnection': 'corredor/checkConnection',
            'estadoSirena': 'corredor/estadoSirena'
        }),
        ...mapMutations({
            'setSirensProcess': 'actions/setSirensProcess'
        }),
        mostrarDetalle(){

            this.data.expand = !this.data.expand

        }
    },
    computed: {
        ...mapState({
            action_name: state => state.actions.action_name
        })
    },
    watch: {
        'data.sending'(value){

            if (value) {
                
                let self = this

                // Obtener la información de conexión en base a la acción ejecutada
                let action = this.data.acciones[this.action_name]

                var details = action.body
                var url = action.url

                var formBody = [];

                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                
                formBody = formBody.join("&");

                const { timeout = 8000 } = {timeout: 6000};

                const controller = new AbortController();
                const id = setTimeout(() => controller.abort(), timeout);

                try {

                    fetch(url, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formBody,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        timeout: 1000,
                        signal: controller.signal
                    })
                    .then(function(response) {
                        return response;
                    })
                    .then(function() {
                        // eslint-disable-next-line no-console
                        self.setSirensProcess(self.data) 
                        self.data.sending = false
                        
                    })
                    .catch(function(){
                        // eslint-disable-next-line no-console
                        self.setSirensProcess(self.data) 
                        self.data.sending = false
                        
                    });

                    clearTimeout(id)

                } catch (error) {
                    
                    // self.setSirensProcess(this.data) 
                    self.data.sending = false

                }
                
            }            

        }
    },
    mounted(){

        if (this.data) {
            
            this.checkConnection(this.data)

        }

    }
}
</script>