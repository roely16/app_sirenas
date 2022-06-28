<template>
        <b-card bg-variant="light" border-variant="light" class="shadow p-1 mb-3 bg-white rounded card-pointer">
            <b-row align-v="center">
                <b-col cols="10" @click="mostrarDetalle(data)">
                    <b-card-text>
                        {{ data.NOMBRE }}
                    </b-card-text>
                    <b-card-text>
                        <span class="badge badge-light pl-0">
                            <font-awesome-icon size="xs" :color="data.estado.color" icon="circle" />
                            {{ data.estado.text }}
                        </span>
                        <span class="badge badge-success ml-2">
                            {{ data.estado.result }}
                        </span>
                    </b-card-text>
                </b-col>
                <b-col cols="2">
                    <b-spinner v-if="data.loading" type="grow" small label="Spinning"></b-spinner>
                    <b-form-checkbox v-else @change="estadoCorredor(data)" size="lg" v-model="data.enable" switch></b-form-checkbox>
                </b-col>
            </b-row>

            <div v-if="data.expand" class="mt-4">
                <b-row>
                    <b-col cols="12">
                        <acciones-corredor></acciones-corredor>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col>
                        <lista-sirenas :data="data"></lista-sirenas>
                    </b-col>
                </b-row>
            </div>
           
        </b-card>
</template>

<style scoped>
    .card-pointer{
        cursor: pointer;
    }
</style>

<script>

import AccionesCorredor from '@/components/AccionesCorredor'
import ListaSirenas from '@/components/ListaSirenas'

import { mapMutations, mapActions } from 'vuex'

export default {
    props: {
        data: Object
    },
    components: {
        'acciones-corredor': AccionesCorredor,
        'lista-sirenas': ListaSirenas
    },
    methods: {
        ...mapMutations({
            'setDetalleCorredor': 'corredor/setDetalleCorredor'
        }),
        ...mapActions({
            'estadoCorredor': 'corredor/estadoCorredor'
        }),
        mostrarDetalle(){
            this.data.expand = !this.data.expand
        }
    }
}
</script>