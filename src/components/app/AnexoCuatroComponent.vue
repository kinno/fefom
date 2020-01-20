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
            <v-toolbar-title>Posibles medidas de optimización</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('posibles_medidas_optimizacion')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="6" class="column">
                <v-textarea
                  label="Medida:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                  v-model="medida_optimizacion"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
              <v-col cols="6" class="column">
                <v-textarea
                  label="Descripción:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                  v-model="descripcion_optimizacion"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title class="subtitle-2 text-center">Análisis de la oferta sin proyecto* (considerando medidas de optimización)</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('analisis_oferta_sin_proyecto')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
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
                  maxlength="280"
                  counter="280"
                  v-model="analisis_oferta_sin_proyecto"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title class="subtitle-2 text-center">Análisis de la demanda sin proyecto* (considerando medidas de optimización)</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('analisis_demanda_sin_proyecto')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
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
                  maxlength="280"
                  counter="280"
                  v-model="analisis_demanda_sin_proyecto"
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
import {EventBus} from '../../utils/event-bus'

export default {
  props:['ficha_tecnica'],
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
   if (this.ficha_tecnica.id_anexo_cuatro !== null) {
      this.id_anexo_cuatro = this.ficha_tecnica.id_anexo_cuatro;
      this.buscarAnexoCuatro();
    }

     if (this.ficha_tecnica.estatus == 2 || this.ficha_tecnica.estatus == 3) {
      this.visible = false;
    }
  },
  mounted() {
     EventBus.$on("guardarFicha", data => {
      this.guardarAnexoCuatro(data);
    });

    //FEFOM
    EventBus.$on("validarSeccion", data => {
      this.validarAnexoCuatro(data);
    });
    EventBus.$on("emitirObservaciones", data => {
      this.registrarObservaciones(data);
    });
    EventBus.$on("guardarObservaciones", data => {
      this.guardarObservaciones(data);
    });
  },
  data: () => ({
    user: null,
    id_anexo_cuatro: null,
    medida_optimizacion: "",
    descripcion_optimizacion: "",
    analisis_oferta_sin_proyecto: "",
    analisis_demanda_sin_proyecto: "",
    tab: null,
    showTab: false,
    visible: true,
     iconos_estatus: { color: "light-blue lighten-2", icon: "mdi-clock" },
     estatus: "En Edición",
      observaciones: []
  }),
  watch: {
     
  },
  methods: {
   buscarAnexoCuatro(){
     EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_anexo_cuatro", {
          id_anexo_cuatro: this.id_anexo_cuatro
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            var data = response.data[0]
            console.log(data)
            this.medida_optimizacion = data.medida_optimizacion
            this.descripcion_optimizacion = data.descripcion_optimizacion
            this.analisis_oferta_sin_proyecto = data.analisis_oferta_sin_proyecto
            this.analisis_demanda_sin_proyecto = data.analisis_demanda_sin_proyecto
            switch (data.estatus) {
              case 2:
                this.iconos_estatus = {
                  color: "green lighten-1",
                  icon: "mdi-check-bold"
                };
                this.estatus = "Aceptada";
                break;
              case 3:
                this.iconos_estatus = {
                  color: "red lighten-1",
                  icon: "mdi-comment-alert"
                };
                this.estatus = "Errores y Observaciones";
                break;
              default:
                break;
            }

            data.observaciones !== null
              ? (this.observaciones = JSON.parse(data.observaciones))
              : (this.observaciones = []);
          } else {
            console.log("Error", response.err);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    guardarAnexoCuatro(data) {
      if (this.verificarDatos()) {
        this.$http
          .post("/ficha_tecnica/guardar_anexo_cuatro", { 
            id_ficha_tecnica:  this.ficha_tecnica.id_ficha_tecnica,
            id_anexo_cuatro: this.ficha_tecnica.id_anexo_cuatro,
            medida_optimizacion: this.medida_optimizacion,
            descripcion_optimizacion: this.descripcion_optimizacion,
            analisis_oferta_sin_proyecto: this.analisis_oferta_sin_proyecto,
            analisis_demanda_sin_proyecto: this.analisis_demanda_sin_proyecto,
          
          })
          .then(response => {
            if (response.status == 200) {
              // console.log(response);
              EventBus.$emit("actualizaPropAnexoCuatro",response.data.id_anexo_cuatro)
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
    validarAnexoCuatro(data) {
      this.$http
        .post("/ficha_tecnica/validar_anexo_cuatro", {
          id_anexo_cuatro: this.id_anexo_cuatro
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
            this.estatus = "Aceptada";
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
            id_observacion: this.observaciones[index].id_observacion,
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
          this.observaciones[index].id_observacion = observacion.id_observacion;
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
        .post("/ficha_tecnica/guardar_observaciones_anexo_cuatro", {
          id_anexo_cuatro: this.id_anexo_cuatro,
          observaciones: JSON.stringify(this.observaciones)
        })
        .then(response => {
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: `Observaciones de la sección IV guardadas correctamente.`,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
            this.iconos_estatus = {
                  color: "red lighten-1",
                  icon: "mdi-comment-alert"
                };
                this.estatus = "Errores y Observaciones";
            
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
  },
  beforeDestroy() {
    EventBus.$off("guardarFicha");
    EventBus.$off("validarSeccion");
    EventBus.$off("emitirObservaciones");
    EventBus.$off("guardarObservaciones");
  }
};
</script>
<style>

</style>