<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
         title="Techos Financieros"
          text=""
          class="mt-8"
          style="margin-bottom: 65px !important"
          
        >
          <techos-financieros-component></techos-financieros-component>
        </material-card>
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
