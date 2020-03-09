<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card
          color="green"
          title="Ficha Técnica"
          text="Revisión"
          class="mt-8"
          style="margin-bottom: 65px !important"
        >
          <v-container fluid class="pa-0">
            <v-card color="grey lighten-3">
              <v-row>
                <v-col cols="12" class="pt-0">
                  <v-toolbar flat color="grey lighten-3">
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        v-model="id_ficha_tecnica"
                        label="No. Ficha Técnica:"
                        dense
                        class="mt-5"
                        v-on:keyup.enter="buscar"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        v-model="ficha_tecnica.version"
                        label="Version:"
                        dense
                        outlined
                        class="mt-5"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="8">
                      <v-btn
                        color="green"
                        class="ma-0 tile white--text"
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
                        @click="validarSeccion()"
                      >
                        Validar Sección
                        <v-icon right dark>mdi-checkbox-marked-outline</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="botonVisible"
                        color="green"
                        class="ma-2 white--text"
                        small
                        @click="guardarObservaciones()"
                      >
                        Guardar Observaciones
                        <v-icon right dark>mdi-comment-remove-outline</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="botonVisible"
                        color="green"
                        class="ma-2 white--text"
                        small
                        @click="cerrarFicha(1)"
                      >
                        Regresar con Observaciones
                        <v-icon right dark>mdi-arrow-top-left-thick</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="botonVisible"
                        color="green"
                        class="ma-2 white--text"
                        small
                        @click="cerrarFicha(2)"
                      >
                        Enviar a validación
                        <v-icon right dark>mdi-arrow-top-right-thick</v-icon>
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
              <v-fade-transition mode="out-in">
                <v-card flat :key="change">
                  <v-card-text>
                    <component
                      :is="currentTabComponent"
                      :ficha_tecnica="ficha_tecnica"
                      :key="update"
                    ></component>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-card>
          </v-container>
        </material-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialogObservaciones" min-width="500px" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Observaciones: {{ seccionComputed }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Descripción"
                v-model="descripcionObservacion"
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
            @click="
              (dialogObservaciones = false),
                (observacionSeleccionada = null),
                (descripcionObservacion = null)
            "
          >
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="emitirObservaciones()">
            Aceptar
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
// import AnexoOchoComponent from "../components/app/AnexoOchoComponent";
import AnexoNueveComponent from "../components/app/AnexoNueveComponent";
import { EventBus } from "../utils/event-bus";
export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));

    if (typeof this.$route.params.id_ficha_tecnica !== "undefined") {
      this.id_ficha_tecnica = this.$route.params.id_ficha_tecnica;
      this.buscar();
    }

    // this.cargarCatalogoObservaciones();
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
    EventBus.$on("actualizaPropAnexoSiete ", id_anexo_siete => {
      console.log("actualizando ficha_tecnica.id_anexo_siete");
      this.ficha_tecnica.id_anexo_siete = id_anexo_siete;
    });
    EventBus.$on("buscarFicha", id_ficha_tecnica => {
      this.id_ficha_tecnica = id_ficha_tecnica;
      this.buscar();
    });
    EventBus.$on("actualizaPropAnexoOcho", id_anexo_ocho => {
      console.log("actualizando ficha_tecnica.id_anexo_ocho");
      this.ficha_tecnica.id_anexo_ocho = id_anexo_ocho;
    });
    EventBus.$on("actualizaPropAnexoNueve", id_anexo_nueve => {
      console.log("actualizando ficha_tecnica.id_anexo_nueve");
      this.ficha_tecnica.id_anexo_nueve = id_anexo_nueve;
    });
    EventBus.$on("abreDialogObservacion", (seccion, observaciones) => {
      this.dialogObservaciones = true;
      this.seccionObservacion = seccion;
      if (observaciones !== null) {
        this.observacionSeleccionada = observaciones.id_observacion;
        this.descripcionObservacion = observaciones.descripcion_observacion;
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
    AnexoNueveComponent,
  },
  data() {
    return {
      user: null,
      tab: null,
      currentTab: "anexo-uno-component",
      update: 0,
      change: 0,
      botonVisible: true,
      estatusList: [
        {
          estatus: 1,
          descripcion: "Edición"
        },
        {
          estatus: 2,
          descripcion: "Aceptado"
        },
        {
          estatus: 3,
          descripcion: "En Revisión"
        },
        {
          estatus: 4,
          descripcion: "Observaciones"
        }
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
          component: "anexo-nueve-component",
          anexo: 9
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
        id_anexo_ocho: null,
        id_anexo_nueve: null,
      },
      dialogObservaciones: false,
      seccionObservacion: "",
      catalogoObservaciones: [],
      observacionSeleccionada: null,
      descripcionObservacion: null
    };
  },
  computed: {
    currentTabComponent: function() {
      this.change++;
      return this.currentTab;
    },
    seccionComputed: function() {
      switch (this.seccionObservacion) {
        case "1.1":
          return "Programas y Proyectos de Inversión (PPI)";
          break;
        case "1.2":
          return "Nombre del PPI";
          break;
        case "1.3":
          return "Tipo de PPI";
          break;
        case "1.4":
          return "Fuentes de financiamiento";
          break;
        case "1.5":
          return "Monto total de inversión";
          break;
        case "1.6":
          return "Horizonte de evaluación.";
          break;
        case "1.7":
          return "Calendario de Inversión";
          break;
        case "1.8":
          return "Localización geográfica";
          break;
        case "2.1":
          return `Programa(s) Relacionado(s)
                  Objetivo(s) / Estrategia(s)
                  Líneas de acción
                  `;
          break;
        case "2.2":
          return "Programas o proyectos complementarios o relacionados.";
          break;
        case "3.1":
          return "Descripción de la problemática.";
          break;
        case "3.2":
          return "Análisis de la oferta.";
          break;
        case "3.3":
          return "Análisis de la demanda.";
          break;
        case "3.4":
          return "Variables relevantes.";
          break;
        case "4.1":
          return "Posibles medidas de optimización.";
          break;
        case "4.2":
          return "Análisis de la oferta sin proyecto; Análisis de la demanda sin proyecto.";
          break;
        case "5.1":
          return "Descripción de las alternativas de solución desechadas.";
          break;
        case "5.2":
          return "Justificación de la alternativa de solución seleccionada.";
          break;
        case "6.1":
          return "Descripción general.";
          break;
        case "6.2":
          return "Descripción de los componentes del proyecto.";
          break;
        case "6.3":
          return "Aspectos técnicos, legales y ambientales más relevantes.";
          break;
        case "6.4":
          return "Plano de localización del proyecto";
          break;
        case "6.5":
          return "Análisis de la oferta con proyecto.";
          break;
        case "6.6":
          return "Análisis de la demanda con proyecto.";
        case "6.7":
          return "Diagnóstico de la situación con proyecto.";
          break;
        case "7.1":
          return "Identificación de costos";
          break;
        case "7.2":
          return "Identificación de beneficios";
          break;
        case "8.1":
          return "Nombre del estudio";
          break;
        case "8.2":
          return "Tipo de estudio";
          break;
        case "8.3":
          return "Fecha estimada de realización";
          break;
        case "8.4":
          return "Justificación de su realización";
          break;
        case "8.5":
          return "Descripción";
          break;
        case "8.6":
          return "Vigencia del Estudio";
          break;
        case "8.7":
          return "Monto estimado (incluye IVA)";
          break;
        case "9.1":
          return "Comentarios finales.";
          break;
        case "9.2":
          return "Responsables de la Información.";
          break;
        default:
          break;
      }
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
    validarSeccion() {
      EventBus.$emit("validarSeccion", {
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
        this.ficha_tecnica.id_anexo_siete !== null
      ) {
        if (
          confirm(
            "¿Deseas cerrar y envíar la ficha para revisión? Una vez enviado ya no se podrán realizar cambios en la ficha."
          )
        ) {
          this.$http
            .post("/ficha_tecnica/cerrar_ficha", {
              id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica,
              id_ayuntamiento: this.user.id_municipio
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
        console.log("Cerrando ficha técnica");
      } else {
        this.$fire({
          type: "error",
          title: "Error",
          text:
            "Aún no se completa el registro de la ficha técnica, por favor verificar las secciones.",
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
        .post("/ficha_tecnica/buscar_ficha_fefom", {
          id_ficha_tecnica: this.id_ficha_tecnica,
          usuario: this.user
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.currentTab = "anexo-uno-component";
              this.ficha_tecnica = response.data[0];
              this.update += 1;
              // if(response.data[0].estatus==2 || response.data[0].estatus==3){
              //   this.botonVisible = false;
              // }
            } else {
              this.$fire({
                type: "warning",
                title: "Atención",
                text:
                  "No se ha encontrado la Ficha Técnica o aún no se ha enviado para su revisión.",
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
        .get("/ficha_tecnica/imprimir_ficha", {
          responseType: "arraybuffer",
          params: {
            id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica
          }
        })
        .then(response => {
          // console.log(response);
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            var blob = new Blob([response.data], { type: "application/pdf" });

            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.target = "_blank";
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
    cargarCatalogoObservaciones() {
      this.$http
        .get("/catalogos/get_catalogo_observaciones")
        .then(response => {
          response.data.rows.forEach(element => {
            this.catalogoObservaciones.push(element);
          });
        })
        .catch(err => {});
    },
    emitirObservaciones() {
      var observacion = {
        seccion: this.seccionObservacion,
        id_observacion: this.observacionSeleccionada,
        descripcion_observacion: this.descripcionObservacion
      };

      EventBus.$emit("emitirObservaciones", observacion);
      this.seccionObservacion = null;
      this.observacionSeleccionada = null;
      this.descripcionObservacion = null;
      this.dialogObservaciones = false;
    },
    guardarObservaciones() {
      EventBus.$emit("guardarObservaciones");
    },
    cerrarFicha(tipo_envio) {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/cerrar_revision", {
          tipo_envio: tipo_envio,
          id_ficha_tecnica: this.id_ficha_tecnica,
          id_usuario: this.user.id_usuario,
          id_ayuntamiento: this.ficha_tecnica.id_ayuntamiento
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          switch (response.status) {
            case 200:
              this.$fire({
                type: "success",
                title:
                  "La revisión de la ficha ha concluido con éxito, todas las secciones han sido validadas.",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
              });
              break;
            case 201:
              this.$fire({
                type: "success",
                title:
                  "La ficha ha sido regresada al Ayuntamiento con observaciones para su atención.",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
              });
              break;
            case 202:
              this.$fire({
                type: "warning",
                title: "Atención: No se puede cerrar la revisión.",
                text:
                  "Aún no se ha revisado la ficha en su totalidad. Por favor validar todas las secciones.",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
              });
              break;

            default:
              this.$fire({
                type: "error",
                title: "Error",
                text: response.err,
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
              });
              break;
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
    }
  },
  beforeDestroy() {
    EventBus.$off("buscarFicha");
    EventBus.$off("actualizaPropAnexoDos");
    EventBus.$off("actualizaPropAnexoTres");
    EventBus.$off("actualizaPropAnexoCuatro");
    EventBus.$off("actualizaPropAnexoCinco");
    EventBus.$off("actualizaPropAnexoSeis");
    EventBus.$off("actualizaPropAnexoSiete");
    EventBus.$off("abreDialogObservacion");
  }
};
</script>
