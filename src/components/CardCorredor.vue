<template>
        <b-card bg-variant="light" border-variant="light" class="shadow p-1 mb-3 bg-white rounded card-pointer">
            <b-row align-v="center">
                <b-col cols="10" @click="mostrarDetalle(data)">
                    <b-card-text>
                        {{ data.NOMBRE }}
                    </b-card-text>
                    
                    <b-card-text v-if="!estado.testing">
                        <span class="badge badge-light pl-0">
                            <font-awesome-icon size="xs" :color="estado.color" icon="circle" />
                            {{ estado.text }}
                        </span>
                        <span :class="'badge badge-' + estado.variant + ' ml-2'">
                            {{ estado.result }}
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
                    <b-form-checkbox v-else @change="estadoCorredor(data)" size="lg" v-model="data.enable" switch></b-form-checkbox>
                </b-col>
            </b-row>

            <div v-show="data.expand" class="mt-4">
                <b-row>
                    <b-col cols="12">
                        <acciones-corredor :disabled="!data.enable" :sirens="enableSirens"></acciones-corredor>
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
    },
    computed: {
        enableSirens(){
            
            let result = this.data.sirenas.filter(sirena => sirena.enable)

            return result

        },
        estado(){

            // Obtener el estado de cada una de las sirenas (testing)
            
            let testing = this.data.sirenas.filter(sirena => sirena.testing)

            if (testing.length > 0) {
                
                return {
                    'testing': true
                }

            }

            // Determinar cuantas sirenas tienen conexión
            let sin_conexion = this.data.sirenas.filter(sirena => sirena.estado.loss == 0)

            // Si todas no tienen conexión
            if (sin_conexion.length > 0 && sin_conexion.length == this.data.sirenas.length) {
                
                return {
                    'color': 'green',
                    'variant': 'success',
                    'text': 'En Línea',
                    'result': this.data.sirenas.length + '/' + this.data.sirenas.length,
                    'testing': false
                }

            }
            
            if(sin_conexion.length > 0 && sin_conexion.length < this.data.sirenas.length){

                return {
                    'color': 'orange',
                    'variant': 'warning',
                    'text': 'Requiere Atención',
                    'result': sin_conexion.length + '/' + this.data.sirenas.length,
                    'testing': false
                }

            }

            return {
                'color': 'red',
                'variant': 'error',
                'text': 'Sin Conexión',
                'result': sin_conexion.length + '/' + this.data.sirenas.length,
                'testing': false
            }

        }
    }
}
</script>