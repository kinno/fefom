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
                <techos-financieros-component></techos-financieros-component>
            </v-flex>
        </v-layout>
    </v-container>
  
</template>

<script>

import TechosFinancierosComponent from '../components/app/TechosFinancierosComponent'
export default {
    components:{
        TechosFinancierosComponent
    },
    data(){
        return{

        }
    }
}
</script>
