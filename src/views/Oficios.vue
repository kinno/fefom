<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
          title="Control de Oficios"
          text=""
          class="mt-8"
          style="margin-bottom: 65px !important"
        >
         <oficios-component></oficios-component>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OficiosComponent from "../components/app/OficiosComponent";
export default {
  components: {
    OficiosComponent
  },
  data() {
    return {};
  }
};
</script>
