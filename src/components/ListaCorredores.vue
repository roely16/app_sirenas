<template>
    <div>
        <b-row>
            <b-col cols="12" md="4" v-for="(corredor, key) in filtered" :key="key">
                <card-corredor :data="corredor"></card-corredor>
            </b-col>
        </b-row>
    </div>
</template>

<script>

import CardCorredor from '@/components/CardCorredor'

import { mapActions, mapState } from 'vuex'

export default {
    components: {
        'card-corredor': CardCorredor
    },
    methods: {
        ...mapActions({
            'obtenerCorredores': 'corredor/obtenerCorredores'
        })
    },
    computed: {
        ...mapState({
            corredores: state => state.corredor.corredores,
            search: state => state.home.search
        }),
        filtered: function(){

            // Si no se tiene busqueda retornar los corredores como tal

            if (!this.search) {
                
                return this.corredores

            }

            // Caso contrario
            let bk_corredores = JSON.parse(JSON.stringify(this.corredores))

            bk_corredores.forEach(corredor => {
                
                corredor.expand = true
                
                corredor.sirenas = corredor.sirenas.filter(sirena => sirena.DIRECCION.toLowerCase().includes(this.search))
                
            });

            return bk_corredores

        }
    },
    mounted(){

        this.obtenerCorredores()

    }
}
</script>