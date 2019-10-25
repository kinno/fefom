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
                <cartera-proyectos-component></cartera-proyectos-component>
            </v-flex>
        </v-layout>
    </v-container>
  
</template>

<script>

import CarteraProyectosComponent from '../components/app/MunicipioCarteraComponent.vue'
export default {
    components:{
        CarteraProyectosComponent
    },
    data(){
        return{

        }
    }
}
</script>
