<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
         :title="titulo"
         :text="subtitulo"
          class="mt-8"
          style="margin-bottom: 65px !important"
          
        >
          <listado-fichas-component v-if="this.user.tipo_usuario == 1"></listado-fichas-component>
          <listado-fichas-ayuntamiento-component v-else></listado-fichas-ayuntamiento-component>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ListadoFichasComponent from "../components/app/ListadoFichasComponent";
import ListadoFichasAyuntamientoComponent from "../components/app/ListadoFichasAyuntamientoComponent";

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
    ListadoFichasComponent,ListadoFichasAyuntamientoComponent
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
    titulo: function(){
      return (this.user.tipo_usuario == 1) ? "Bandeja de entrada" : "Listado de fichas técnicas"
    },
    subtitulo: function(){
      return (this.user.tipo_usuario == 1) ? "Listado de fichas técnicas asignadas" : "Detalle de las fichas técnicas registradas"
    }
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
