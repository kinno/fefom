<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
          title="Control de las Fichas Técnicas"
          text="Detalle de las asignaciones de las fichas técnicas"
          class="mt-8"
          style="margin-bottom: 65px !important"
          
        >
          <control-fichas-component></control-fichas-component>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ControlFichasComponent from "../components/app/ControlFichasComponent";

import { EventBus } from "../utils/event-bus";
export default {
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {
    EventBus.$on("actualizaPropAnexoDos", id_anexo_dos => {
      
    });
    
  },
  components: {
    ControlFichasComponent
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
