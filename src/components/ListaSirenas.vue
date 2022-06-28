<template>
    <div style="position:relative; overflow-y:auto; height: 50vh">
        <b-row v-for="(sirena, key) in data.sirenas" :key="key">
            <b-col>
                <card-sirena :data="sirena"></card-sirena>
            </b-col>
        </b-row>
    </div>
</template>

<script>

import CardSirena from '@/components/CardSirena'

export default {
    props: {
        data: Object
    },
    components: {
        'card-sirena': CardSirena
    }    
}
</script>