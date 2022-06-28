<template>
    <div>
        <b-row>
            <b-col cols="12" md="4" v-for="(corredor, key) in corredores" :key="key">
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
            corredores: state => state.corredor.corredores
        })
    },
    mounted(){

        this.obtenerCorredores()

    }
}
</script>