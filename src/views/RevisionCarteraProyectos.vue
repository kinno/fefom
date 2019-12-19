<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
          title="Revisión de Cartera de Proyectos"
          text=""
          class="mt-8"
        >
          <cartera-proyectos-component></cartera-proyectos-component>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CarteraProyectosComponent from "../components/app/RevisionCarteraComponent";
export default {
  components: {
    CarteraProyectosComponent
  },
  data() {
    return {};
  }
};
</script>
