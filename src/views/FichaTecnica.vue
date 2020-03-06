<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
          title="Ficha Técnica"
          text="Creación y/o Modificación"
          class="mt-8"
          style="margin-bottom: 65px !important"
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
                    <v-col cols="12" sm="6" md="2">
                      <v-select
                        v-model="ficha_tecnica.estatus"
                        :items="estatusList"
                        item-text="descripcion"
                        item-value="estatus"
                        label="Estatus de la ficha técnica:"
                        return-object
                        outlined
                        dense
                        class="mt-5"
                        disabled
                      ></v-select>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="7">
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
                      v-if="botonVisible"
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
                        @click="imprimirFicha()"
                      >
                        Imprimir
                        <v-icon right dark>mdi-printer</v-icon>
                      </v-btn>
                      <v-btn
                       v-if="botonVisible"
                        color="green"
                        class="ma-2 white--text"
                        small
                        @click="cerrarFicha()"
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
                  @click="currentTab = item.component"
                >
                  <!-- @click="emiteEvento(item.name)" -->
                  {{ item.titulo }}
                </v-tab>
              </v-tabs>
              <v-card flat>
                <v-card-text>
                  <component
                    :is="currentTabComponent"
                    :ficha_tecnica="ficha_tecnica"
                    :key="update"
                  ></component>
                </v-card-text>
              </v-card>
            </v-card>
          </v-container>
        </material-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialogObservaciones"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
          
        >
          Observaciones: {{seccionObservacion}}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Descripción"
                v-model="descripcionObservacion"
                readonly
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialogObservaciones = false, observacionSeleccionada=null, descripcionObservacion=null"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import AnexoOchoComponent from "../components/app/AnexoOchoComponent";
import { EventBus } from "../utils/event-bus";
export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.cargarCatalogoObservaciones()
    EventBus.$on("actualizaPropAnexoDos", id_anexo_dos => {
      console.log("actualizando ficha_tecnica.id_anexo_dos");
      this.ficha_tecnica.id_anexo_dos = id_anexo_dos;
    });
    EventBus.$on("actualizaPropAnexoTres", id_anexo_tres => {
      console.log("actualizando ficha_tecnica.id_anexo_tres");
      this.ficha_tecnica.id_anexo_tres = id_anexo_tres;
    });
    EventBus.$on("actualizaPropAnexoCuatro", id_anexo_cuatro => {
      console.log("actualizando ficha_tecnica.id_anexo_cuatro");
      this.ficha_tecnica.id_anexo_cuatro = id_anexo_cuatro;
    });
    EventBus.$on("actualizaPropAnexoCinco", id_anexo_cinco => {
      console.log("actualizando ficha_tecnica.id_anexo_cinco");
      this.ficha_tecnica.id_anexo_cinco = id_anexo_cinco;
    });
    EventBus.$on("actualizaPropAnexoSeis", id_anexo_seis => {
      console.log("actualizando ficha_tecnica.id_anexo_seis");
      this.ficha_tecnica.id_anexo_seis = id_anexo_seis;
    });
    EventBus.$on("actualizaPropAnexoSiete", id_anexo_siete => {
      console.log("actualizando ficha_tecnica.id_anexo_siete");
      this.ficha_tecnica.id_anexo_siete = id_anexo_siete;
    });
    EventBus.$on("actualizaPropAnexoOcho", id_anexo_ocho => {
      console.log("actualizando ficha_tecnica.id_anexo_ocho");
      this.ficha_tecnica.id_anexo_ocho = id_anexo_ocho;
    });
    EventBus.$on("buscarFicha", id_ficha_tecnica => {
      this.id_ficha_tecnica = id_ficha_tecnica;
      this.buscar();
    });
    EventBus.$on("abreDialogObservacion", (seccion,observaciones) => {
      this.dialogObservaciones = true
      this.seccionObservacion = seccion
      if(observaciones !== null){
        this.observacionSeleccionada = observaciones.id_observacion
        this.descripcionObservacion = observaciones.descripcion_observacion
      }
    });
  },
  components: {
    AnexoUnoComponent,
    AnexoDosComponent,
    AnexoTresComponent,
    AnexoCuatroComponent,
    AnexoCincoComponent,
    AnexoSeisComponent,
    AnexoSieteComponent,
    AnexoOchoComponent,
  },
  data() {
    return {
      user: null,
      tab: null,
      currentTab: "anexo-uno-component",
      update: 0,
      botonVisible: true,
      estatusList: [
        // {
        //   estatus: 1,
        //   descripcion: 'Edición'
        // },
        // {
        //   estatus: 2,
        //   descripcion: 'Aceptado'
        // },
        // {
        //   estatus: 3,
        //   descripcion: 'En Revisión'
        // },
        // {
        //   estatus: 4,
        //   descripcion: 'Observaciones'
        // },
        {
          estatus: 1,
          descripcion: 'Edición'
        },
        {
          estatus: 2,
          descripcion: 'En Revisión'
        },
        {
          estatus: 3,
          descripcion: 'En Validación'
        },
        {
          estatus: 4,
          descripcion: 'En Dictaminación'
        },
        {
          estatus: 5,
          descripcion: 'Corrección con observaciones'
        },
      ],
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
        },
        {
          titulo: "Consideraciones generales",
          component: "anexo-ocho-component",
          anexo: 8
        }
      ],
      id_ficha_tecnica: null,
      ficha_tecnica: {
        id_ficha_tecnica: null,
        ejercicio: null,
        id_ayuntamiento: null,
        estatus: 1,
        version: null,
        monto_con_iva: 0.0,
        id_anexo_uno: null,
        id_anexo_dos: null,
        id_anexo_tres: null,
        id_anexo_cuatro: null,
        id_anexo_cinco: null,
        id_anexo_seis: null,
        id_anexo_siete: null,
        id_anexo_ocho: null
      },
      dialogObservaciones: false,
      seccionObservacion: "",
      catalogoObservaciones: [],
      observacionSeleccionada: null,
      descripcionObservacion: null,
    };
  },
  computed: {
    currentTabComponent: function() {
      return this.currentTab;
    }
  },
  watch: {
    currentTabComponent: function() {}
  },
  methods: {
    guardarFicha() {
      EventBus.$emit("guardarFicha", {
        id_ficha_tecnica: this.id_ficha_tecnica
      });
    },
    cerrarFicha() {
      if (
        this.ficha_tecnica.id_ficha_tecnica !== null &&
        this.ficha_tecnica.id_anexo_uno !== null &&
        this.ficha_tecnica.id_anexo_dos !== null &&
        this.ficha_tecnica.id_anexo_tres !== null &&
        this.ficha_tecnica.id_anexo_cuatro !== null &&
        this.ficha_tecnica.id_anexo_cinco !== null &&
        this.ficha_tecnica.id_anexo_seis !== null &&
        this.ficha_tecnica.id_anexo_siete !== null &&
        this.ficha_tecnica.id_anexo_ocho !== null 
      ) {
         if (confirm("¿Deseas cerrar y envíar la ficha para revisión? Una vez enviado ya no se podrán realizar cambios en la ficha.")) {
           this.$http
          .post("/ficha_tecnica/cerrar_ficha", {
            id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica,
            id_ayuntamiento: this.user.id_municipio,
            version: this.ficha_tecnica.version,
            id_usuario : this.user.id_usuario
          })
          .then(response => {
            if (response.status == 200) {
              console.log(response);
              
              this.$fire({
                type: "success",
                title: `Ficha técnica cerrada y enviada correctamente.`,
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
              });
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
        console.log("Cerrando ficha técnica")
      }else{
        this.$fire({
          type: "error",
          title: "Error",
          text: "Aún no se completa el registro de la ficha técnica, por favor verificar las secciones.",
          confirmButtonText: "Cerrar",
          confirmButtonColor: "#d33"
        });
      }
    },
    emiteEvento(anexo) {
      var tipo = "";
      switch (anexo) {
        case 1:
          tipo = "cargaAnexoUno";

          break;
        case 2:
          tipo = "cargaAnexoDos";
          break;

        default:
          break;
      }
      EventBus.$emit(tipo, this.ficha_tecnica);
    },
    buscar() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_ficha", {
          id_ficha_tecnica: this.id_ficha_tecnica,
          id_ayuntamiento: this.user.id_municipio
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            if(response.data.length > 0){
               this.currentTab = "anexo-uno-component";
                this.ficha_tecnica = response.data[0];
                this.update += 1;
                if(response.data[0].estatus==2 || response.data[0].estatus==3 || response.data[0].estatus==4){
                  this.botonVisible = false;
                }
            }else{
              this.$fire({
              type: "warning",
              title: "Atención",
              text: "No se ha encontrado la Ficha Técnica.",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
            }
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
    },
    imprimirFicha() {
      EventBus.$emit("abreLoading");
      this.$http
        .get("/ficha_tecnica/imprimir_ficha", {responseType: 'arraybuffer',params:{
          id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica,
        }})
        .then(response => {
          // console.log(response);
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
             
           var blob = new Blob([response.data], {type: 'application/pdf'});

            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.target = "_blank"
            // link.download = "filename.pdf";
            link.click();
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
           EventBus.$emit("cierraLoading");
          this.$fire({
            type: "error",
            title: "Error",
            text: error,
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#d33"
          });
        });
    },
     cargarCatalogoObservaciones(){
      this.$http
        .get("/catalogos/get_catalogo_observaciones")
        .then(response => {
          response.data.rows.forEach(element => {
            this.catalogoObservaciones.push(element);
          });
        })
        .catch(err => {});
    },
  },
  beforeDestroy() {
    EventBus.$off("buscarFicha");
    EventBus.$off("actualizaPropAnexoDos");
    EventBus.$off("actualizaPropAnexoTres");
    EventBus.$off("actualizaPropAnexoCuatro");
    EventBus.$off("actualizaPropAnexoCinco");
    EventBus.$off("actualizaPropAnexoSeis");
    EventBus.$off("actualizaPropAnexoSiete");
    EventBus.$off("actualizaPropAnexoOcho");
    EventBus.$off("abreDialogObservacion");
  }
};
</script>
