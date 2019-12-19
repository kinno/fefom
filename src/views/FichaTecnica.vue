<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
          title="Ficha Técnica"
          text="Creación y/o Modificación"
          class="mt-8"
        >
          <v-container fluid class="pa-0">
            <v-card color="grey lighten-3">
              <v-row>
                <v-col cols="12" class="pt-0">
                  <v-toolbar flat color="grey lighten-3">
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="id_ficha_tecnica"
                        label="No. Ficha Técnica:"
                        dense
                        class="mt-5"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="9">
                      <v-btn
                        color="green"
                        class="ma-2 white--text"
                        small
                        @click="buscar()"
                      >
                        Buscar
                        <v-icon right dark>mdi-magnify</v-icon>
                      </v-btn>
                      <v-btn
                        color="green"
                        class="ma-2 white--text"
                        small
                        @click="guardarFicha()"
                      >
                        Guardar
                        <v-icon right dark>mdi-content-save-outline</v-icon>
                      </v-btn>
                      <v-btn
                        color="green"
                        class="ma-2 white--text"
                        small
                        @click="guardarFicha()"
                      >
                        Imprimir
                        <v-icon right dark>mdi-printer</v-icon>
                      </v-btn>
                      <v-btn
                        color="green"
                        class="ma-2 white--text"
                        small
                        @click="guardarFicha()"
                      >
                        Envíar
                        <v-icon right dark>mdi-send-clock</v-icon>
                      </v-btn>
                    </v-col>
                  </v-toolbar>
                </v-col>
              </v-row>

              <v-tabs
                v-model="tab"
                background-color="green lighten-5"
                color="black lighten-1"
                grow
              >
                <v-tab
                  v-for="item in items"
                  :key="item.titulo"
                  @click="
                    (currentTab = item.component)
                  "
                >
                  <!-- @click="emiteEvento(item.name)" -->
                  {{ item.titulo }}
                </v-tab>
              </v-tabs>
              <v-card flat>
                <v-card-text>
                  <component :is="currentTabComponent" :ficha_tecnica="ficha_tecnica" :key="update"></component>
                </v-card-text>
              </v-card>
            </v-card>
          </v-container>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AnexoUnoComponent from "../components/app/AnexoUnoComponent";
import AnexoDosComponent from "../components/app/AnexoDosComponent";
import AnexoTresComponent from "../components/app/AnexoTresComponent";
import AnexoCuatroComponent from "../components/app/AnexoCuatroComponent";
import AnexoCincoComponent from "../components/app/AnexoCincoComponent";
import AnexoSeisComponent from "../components/app/AnexoSeisComponent";
import AnexoSieteComponent from "../components/app/AnexoSieteComponent";
import { EventBus } from "../utils/event-bus";
export default {
  mounted(){
    this.user = JSON.parse(localStorage.getItem("user"));
    EventBus.$on("actualizaPropAnexoDos",(id_anexo_dos)=>{
      this.ficha_tecnica.id_anexo_dos = id_anexo_dos;
    })
    EventBus.$on("buscarFicha",(id_ficha_tecnica)=>{
      this.id_ficha_tecnica = id_ficha_tecnica
      this.buscar()
    })
  },
  components: {
    AnexoUnoComponent,
    AnexoDosComponent,
    AnexoTresComponent,
    AnexoCuatroComponent,
    AnexoCincoComponent,
    AnexoSeisComponent,
    AnexoSieteComponent
  },
  data() {
    return {
      user: null,
      tab: null,
      currentTab: "anexo-uno-component",
      update: 0,
      items: [
        {
          titulo: "I. Información general del PPI",
          component: "anexo-uno-component",
          anexo: 1
        },
        {
          titulo: "II. Alineación estratégica",
          component: "anexo-dos-component",
          anexo: 2
        },
        {
          titulo: "III. Análisis de la situación actual",
          component: "anexo-tres-component",
          anexo: 3
        },
        {
          titulo: "IV. Análisis de la situación sin proyecto",
          component: "anexo-cuatro-component",
          anexo: 4
        },
        {
          titulo: "V. Alternativas de solución",
          component: "anexo-cinco-component",
          anexo: 5
        },
        {
          titulo: "VI. Análisis de la situación con proyecto",
          component: "anexo-seis-component",
          anexo: 6
        },
        {
          titulo: "VII. Identificación y cuantíficación de costos y beneficios",
          component: "anexo-siete-component",
          anexo: 7
        }
      ],
      id_ficha_tecnica: null,
      ficha_tecnica: {
        ejercicio: null,
        id_ayuntamiento: null,
        estatus: null,
        version: null,
        id_anexo_uno: null,
        id_anexo_dos: null,
        id_anexo_tres: null,
        id_anexo_cuatro: null,
        id_anexo_cinco: null,
        id_anexo_seis: null,
        id_anexo_siete: null,
      }
    };
  },
  computed: {
    currentTabComponent: function() {
      return this.currentTab;
    }
  },
  watch:{
    currentTabComponent: function(){

    }
  },
  methods: {
    guardarFicha() {
      EventBus.$emit("guardarFicha", {
        id_ficha_tecnica: this.id_ficha_tecnica
      });
    },
    emiteEvento(anexo) {
      var tipo = ""
      switch (anexo) {
        case 1:
          tipo = 'cargaAnexoUno'
           
         break;
        case 2:
          tipo = 'cargaAnexoDos'
          break;
      
        default:
          break;
      }
      EventBus.$emit(tipo, this.ficha_tecnica)
    },
    buscar() {
      this.$http
        .post("/ficha_tecnica/buscar_ficha", {
          id_ficha_tecnica: this.id_ficha_tecnica,
          id_ayuntamiento: this.user.id_municipio
        })
        .then(response => {
          if (response.status == 200) {
            this.currentTab = 'anexo-uno-component'
            this.ficha_tecnica = response.data[0]
            this.update += 1;
            // EventBus.$emit("cargaAnexoUno", response.data[0])
          } else {
            this.$fire({
              type: "error",
              title: "Error",
              text: response.err,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
          }
        })
        .catch(error => {
          this.$fire({
            type: "error",
            title: "Error",
            text: error,
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#d33"
          });
        });
    }
  }
};
</script>
