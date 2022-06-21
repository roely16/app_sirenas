<template>
    <div >
        <b-container fluid class="pt-3 pb-1" style="background-color: #4a4848">

            <b-row>
                <b-col>
                    <h3 class="text-center text-white">Corredores</h3>
                </b-col>
            </b-row>
            <b-row class="mb-4" align-v="center" align-h="center">
                <b-col cols="9" lg="4" md="6">
                    <b-form-select value-field="ID" text-field="NOMBRE" :options="corredores" size="lg" v-model="corredor_select"></b-form-select>
                </b-col>
                <b-col cols="3" class="text-center">
                    <b-btn :disabled="!corredor_select" @click="obtener_sirenas()" size="lg">
                        <font-awesome-icon icon="plus" />
                    </b-btn>
                </b-col>
            </b-row>
            
            <b-card header="Operaciones por Corredor" class="mb-4">
                <b-row align-h="center">
                    <b-col class="text-center" cols="12" lg="4" md="6">
                        <b-button :disabled="corredores_seleccionados.length <= 0" size="sm" variant="success" @click="encender_todas">Encender 
                            <font-awesome-icon icon="play" />
                        </b-button>
                        <b-button :disabled="corredores_seleccionados.length <= 0" size="sm" class="ml-2" variant="warning" @click="intermitente_todas">Intermitente 
                            <font-awesome-icon icon="exclamation-triangle" />
                        </b-button>
                        <b-button :disabled="corredores_seleccionados.length <= 0" size="sm" class="ml-2" variant="danger" @click="apagar_todas">Apagar 
                            <font-awesome-icon icon="stop" />
                        </b-button>
                    </b-col>

                </b-row>
            </b-card>
            
        </b-container>
        
        <b-container class="pt-4">

            <b-row v-if="corredores_seleccionados.length > 0" align-h="center">
                <b-col cols="12" lg="4" md="6">
                    <b-input-group class="mb-4">
                        <template v-slot:append>
                            <b-input-group-text><font-awesome-icon icon="search" /></b-input-group-text>
                        </template>
                        <b-form-input size="lg" placeholder="Buscar..." autocomplete="off" v-model="busqueda"></b-form-input>
                    </b-input-group> 
                </b-col>
            </b-row>

            <b-row v-if="corredor_select">
                <b-col cols="12" lg="4" md="4" v-for="(corredor, key) in corredores_seleccionados" :key="key">
                    <b-card class="mb-4">
                        <b-card-title>
                            <b-row align-v="center">
                                <b-col cols="9" @click="expand(corredor)">
                                    {{ corredor.NOMBRE }}
                                </b-col>
                                <b-col class="text-right">
                                    <b-btn @click="quitar_corredor(corredor)" variant="danger" pill >
                                        <font-awesome-icon icon="trash" />
                                    </b-btn>
                                </b-col>
                            </b-row>
                        </b-card-title>
                        <div v-show="corredor.expand">
                            <b-card-text v-for="(sirena,  key) in corredor.sirenas" :key="key">
                                <Sirena class="mb-4" :data="sirena" :corredor="corredor" :ip="sirena.IP" :puerto="sirena.PUERTO" :direccion="sirena.DIRECCION" :identificador="sirena.NOMBRE" :encender_sirena="encender" />
                            </b-card-text>
                        </div>
                    </b-card>
                </b-col>
            </b-row>

            <b-row v-if="!corredor_select" align-h="center">
                <b-col cols="5" lg="2" md="3" align-self="center" class="text-center">
                    <b-img class="mb-4 mt-4" center height="10" :src="require('@/assets/information.png')" fluid alt="Responsive image"></b-img>
                </b-col>
                <b-col class="text-center" cols="12">
                    <p class="font-weight-light">
                        DEBE DE SELECCIONAR UN CORREDOR
                    </p>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>

    import Sirena from '@/components/Sirena'
    
    export default {
        components: {
            Sirena
        },
        data(){
            return{
                busqueda: '',
                encender: false,
                intermitente: false,
                apagar: false,
                corredor_select: null
            }
        },
        methods: {
            obtener_sirenas(){

                this.$store.dispatch('getSirenas', this.corredor_select)

            },
            expand(corredor){

                // eslint-disable-next-line no-console
                this.$store.dispatch('expandCorredor', corredor)

            },
            encender_todas(){

                this.corredores_seleccionados.forEach(corredor => {
                    
                    this.$root.$emit('accionar_sirena', {accion: corredor.ENCENDER, mensaje: 'Encendiendo...', success: 'Encendida'})

                });
                

            },
            intermitente_todas(){

                this.corredores_seleccionados.forEach(corredor => {
                    
                    this.$root.$emit('accionar_sirena', {accion: corredor.INTERMITENTE, mensaje: 'Encendiendo (Intermitente)...', success: 'Encendida (Intermitente)'})

                });

            },
            apagar_todas(){

                this.corredores_seleccionados.forEach(corredor => {
                    
                    this.$root.$emit('accionar_sirena', {accion: corredor.APAGAR, mensaje: 'Apagando...', success: 'Apagada'})

                });

            },
            obtener_corredores(){
                this.$store.dispatch('getCorredores')
            },
            quitar_corredor(corredor){
                this.$store.commit('quitarCorredor', corredor)
            }
        },
        computed: {
            sirenasFiltradas: function(){

                return this.sirenas.filter(sirena => {
                   
                    return sirena.DIRECCION.toLowerCase().includes(this.busqueda.toLowerCase()) 
                })

            },
            sirenas(){

                return this.$store.getters.getSirenas

            },
            corredores(){

                return this.$store.getters.getCorredores

            },
            corredores_seleccionados(){

                return this.$store.state.corredores_seleccionados

            }
        },
        mounted(){

            this.obtener_corredores()

        }
    }
</script>