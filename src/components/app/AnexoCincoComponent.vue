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
            <v-toolbar-title>Alternativas de Solución</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('alternativas_solucion')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="user.tipo_usuario == 2 && obs_alternativas_solucion.observacion !== null"
              icon
              color="red lighten-1"
              @click="agregarObservacion('alternativas_solucion')"
            >
              <v-icon dark>mdi-message-alert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" md="3" class="column">
                <div class="my-2">
                  <v-btn
                    text
                    color="green brighten-5"
                    @click="agregarAlternativa"
                    v-if="visible"
                    >+ Agregar alternativa</v-btn
                  >
                </div>
              </v-col>
            </v-row>
            <v-data-table
          :headers="headers"
          :items="alternativas_costos"
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
                  label="Descripción de alternativa"
                  v-model="props.item.descripcion"
                  auto-grow
                  outlined
                  rows="3"
                  row-height="15"
                  maxlength="1000"
                  counter="1000"
                  class="mt-5"
                ></v-textarea>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.costoMantenimiento="props" v-if="visible">
            <v-edit-dialog
              :return-value.sync="props.item.costoMantenimiento"
              @save="save"
              save-text="Aceptar"
              @cancel="cancel"
              cancel-text="Cancelar"
              @open="open"
              @close="close"
              large
              persistent
            >
              {{ props.item.costoMantenimiento | currency }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.costoMantenimiento"
                  label="Costo de mantenimiento"
                  reverse
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.costoOperacion="props" v-if="visible">
            <v-edit-dialog
              :return-value.sync="props.item.costoOperacion"
              @save="save"
              save-text="Aceptar"
              @cancel="cancel"
              cancel-text="Cancelar"
              @open="open"
              @close="close"
              large
              persistent
            >
              {{ props.item.costoOperacion | currency }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.costoOperacion"
                  label="Costo de mantenimiento"
                  reverse
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.costoTotal="props" v-if="visible">
            <v-edit-dialog
              :return-value.sync="props.item.costoTotal"
              @save="save"
              save-text="Aceptar"
              @cancel="cancel"
              cancel-text="Cancelar"
              @open="open"
              @close="close"
              large
              persistent
            >
              {{ props.item.costoTotal | currency }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.costoTotal"
                  label="Costo total"
                  reverse
                  counter
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
          </v-card-text>
        </v-card>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
          {{ snackText }}
          <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title
              >Justificación de la alternativa de solución
              seleccionada</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('justificacion_solucion_seleccionada')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="user.tipo_usuario == 2 && obs_justificacion_solucion_seleccionada.observacion !== null"
              icon
              color="red lighten-1"
              @click="agregarObservacion('justificacion_solucion_seleccionada')"
            >
              <v-icon dark>mdi-message-alert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="column">
                <v-textarea
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="1000"
                  counter="1000"
                  v-model="justificacion"
                  :disabled="!visible"
                ></v-textarea>
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
    if (this.ficha_tecnica.id_anexo_cinco !== null) {
      this.id_anexo_cinco = this.ficha_tecnica.id_anexo_cinco;
      this.buscarAnexoCinco();
    }

     if (this.ficha_tecnica.estatus == 2 || this.ficha_tecnica.estatus == 3) {
      this.visible = false;
    }

  },
  mounted() {
    
    EventBus.$on("guardarFicha", data => {
      this.guardarAnexoCinco(data);
    });

     //FEFOM
    EventBus.$on("validarSeccion", data => {
      this.validarAnexoCinco(data);
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
      id_anexo_cinco: null,
      snack: false,
      snackColor: "",
      snackText: "",
      max280chars: v => v.length <= 280 || "Input too long!",
      pagination: {},
      visible: true,
      headers: [
        {
          text: "Descripción de alternativas de solución desechadas",
          align: "left",
          sortable: false,
          value: "descripcion",
          width: "50%"
        },
        {
          text: "Costo de mantenimiento",
          value: "costoMantenimiento",
          align: "right",
          width: "16.6%",
          sortable: false
        },
        {
          text: "Costo de operación",
          value: "costoOperacion",
          align: "right",
          width: "16.6%",
          sortable: false
        },
        {
          text: "Costo Total (incluye IVA)",
          value: "costoTotal",
          align: "right",
          width: "16.6%",
          sortable: false
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "accion",
          width: "5%"
        }
      ],
      alternativas_costos: [
        {
          descripcion: "Alternativa 1",
          costoMantenimiento: 0.0,
          costoOperacion: 0.0,
          costoTotal: 0.0
        },
        {
          descripcion: "Alternativa 2",
          costoMantenimiento: 0.0,
          costoOperacion: 0.0,
          costoTotal: 0.0
        }
      ],
      justificacion: null,
       iconos_estatus: { color: "light-blue lighten-2", icon: "mdi-clock" },
     estatus: "En Edición",
      observaciones: [],
       obs_alternativas_solucion:{
        observacion: null,
      },
      obs_justificacion_solucion_seleccionada:{
        observacion: null,
      },
    };
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    agregarAlternativa() {
      if(this.alternativas_costos.length == 2){
        this.snack = true;
        this.snackColor = "red lighten-1";
        this.snackText =
          "Error: Sólo se pueden registrar máximo 2 alternativas de solución.";
        return false;
      }
      this.alternativas_costos.push({
        descripcion: "Nueva Alternativa",
        costoMantenimiento: 0.0,
        costoOperacion: 0.0,
        costoTotal: 0.0
      });
    },
    deleteItem(item) {
      if(this.alternativas_costos.length == 1){
        this.snack = true;
        this.snackColor = "red lighten-1";
        this.snackText =
          "Error: Debe registrar por lo menos 1 alternativa de solución.";
        return false;
      }
      const index = this.alternativas_costos.indexOf(item);
      this.alternativas_costos.splice(index, 1);
    },
    buscarAnexoCinco() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_anexo_cinco", {
          id_anexo_cinco: this.id_anexo_cinco
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            var data = response.data[0];
            console.log(data);
            this.alternativas_costos = JSON.parse(data.alternativas_costos);
            this.justificacion = data.justificacion;
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
                if(this.ficha_tecnica.estatus == 4){
                  this.visible = false;
                }
                break;
              case 3:
                this.iconos_estatus = {
                  color: "red lighten-1",
                  icon: "mdi-comment-alert"
                };
                this.estatus = "Observaciones";
                if(this.ficha_tecnica.estatus == 4){
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
    guardarAnexoCinco(data) {
      if (this.verificarDatos()) {
        this.$http
          .post("/ficha_tecnica/guardar_anexo_cinco", {
            id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica,
            id_anexo_cinco: this.ficha_tecnica.id_anexo_cinco,
            alternativas_costos: JSON.stringify(this.alternativas_costos),
            justificacion: this.justificacion
          })
          .then(response => {
            if (response.status == 200) {
              // console.log(response);
              EventBus.$emit(
                "actualizaPropAnexoCinco",
                response.data.id_anexo_cinco
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
    validarAnexoCinco(data) {
      this.$http
        .post("/ficha_tecnica/validar_anexo_cinco", {
          id_anexo_cinco: this.id_anexo_cinco
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
        .post("/ficha_tecnica/guardar_observaciones_anexo_cinco", {
          id_anexo_cinco: this.id_anexo_cinco,
          observaciones: JSON.stringify(this.observaciones)
        })
        .then(response => {
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: `Observaciones de la sección V guardadas correctamente.`,
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
          case 'alternativas_solucion':
            this.obs_alternativas_solucion.observacion = element.descripcion_observacion
            break;
          case 'justificación_solucion_seleccionada':
            this.obs_justificacion_solucion_seleccionada.observacion = element.descripcion_observacion
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
</style>
