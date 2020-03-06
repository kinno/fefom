<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
          <home-component></home-component>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import HomeComponent from '../components/app/HomeComponent'
export default {
    components:{
        HomeComponent
    },
    data(){
        return{

        }
    }
}
</script>
