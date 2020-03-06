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
            <v-toolbar-title>Descripción de la problemática</v-toolbar-title>
             <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('descripcion_problematica')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="user.tipo_usuario == 2 && obs_descripcion_problematica.observacion !== null"
              icon
              color="red lighten-1"
              @click="agregarObservacion('descripcion_problematica')"
            >
              <v-icon dark>mdi-message-alert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="column">
                <v-textarea
                  label="Descripción:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="1000"
                  counter="1000"
                  v-model="descripcion_problematica"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="column">
                <v-file-input
                  v-if="visible"
                  dense
                  outlined
                  v-model="imagenNueva"
                  accept="image/*"
                  label="Cargar imagen"
                  prepend-icon="mdi-camera"
                  @change="cargaImagen"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="3"
                class="column"
                v-for="(imagen, index) in imagenes"
                :key="index"
              >
                <v-card class="mx-auto">
                  <v-img
                    class="white--text align-end"
                    :src="`./uploads/imgfichas/${imagen.url}`"
                    aspect-ratio="1"
                    contain
                  >
                  </v-img>
                  <v-card-text class="text--primary">
                    <v-textarea
                      label="Descripción:"
                      auto-grow
                      outlined
                      rows="1"
                      row-height="15"
                      v-model="imagen.descripcion"
                      maxlength="280"
                      counter="280"
                      :disabled="!visible"
                    ></v-textarea>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="visible"
                      color="red"
                      text
                      @click="eliminaImagen(imagen, index)"
                    >
                      Eliminar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="column mt-5">
                <v-textarea
                  label="Análisis de la oferta:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="1000"
                  counter="1000"
                  v-model="analisis_oferta"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
              <v-col cols="6" class="column mt-5">
                <v-textarea
                  label="Análisis de la demanda:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="1000"
                  counter="1000"
                  v-model="analisis_demanda"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" offset-md="3" class="column">
        <v-row>
          <v-col cols="12">
            <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Variables relevantes
                </v-toolbar-title>
                 <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('variables_relevantes')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="user.tipo_usuario == 2 && obs_variables_relevantes.observacion !== null"
              icon
              color="red lighten-1"
              @click="agregarObservacion('variables_relevantes')"
            >
              <v-icon dark>mdi-message-alert</v-icon>
            </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="6" class="column">
                    <div class="my-2">
                      <v-btn
                      v-if="visible"
                        text
                        color="green brighten-5"
                        @click="agregarComponente"
                        >+ Agregar concepto</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers"
                      :items="variables_relevantes"
                      hide-default-footer
                      class="tablaAlternativas"
                    >
                      <template v-slot:item.concepto="props" v-if="visible">
                        <v-edit-dialog
                          :return-value.sync="props.item.concepto"
                          @save="save"
                          save-text="Aceptar"
                          @cancel="cancel"
                          cancel-text="Cancelar"
                          @open="open"
                          @close="close"
                          large
                          persistent
                        >
                          {{ props.item.concepto }}
                          <template v-slot:input>
                            <v-text-field
                              label="Concepto"
                              placeholder="Concepto"
                              v-model="props.item.concepto"
                            ></v-text-field>
                          </template>
                        </v-edit-dialog>
                      </template>
                      <template v-slot:item.situacionActual="props" v-if="visible">
                        <v-edit-dialog
                          :return-value.sync="props.item.situacionActual"
                          @save="save"
                          save-text="Aceptar"
                          @cancel="cancel"
                          cancel-text="Cancelar"
                          @open="open"
                          @close="close"
                          large
                          persistent
                        >
                          {{ props.item.situacionActual }}
                          <template v-slot:input>
                            <v-textarea
                              label="Descripción"
                              v-model="props.item.situacionActual"
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
                      <template v-slot:item.accion="{ item }" v-if="visible">
                        <v-icon @click="deleteItem(item)" color="red darken-1">
                          mdi-delete-forever
                        </v-icon>
                      </template>
                    </v-data-table>
                    <v-snackbar
                      v-model="snack"
                      :timeout="3000"
                      :color="snackColor"
                    >
                      {{ snackText }}
                      <v-btn text @click="snack = false">Close</v-btn>
                    </v-snackbar>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
    if (this.ficha_tecnica.estatus == 2 || this.ficha_tecnica.estatus == 3) {
      this.visible = false;
    }
    if (this.ficha_tecnica.id_anexo_tres !== null) {
      this.id_anexo_tres = this.ficha_tecnica.id_anexo_tres;
      this.buscarAnexoTres();
    }
  },
  mounted() {
    EventBus.$on("guardarFicha", data => {
      this.guardarAnexoTres(data);
    });

    //FEFOM
    EventBus.$on("validarSeccion", data => {
      this.validarAnexoTres(data);
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
     iconos_estatus: { color: "light-blue lighten-2", icon: "mdi-clock" },
    id_anexo_tres: null,
    visible: true,
    imagenes: [
      // {
      //   url: "file-1574973193343.jpg",
      //   descripcion: `Nunc sed turpis. Curabitur blandit mollis lacus. Nunc nec neque. Etiam vitae tortor. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.`
      // }
    ],
    imagenNueva: null,
    descripcion_problematica: "",
    analisis_oferta: "",
    analisis_demanda: "",
    snack: false,
    snackColor: "",
    snackText: "",
    max280chars: v => v.length <= 280 || "Input too long!",
    pagination: {},
    headers: [
      {
        text: "Concepto",
        align: "center",
        sortable: false,
        value: "concepto",
        width: "50%"
      },
      {
        text: "Situación Actual",
        align: "center",
        sortable: false,
        value: "situacionActual",
        width: "45%"
      },
      {
        text: "",
        align: "center",
        sortable: false,
        value: "accion",
        width: "5%"
      }
    ],
    variables_relevantes: [],
    estatus: "En Edición",
      observaciones: [],
      obs_descripcion_problematica:{
        observacion: null,
      },
      obs_variables_relevantes:{
        observacion: null,
      },
  }),
  watch: {},
  methods: {
    async cargaImagen() {
      if (this.imagenNueva !== null) {
        const formData = new FormData();
        formData.append("file", this.imagenNueva);
        formData.append("id_municipio", this.user.id_municipio);
        try {
          await this.$http
            .post("/ficha_tecnica/upload", formData)
            .then(async resp => {
              if (resp.status == 200) {
                console.log(resp);
                this.imagenes.push({
                  url: resp.data,
                  descripcion: this.descripcionNueva
                });
                this.imagenNueva = null;
                this.descripcionNueva = "";
              } else {
                this.message = "Ocurrió un error al cargar los productos";
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
    eliminaImagen(imagen, index) {
      this.$http
        .post("/ficha_tecnica/delete", {
          imagen: imagen.url
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.imagenes.splice(index, 1);
          } else {
            console.log("Error", response.err);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    buscarAnexoTres() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_anexo_tres", {
          id_anexo_tres: this.id_anexo_tres
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            var data = response.data[0];
            console.log(data);
            this.descripcion_problematica = data.descripcion_problematica;
            this.imagenes = JSON.parse(data.imagenes);
            this.analisis_oferta = data.analisis_oferta;
            this.analisis_demanda = data.analisis_demanda;
            this.variables_relevantes = JSON.parse(data.variables_relevantes);

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
    agregarComponente() {
      this.variables_relevantes.push({
        concepto: "Nuevo",
        situacionActual: "Nuevo"
      });
    },
    deleteItem(item) {
      const index = this.variables_relevantes.indexOf(item);
      this.variables_relevantes.splice(index, 1);
    },
    guardarAnexoTres(data) {
      if (this.verificarDatos()) {
        this.$http
          .post("/ficha_tecnica/guardar_anexo_tres", {
            id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica,
            id_anexo_tres: this.ficha_tecnica.id_anexo_tres,
            descripcion_problematica: this.descripcion_problematica,
            imagenes: JSON.stringify(this.imagenes),
            analisis_oferta: this.analisis_oferta,
            analisis_demanda: this.analisis_demanda,
            variables_relevantes: JSON.stringify(this.variables_relevantes)
          })
          .then(response => {
            if (response.status == 200) {
              // console.log(response);
              EventBus.$emit(
                "actualizaPropAnexoTres",
                response.data.id_anexo_tres
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
    validarAnexoTres(data) {
      this.$http
        .post("/ficha_tecnica/validar_anexo_tres", {
          id_anexo_tres: this.id_anexo_tres
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
        .post("/ficha_tecnica/guardar_observaciones_anexo_tres", {
          id_anexo_tres: this.id_anexo_tres,
          observaciones: JSON.stringify(this.observaciones)
        })
        .then(response => {
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: `Observaciones de la sección III guardadas correctamente.`,
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
      if(this.imagenes.length < 0){
        this.$fire({
              type: "warning",
              title: "Error",
              text: "Se deben cargar por lo menos 4 imágenes",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
        return false;
      } 
      if(this.imagenes.length > 6){
        this.$fire({
              type: "warning",
              title: "Error",
              text: "Se deben cargar máximo 6 imágenes",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
        return false;
      } 
      return true;
    },
    mostrarObservaciones(){
      this.observaciones.forEach(element => {
        console.log(element)
        switch (element.seccion) {
          case 'descripcion_problematica':
            this.obs_descripcion_problematica.observacion = element.descripcion_observacion
            break;
          case 'variables_relevantes':
            this.obs_variables_relevantes.observacion = element.descripcion_observacion
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
<style></style>
