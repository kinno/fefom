<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
         title="Bandeja de Entrada"
          text="Listado de fichas técnicas asignadas"
          class="mt-8"
          style="margin-bottom: 65px !important"
          
        >
          <listado-fichas-component></listado-fichas-component>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ListadoFichasComponent from "../components/app/ListadoFichasComponent";

import { EventBus } from "../utils/event-bus";
export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    EventBus.$on("actualizaPropAnexoDos", id_anexo_dos => {
      
    });
    
  },
  components: {
    ListadoFichasComponent,
  },
  data() {
    return {
      user: null,
      tab: null,
      update: 0,
      botonVisible: true,
    };
  },
  computed: {

  },
  watch: {
  },
  methods: {
    
  },
  beforeDestroy() {
    EventBus.$off("buscarFicha");
  }
};
</script>
