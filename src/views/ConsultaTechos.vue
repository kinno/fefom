<template>
    <v-container
        fill-height
        fluid
        grid-list-xl>
        <v-layout
        justify-center
        wrap
        >
            <v-flex
                xs12
                md12
            >
                <consulta-techos-component></consulta-techos-component>
            </v-flex>
        </v-layout>
    </v-container>
  
</template>

<script>

import ConsultaTechosComponent from '../components/app/ConsultaTechosComponent'
export default {
    components:{
        ConsultaTechosComponent
    },
    data(){
        return{

        }
    }
}
</script>
