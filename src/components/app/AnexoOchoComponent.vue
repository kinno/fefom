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
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Consideraciones Generales</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('consideraciones_generales')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="
                user.tipo_usuario == 2 &&
                  obs_consideraciones_generales.observacion !== null
              "
              icon
              color="red lighten-1"
              @click="agregarObservacion('consideraciones_generales')"
            >
              <v-icon dark>mdi-message-alert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="column">
                <v-textarea
                  label="Comentarios Finales:"
                  auto-grow
                  outlined
                  rows="10"
                  row-height="30"
                  maxlength="1000"
                  counter="1000"
                  v-model="comentarios_finales"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Responsables de la Información</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('responables_informacion')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="
                user.tipo_usuario == 2 &&
                  obs_responsables_informacion.observacion !== null
              "
              icon
              color="red lighten-1"
              @click="agregarObservacion('responables_informacion')"
            >
              <v-icon dark>mdi-message-alert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" class="pt-0">
                  <v-text-field
                    v-model="ramo"
                    label="Ramo"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="entidad"
                    label="Entidad"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="area_responsable"
                    label="Área Responsable:"
                    dense
                  ></v-text-field>
                  <v-card>
                    <v-card-text>
                      <div class="overline mb-4">Autorizó</div>
                      <v-text-field
                        v-model="nombre"
                        label="Nombre:"
                        dense
                      ></v-text-field>
                      <v-text-field
                        v-model="cargo"
                        label="Cargo:"
                        dense
                      ></v-text-field>
                    </v-card-text>
                  </v-card>

                  <v-text-field
                    v-model="responsable_informacion"
                    label="Responsable de la Información:"
                    dense
                    class="mt-5"
                  ></v-text-field>
                  <v-text-field
                    v-model="cargo_responsable_informacion"
                    label="Cargo:"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="telefono_responsable_informacion"
                    label="Teléfono:"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="email_responsable_informacion"
                    label="Correo Electrónico:"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
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
    if (this.ficha_tecnica.id_anexo_ocho !== null) {
      this.id_anexo_ocho = this.ficha_tecnica.id_anexo_ocho;
      this.buscarAnexoOcho();
    }

    if (this.ficha_tecnica.estatus == 2 || this.ficha_tecnica.estatus == 3) {
      this.visible = false;
    }
  },
  mounted() {
    EventBus.$on("guardarFicha", data => {
      this.guardarAnexoOcho(data);
    });

    //FEFOM
    EventBus.$on("validarSeccion", data => {
      this.validarAnexoOcho(data);
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
    id_anexo_ocho: null,
    comentarios_finales: "",
    ramo: "",
    entidad: "",
    area_responsable: "",
    nombre: "",
    cargo: "",
    responsable_informacion: "",
    cargo_responsable_informacion: "",
    telefono_responsable_informacion: "",
    email_responsable_informacion: "",

    visible: true,
    iconos_estatus: { color: "light-blue lighten-2", icon: "mdi-clock" },
    estatus: "En Edición",
    observaciones: [],
    obs_consideraciones_generales: {
      observacion: null,
      id_observacion: null
    },
    obs_responsables_informacion: {
      observacion: null,
      id_observacion: null
    }
  }),
  watch: {},
  methods: {
    buscarAnexoOcho() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_anexo_ocho", {
          id_anexo_ocho: this.id_anexo_ocho
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            var data = response.data[0];
            console.log(data);
            this.comentarios_finales = data.comentarios_finales;
            this.ramo = data.ramo;
            this.entidad = data.entidad;
            this.area_responsable = data.area_responsable;
            this.nombre = data.nombre;
            this.cargo = data.cargo;
            this.responsable_informacion = data.responsable_informacion;
            this.cargo_responsable_informacion =
              data.cargo_responsable_informacion;
            this.telefono_responsable_informacion =
              data.telefono_responsable_informacion;
            this.email_responsable_informacion =
              data.email_responsable_informacion;

            data.observaciones !== null
              ? (this.observaciones = JSON.parse(data.observaciones))
              : (this.observaciones = []);

            switch (data.estatus) {
              case 2:
                this.iconos_estatus = {
                  color: "green lighten-1",
                  icon: "mdi-check-bold"
                };
                this.estatus = "Aceptada";
                if (this.ficha_tecnica.estatus == 4) {
                  this.visible = false;
                }
                break;
              case 3:
                this.iconos_estatus = {
                  color: "red lighten-1",
                  icon: "mdi-comment-alert"
                };
                this.estatus = "Errores y Observaciones";
                if (this.ficha_tecnica.estatus == 4) {
                  this.mostrarObservaciones();
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
    guardarAnexoOcho(data) {
      if (this.verificarDatos()) {
        this.$http
          .post("/ficha_tecnica/guardar_anexo_ocho", {
            id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica,
            id_anexo_ocho: this.ficha_tecnica.id_anexo_ocho,
            comentarios_finales: this.comentarios_finales,
            ramo: this.ramo,
            entidad: this.entidad,
            area_responsable: this.area_responsable,
            nombre: this.nombre,
            cargo: this.cargo,
            responsable_informacion: this.responsable_informacion,
            cargo_responsable_informacion: this.cargo_responsable_informacion,
            telefono_responsable_informacion: this.telefono_responsable_informacion,
            email_responsable_informacion: this.email_responsable_informacion,
          })
          .then(response => {
            if (response.status == 200) {
              console.log(response);
              EventBus.$emit(
                "actualizaPropAnexoOcho",
                response.data.id_anexo_ocho
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
    validarAnexoOcho(data) {
      this.$http
        .post("/ficha_tecnica/validar_anexo_ocho", {
          id_anexo_ocho: this.id_anexo_ocho
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
        .post("/ficha_tecnica/guardar_observaciones_anexo_ocho", {
          id_anexo_ocho: this.id_anexo_ocho,
          observaciones: JSON.stringify(this.observaciones)
        })
        .then(response => {
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: `Observaciones de la sección VIII guardadas correctamente.`,
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
    mostrarObservaciones() {
      this.observaciones.forEach(element => {
        console.log(element);
        switch (element.seccion) {
          case "consideraciones_generales":
            this.obs_consideraciones_generales.observacion =
              element.descripcion_observacion;
            this.obs_consideraciones_generales.id_observacion =
              element.id_observacion;
            break;
          case "responsables_informacion":
            this.obs_responsables_informacion.observacion =
              element.descripcion_observacion;
            this.obs_responsables_informacion.id_observacion =
              element.id_observacion;
            break;
          default:
            break;
        }
      });
    }
  },
  beforeDestroy() {
    EventBus.$off("guardarFicha");
    EventBus.$off("validarSeccion");
    EventBus.$off("emitirObservaciones");
    EventBus.$off("guardarObservaciones");
  }
};
</script>
<style></style>
