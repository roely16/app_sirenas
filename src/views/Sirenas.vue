<template>
    <div >
        <b-container fluid class="pt-3 pb-1" style="background-color: #4a4848">

            <b-row class="mb-4" align-h="center">
                <b-col cols="12" lg="4" md="6">

                    <b-form-group label-class="text-white" label-size="lg" label="Corredor">
                        <b-form-select @change="obtener_sirenas()" value-field="ID" text-field="NOMBRE" :options="corredores" size="lg" v-model="corredor"></b-form-select>
                    </b-form-group>
                    
                </b-col>
            </b-row>

            <b-row class="mb-4" align-h="center">
                <b-col class="text-center" cols="12" lg="4" md="6">
                    <b-button :disabled="!corredor && !sirenas.length > 0" size="sm" variant="success" @click="encender_todas">Encender 
                        <font-awesome-icon icon="play" />
                    </b-button>
                    <b-button :disabled="!corredor && !sirenas.length > 0" size="sm" class="ml-2" variant="warning" @click="intermitente_todas">Intermitente 
                        <font-awesome-icon icon="exclamation-triangle" />
                    </b-button>
                    <b-button :disabled="!corredor && !sirenas.length > 0" size="sm" class="ml-2" variant="danger" @click="apagar_todas">Apagar 
                        <font-awesome-icon icon="stop" />
                    </b-button>
                </b-col>

            </b-row>

            
        </b-container>
        
        <b-container class="pt-4">

            <b-row v-if="corredor && sirenas.length > 0" align-h="center">
                <b-col cols="12" lg="4" md="6">
                    <b-input-group class="mb-4">
                        <template v-slot:append>
                            <b-input-group-text><font-awesome-icon icon="search" /></b-input-group-text>
                        </template>
                        <b-form-input size="lg" placeholder="Buscar..." autocomplete="off" v-model="busqueda"></b-form-input>
                    </b-input-group> 
                </b-col>
            </b-row>

            <b-row v-if="corredor">
                <b-col cols="12" lg="4" md="4" v-for="(sirena, key) in sirenasFiltradas" :key="key">
                    <Sirena class="mb-4"  :ip="sirena.IP" :puerto="sirena.PUERTO" :direccion="sirena.DIRECCION" :identificador="sirena.NOMBRE" :encender_sirena="encender" />
                </b-col>
            </b-row>

            

            <b-row v-if="!corredor" align-h="center">
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
                corredor: null
            }
        },
        methods: {
            obtener_sirenas(){

                this.$store.dispatch('getSirenas', this.corredor)

            },
            encender_todas(){

                this.$root.$emit('encender_sirena')

            },
            intermitente_todas(){

                this.$root.$emit('intermitente_sirena')

            },
            apagar_todas(){

                this.$root.$emit('apagar_sirena')

            },
            obtener_corredores(){
                
                this.$store.dispatch('getCorredores')

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

            }
        },
        mounted(){

            this.obtener_corredores()

        }
    }
</script>