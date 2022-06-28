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

                <b-card-text>
                    <span class="badge badge-light pl-0">
                        <font-awesome-icon size="xs" :color="data.estado.color" icon="circle" />
                        {{ data.estado.text }}
                    </span>
                </b-card-text>
           </b-col>
           <b-col cols="2">
                <b-spinner v-if="data.loading" type="grow" small label="Spinning"></b-spinner>
                <b-form-checkbox v-else @change="estadoSirena(data)" v-model="data.enable" switch></b-form-checkbox>
           </b-col>
        </b-row>

        <b-row v-if="data.expand" class="mt-4">
            <b-col>
                <acciones></acciones>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>

import Acciones from '@/components/AccionesCorredor'

import { mapActions } from 'vuex'

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
        mostrarDetalle(){

            this.data.expand = !this.data.expand

        }
    }
}
</script>