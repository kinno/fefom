<template>
  <v-container fluid class="pa-0">
    <v-row v-if="estatus !== 'En Edición'">
      <v-col cols="12" md="3" offset-md="4" class="column">
        <v-text-field
          v-model="estatus"
          outlined
          readonly
          label="Estatus de la Sección"
          type="text"
        >
          <template v-slot:prepend>
            <v-icon :color="iconos_estatus.color">{{
              iconos_estatus.icon
            }}</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Identificación de costos
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('identificacion_costos')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="user.tipo_usuario == 2 && obs_identificacion_costos.observacion !== null"
              icon
              color="red lighten-1"
              @click="agregarObservacion('identificacion_costos')"
            >
              <v-icon dark>mdi-message-alert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headersCostos"
                  :items="costos"
                  hide-default-footer
                  class="tablaAlternativas"
                >
                  <template v-slot:item.descripcion="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.descripcion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.descripcion }}
                      <template v-slot:input>
                        <v-textarea
                          label="Descripción"
                          v-model="props.item.descripcion"
                          auto-grow
                          outlined
                          rows="3"
                          row-height="15"
                          maxlength="6000"
                          counter="600"
                          class="mt-5"
                        ></v-textarea>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.cuantificacion="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.cuantificacion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.cuantificacion }}
                      <template v-slot:input>
                        <v-text-field
                          label="Cuantificación"
                          placeholder="Placeholder"
                          v-model="props.item.cuantificacion"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.valoracion="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.valoracion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.valoracion | currency }}
                      <template v-slot:input>
                        <v-text-field
                          label="Valoración"
                          placeholder="Placeholder"
                          reverse
                          v-model="props.item.valoracion"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.periodicidad="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.periodicidad"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.periodicidad }}
                      <template v-slot:input>
                        <v-text-field
                          label="periodicidad"
                          placeholder="Placeholder"
                          v-model="props.item.periodicidad"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                </v-data-table>
                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                  {{ snackText }}
                  <v-btn text @click="snack = false">Close</v-btn>
                </v-snackbar>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Tabla componentes del proyecto -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Identificación de Beneficios
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('identificacion_beneficios')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
             <v-btn
              v-if="user.tipo_usuario == 2 && obs_identificacion_beneficios.observacion !== null"
              icon
              color="red lighten-1"
              @click="agregarObservacion('identificacion_beneficios')"
            >
              <v-icon dark>mdi-message-alert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" md="3" class="column">
                <div class="my-2">
                  <v-btn text color="green brighten-5" @click="agregarBeneficio" v-if="visible"
                    >+ Agregar beneficio</v-btn
                  >
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headersBeneficios"
                  :items="beneficios"
                  hide-default-footer
                  class="tablaAlternativas"
                >
                  <template v-slot:item.beneficio="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.beneficio"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.beneficio }}
                      <template v-slot:input>
                        <v-textarea
                          label="Beneficio"
                          v-model="props.item.beneficio"
                          auto-grow
                          outlined
                          rows="3"
                          row-height="15"
                          maxlength="280"
                          counter="280"
                          class="mt-5"
                        ></v-textarea>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.descripcion="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.descripcion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.descripcion }}
                      <template v-slot:input>
                        <v-textarea
                          label="Descripción"
                          v-model="props.item.descripcion"
                          auto-grow
                          outlined
                          rows="3"
                          row-height="15"
                          maxlength="600"
                          counter="600"
                          class="mt-5"
                        ></v-textarea>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.cuantificacion="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.cuantificacion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.cuantificacion }}
                      <template v-slot:input>
                        <v-text-field
                          label="Cuantificación"
                          placeholder="Placeholder"
                          v-model="props.item.cuantificacion"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.valoracion="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.valoracion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.valoracion | currency }}
                      <template v-slot:input>
                        <v-text-field
                          label="Valoración"
                          placeholder="Placeholder"
                          reverse
                          v-model="props.item.valoracion"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.periodicidad="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.periodicidad"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.periodicidad }}
                      <template v-slot:input>
                        <v-text-field
                          label="periodicidad"
                          placeholder="Placeholder"
                          v-model="props.item.periodicidad"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.accion="{ item }" v-if="visible">
                    <v-icon @click="deleteItem(item)" color="red darken-1">
                      mdi-delete-forever
                    </v-icon>
                  </template>
                </v-data-table>
                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                  {{ snackText }}
                  <v-btn text @click="snack = false">Close</v-btn>
                </v-snackbar>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { EventBus } from "../../utils/event-bus";

export default {
  props: ["ficha_tecnica"],
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.ficha_tecnica.id_anexo_siete !== null) {
      this.id_anexo_siete = this.ficha_tecnica.id_anexo_siete;
      this.buscarAnexoSiete();
    }

     if (this.ficha_tecnica.estatus == 2 || this.ficha_tecnica.estatus == 3) {
      this.visible = false;
    }
  },
  mounted() {
    EventBus.$on("guardarFicha", data => {
      this.guardarAnexoSiete(data);
    });

    //FEFOM
    EventBus.$on("validarSeccion", data => {
      this.validarAnexoSiete(data);
    });
    EventBus.$on("emitirObservaciones", data => {
      this.registrarObservaciones(data);
    });
    EventBus.$on("guardarObservaciones", data => {
      this.guardarObservaciones(data);
    });
  },
  data() {
    return {
      user: null,
      id_anexo_siete: null,
      snack: false,
      snackColor: "",
      snackText: "",
      max280chars: v => v.length <= 280 || "Input too long!",
      pagination: {},
      visible: true,
      headersCostos: [
        {
          text: "Tipo de Costo",
          align: "center",
          sortable: false,
          value: "tipoCosto",
          width: "20%"
        },
        {
          text: "Descripción",
          align: "center",
          sortable: false,
          value: "descripcion",
          width: "20%"
        },
        {
          text: "Cuantificación",
          align: "center",
          sortable: false,
          value: "cuantificacion",
          width: "20%"
        },
        {
          text: "Valoración",
          align: "right",
          sortable: false,
          value: "valoracion",
          width: "20%"
        },
        {
          text: "Periodicidad",
          align: "center",
          sortable: false,
          value: "periodicidad",
          width: "20%"
        }
      ],
      headersBeneficios: [
        {
          text: "Beneficio",
          align: "center",
          sortable: false,
          value: "beneficio",
          width: "20%"
        },
        {
          text: "Descripción",
          align: "center",
          sortable: false,
          value: "descripcion",
          width: "20%"
        },
        {
          text: "Cuantificación",
          align: "center",
          sortable: false,
          value: "cuantificacion",
          width: "15%"
        },
        {
          text: "Valoración",
          align: "right",
          sortable: false,
          value: "valoracion",
          width: "20%"
        },
        {
          text: "Periodicidad",
          align: "center",
          sortable: false,
          value: "periodicidad",
          width: "20%"
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "accion",
          width: "5%"
        }
      ],
      costos: [
        {
          tipoCosto: "INVERSIÓN",
          descripcion: "editar",
          cuantificacion: "editar",
          valoracion: "0.00",
          periodicidad: "editar"
        },
        {
          tipoCosto: "COSTO DE MANTENIMIENTO",
          descripcion: "editar",
          cuantificacion: "editar",
          valoracion: "0.00",
          periodicidad: "editar"
        },
        {
          tipoCosto: "COSTO DE OPERACIÓN",
          descripcion: "editar",
          cuantificacion: "editar",
          valoracion: "0.00",
          periodicidad: "editar"
        }
      ],
      beneficios: [],
      iconos_estatus: { color: "light-blue lighten-2", icon: "mdi-clock" },
      estatus: "En Edición",
      observaciones: [],
      obs_identificacion_costos:{
        observacion: null,
      },
      obs_identificacion_beneficios:{
        observacion: null,
      },
    };
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Dato guardado";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Cancelado";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    agregarBeneficio() {
      this.beneficios.push({
          beneficio: "nuevo beneficio",
          descripcion: "nueva descripción",
          cuantificacion: "nueva cuantificacion",
          valoracion: "0.00",
          periodicidad: "nueva periodicidad"
      });
    },
    deleteItem(item) {
      const index = this.beneficios.indexOf(item);
      this.beneficios.splice(index, 1);
    },
    buscarAnexoSiete() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_anexo_siete", {
          id_anexo_siete: this.id_anexo_siete
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            var data = response.data[0];
            console.log(data);
            this.costos = JSON.parse(data.costos);
            this.beneficios = JSON.parse(data.beneficios);
            data.observaciones !== null
              ? (this.observaciones = JSON.parse(data.observaciones))
              : (this.observaciones = []);
            switch (data.estatus) {
              case 2:
                this.iconos_estatus = {
                  color: "green lighten-1",
                  icon: "mdi-check-bold"
                };
                this.estatus = "Validada";
                if(this.ficha_tecnica.estatus == 5){
                  this.visible = false;
                }
                break;
              case 3:
                this.iconos_estatus = {
                  color: "red lighten-1",
                  icon: "mdi-comment-alert"
                };
                this.estatus = "Observaciones";
                if(this.ficha_tecnica.estatus == 5){
                  this.mostrarObservaciones()
                }
                break;
              default:
                break;
            }
          } else {
            console.log("Error", response.err);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    guardarAnexoSiete(data) {
      if (this.verificarDatos()) {
        this.$http
          .post("/ficha_tecnica/guardar_anexo_siete", {
            id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica,
            id_anexo_siete: this.ficha_tecnica.id_anexo_siete,
            costos: JSON.stringify(this.costos),
            beneficios: JSON.stringify(this.beneficios)
          })
          .then(response => {
            if (response.status == 200) {
              
              EventBus.$emit(
                "actualizaPropAnexoSiete",
                response.data.id_anexo_siete
              );
              this.$fire({
                type: "success",
                title: "Sección guardada correctamente",
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
    },
    validarAnexoSiete(data) {
      this.$http
        .post("/ficha_tecnica/validar_anexo_siete", {
          id_anexo_siete: this.id_anexo_siete
        })
        .then(response => {
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: `Sección validada correctamente`,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
            this.iconos_estatus = {
              color: "green lighten-1",
              icon: "mdi-check-bold"
            };
            this.estatus = "Validada";
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
    agregarObservacion(seccion) {
      var observacion_registrada = null;
      for (let index = 0; index < this.observaciones.length; index++) {
        if (this.observaciones[index].seccion == seccion) {
          observacion_registrada = {
            seccion: this.observaciones[index].seccion,
            descripcion_observacion: this.observaciones[index]
              .descripcion_observacion
          };
        }
      }
      EventBus.$emit("abreDialogObservacion", seccion, observacion_registrada);
    },
    registrarObservaciones(observacion) {
      var bandera = false;
      for (let index = 0; index < this.observaciones.length; index++) {
        if (this.observaciones[index].seccion == observacion.seccion) {
          this.observaciones[index].descripcion_observacion =
            observacion.descripcion_observacion;
          bandera = true;
        }
      }
      if (!bandera) {
        this.observaciones.push(observacion);
      }
    },
    guardarObservaciones() {
      this.$http
        .post("/ficha_tecnica/guardar_observaciones_anexo_siete", {
          id_anexo_siete: this.id_anexo_siete,
          observaciones: JSON.stringify(this.observaciones)
        })
        .then(response => {
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: `Observaciones de la sección VII guardadas correctamente.`,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
            this.iconos_estatus = {
              color: "red lighten-1",
              icon: "mdi-comment-alert"
            };
            this.estatus = "Observaciones";
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
    verificarDatos() {
      return true;
    },
    mostrarObservaciones(){
      this.observaciones.forEach(element => {
        console.log(element)
        switch (element.seccion) {
          case 'identificacion_costos':
            this.obs_identificacion_costos.observacion = element.descripcion_observacion
            break;
          case 'identificacion_beneficios':
            this.obs_identificacion_beneficios.observacion = element.descripcion_observacion
            break;
          default:
            break;
        }
      });
    },
  },
   beforeDestroy() {
    EventBus.$off("guardarFicha");
    EventBus.$off("validarSeccion");
    EventBus.$off("emitirObservaciones");
    EventBus.$off("guardarObservaciones");
  }
};
</script>
<style lang="css">
.tablaAlternativas table > thead > tr > th {
  background-color: #e0e0e0 !important;
}
.tablaAlternativas table > tbody > tr:hover {
  background-color: transparent !important;
}
.tablaAlternativas table > tbody > tr > td:hover {
  background-color: #f5f5f5 !important;
  /* font-size: 12pt !important; */
  font-weight: bold;
  text-align: right;
  width: 12.5%;
}
.totalFooter > td:hover {
  background-color: transparent !important;
}
.totalFooter {
  background-color: #e0e0e0 !important;
}
</style>
