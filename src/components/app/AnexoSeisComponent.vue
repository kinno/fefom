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
    <!-- Descripción general -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Descripción General
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('descripcion_general')"
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
                  v-model="descripcion_general"
                  :disabled="!visible"
                ></v-textarea>
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
              Descripción de los componentes del proyecto
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('descripcion_componentes_proyecto')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
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
                    @click="agregarComponente"
                    v-if="visible"
                    >+ Agregar componente</v-btn
                  >
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="componentes"
                  hide-default-footer
                  class="tablaAlternativas"
                >
                  <template v-slot:item.componente="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.componente"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.componente }}
                      <template v-slot:input>
                        <v-text-field
                          label="Componente"
                          placeholder="Placeholder"
                          v-model="props.item.componente"
                        ></v-text-field>
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
                          maxlength="280"
                          counter="280"
                          class="mt-5"
                        ></v-textarea>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.costoUnitario="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.costoUnitario"
                      @save="
                        calcularTotal(props.item.costoUnitario, props.item)
                      "
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.costoUnitario | currency }}
                      <template v-slot:input>
                        <v-text-field
                          label="Costo Unitario"
                          placeholder="Placeholder"
                          reverse
                          v-model="props.item.costoUnitario"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.cantidad="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.cantidad"
                      @save="calcularTotal(props.item.cantidad, props.item)"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.cantidad }}
                      <template v-slot:input>
                        <v-text-field
                          label="Costo Unitario"
                          placeholder="Placeholder"
                          v-model="props.item.cantidad"
                          type="number"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.unidadMedida="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.unidadMedida"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.unidadMedida }}
                      <template v-slot:input>
                        <v-text-field
                          label="Unidad de medida"
                          placeholder="Placeholder"
                          v-model="props.item.unidadMedida"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.montoTotal="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.montoTotal"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.montoTotal | currency }}
                      <template v-slot:input>
                        <v-text-field
                          label="Monto total (con IVA)"
                          placeholder="Monto Total"
                          v-model="props.item.montoTotal"
                          reverse
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.accion="{ item }" v-if="visible">
                    <v-icon @click="deleteItem(item)" color="red darken-1">
                      mdi-delete-forever
                    </v-icon>
                  </template>
                  <template v-slot:body.append="{ footers }">
                    <tr class="totalFooter">
                      <td :colspan="5" class="text-right font-weight-black">
                        Total
                      </td>
                      <td :colspan="5" class="text-right font-weight-black">
                        {{ total_componentes | currency }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <v-snackbar v-model="snack" :timeout="10000" :color="snackColor">
                  {{ snackText }}
                  <v-btn text @click="snack = false">Close</v-btn>
                </v-snackbar>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Aspectos relevantes y mapa -->
    <v-row>
      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Aspectos ambientales más relevantes
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="user.tipo_usuario == 1"
                  icon
                  color="red lighten-1"
                  @click="agregarObservacion('aspectos_ambientales')"
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
                      v-model="aspecto_ambiental"
                      :disabled="!visible"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Aspectos técnicos más relevantes
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="user.tipo_usuario == 1"
                  icon
                  color="red lighten-1"
                  @click="agregarObservacion('aspectos_tecnicos')"
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
                      v-model="aspecto_tecnico"
                      :disabled="!visible"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Aspectos legales más relevantes
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="user.tipo_usuario == 1"
                  icon
                  color="red lighten-1"
                  @click="agregarObservacion('aspectos_legales')"
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
                      v-model="aspecto_legal"
                      :disabled="!visible"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Plano de localización del proyecto
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('plano_localizacion')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="10" class="column">
                <v-file-input
                  v-if="visible"
                  dense
                  outlined
                  v-model="imagenNueva"
                  accept="image/*"
                  label="Cargar plano de localización del proyecto"
                  prepend-icon="mdi-camera"
                  @change="cargaImagen"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="column"
                v-if="ruta_imagen_proyecto !== null"
              >
                <v-card class="mx-auto">
                  <v-img
                    class="white--text align-end"
                    :src="`./uploads/imgfichas/${this.ruta_imagen_proyecto}`"
                    aspect-ratio="2"
                    contain
                    @load="loading = !loading"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="visible"
                      color="red"
                      text
                      @click="eliminaImagen(ruta_imagen_proyecto)"
                    >
                      Eliminar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Análisis proyecto -->
    <v-row>
      <v-col cols="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Análisis de la oferta con proyecto
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('analisis_oferta_con_proyecto')"
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
                  v-model="analisis_oferta_proyecto"
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
            <v-toolbar-title>
              Análisis de la demanda con proyecto
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('analisis_demanda_con_proyecto')"
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
                  v-model="analisis_demanda_proyecto"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Diagnóstico -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Diagnostico de la sitación con proyecto
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('diagnostico_situacion_proyecto')"
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
                  v-model="diagnostico"
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
    if (this.ficha_tecnica.id_anexo_seis !== null) {
      this.id_anexo_seis = this.ficha_tecnica.id_anexo_seis;
      this.buscarAnexoSeis();
    }
    if (this.ficha_tecnica.estatus == 2 || this.ficha_tecnica.estatus == 3) {
      this.visible = false;
    }
  },
  mounted() {
    EventBus.$on("guardarFicha", data => {
      this.guardarAnexoSeis(data);
    });

    //FEFOM
    EventBus.$on("validarSeccion", data => {
      this.validarAnexoSeis(data);
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
      snack: false,
      snackColor: "",
      snackText: "",
      max280chars: v => v.length <= 280 || "Input too long!",
      pagination: {},
      visible: true,
      headers: [
        {
          text: "Componente",
          align: "center",
          sortable: false,
          value: "componente",
          width: "10%"
        },
        {
          text: "Descripción",
          align: "center",
          sortable: false,
          value: "descripcion",
          width: "35%"
        },
        {
          text: "Costo Unitario",
          align: "right",
          sortable: false,
          value: "costoUnitario",
          width: "15%"
        },
        {
          text: "Cantidad",
          align: "center",
          sortable: false,
          value: "cantidad",
          width: "10%"
        },
        {
          text: "Unidad de medida",
          align: "center",
          sortable: false,
          value: "unidadMedida",
          width: "10%"
        },
        {
          text: "Monto Total (Incluye IVA)",
          align: "right",
          sortable: false,
          value: "montoTotal",
          width: "15%"
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "accion",
          width: "5%"
        }
      ],
      id_anexo_seis: null,
      componentes: [],
      total_componentes: 0.0,
      descripcion_general: "",
      aspecto_ambiental: "",
      aspecto_tecnico: "",
      aspecto_legal: "",
      analisis_oferta_proyecto: "",
      analisis_demanda_proyecto: "",
      diagnostico: "",
      ruta_imagen_proyecto: null,
      imagenNueva: null,
      iconos_estatus: { color: "light-blue lighten-2", icon: "mdi-clock" },
      estatus: "En Edición",
      observaciones: []
    };
  },
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
                this.ruta_imagen_proyecto = resp.data;
                this.imagenNueva = null;
              } else {
                this.message = "Ocurrió un error al cargar los productos";
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
    eliminaImagen(imagen) {
      // console.log(imagen);
      this.$http
        .post("/ficha_tecnica/delete", {
          imagen: imagen
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.ruta_imagen_proyecto = null;
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
    agregarComponente() {
      this.componentes.push({
        componente: "Nuevo",
        descripcion: "Nuevo",
        costoUnitario: 0.0,
        cantidad: 0.0,
        unidadMedida: "nuevo",
        montoTotal: 0.0
      });
    },
    deleteItem(item) {
      const index = this.componentes.indexOf(item);
      this.componentes.splice(index, 1);
    },
    calcularTotal(val, item) {
      // console.log(item)
      item.montoTotal =
        parseFloat(item.costoUnitario) * parseFloat(item.cantidad);
      if (
        +this.total_componentes + item.montoTotal <=
        this.ficha_tecnica.monto_con_iva
      ) {
        this.total_componentes = +this.total_componentes + item.montoTotal;
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "Dato guardado";
      } else {
        const index = this.componentes.indexOf(item);
        this.componentes.splice(index, 1);
        this.snack = true;
        this.snackColor = "red lighten-1";
        this.total_componentes - item.montoTotal < 0
          ? (this.total_componentes = 0.0)
          : this.total_componentes - item.montoTotal;
        this.snackText =
          "Error: La suma de los montos de los componentes ha superado el monto del proyecto.";
      }
    },
    buscarAnexoSeis() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_anexo_seis", {
          id_anexo_seis: this.id_anexo_seis
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            var data = response.data[0];
            console.log(data);
            (this.componentes = JSON.parse(data.componentes)),
              (this.descripcion_general = data.descripcion_general),
              (this.aspecto_ambiental = data.aspecto_ambiental),
              (this.aspecto_tecnico = data.aspecto_tecnico),
              (this.aspecto_legal = data.aspecto_legal),
              (this.analisis_oferta_proyecto = data.analisis_oferta_proyecto),
              (this.analisis_demanda_proyecto = data.analisis_demanda_proyecto),
              (this.diagnostico = data.diagnostico),
              (this.ruta_imagen_proyecto = data.ruta_imagen_proyecto);
            this.componentes.forEach(element => {
              this.total_componentes =
                this.total_componentes + element.montoTotal;
            });
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
    guardarAnexoSeis(data) {
      if (this.verificarDatos()) {
        this.$http
          .post("/ficha_tecnica/guardar_anexo_seis", {
            id_ficha_tecnica: this.ficha_tecnica.id_ficha_tecnica,
            id_anexo_seis: this.ficha_tecnica.id_anexo_seis,
            componentes: JSON.stringify(this.componentes),
            descripcion_general: this.descripcion_general,
            aspecto_ambiental: this.aspecto_ambiental,
            aspecto_tecnico: this.aspecto_tecnico,
            aspecto_legal: this.aspecto_legal,
            analisis_oferta_proyecto: this.analisis_oferta_proyecto,
            analisis_demanda_proyecto: this.analisis_demanda_proyecto,
            diagnostico: this.diagnostico,
            ruta_imagen_proyecto: this.ruta_imagen_proyecto
          })
          .then(response => {
            if (response.status == 200) {
              // console.log(response);
              EventBus.$emit(
                "actualizaPropAnexoSeis",
                response.data.id_anexo_seis
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
    validarAnexoSeis(data) {
      this.$http
        .post("/ficha_tecnica/validar_anexo_seis", {
          id_anexo_seis: this.id_anexo_seis
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
        .post("/ficha_tecnica/guardar_observaciones_anexo_seis", {
          id_anexo_seis: this.id_anexo_seis,
          observaciones: JSON.stringify(this.observaciones)
        })
        .then(response => {
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: `Observaciones de la sección VI guardadas correctamente.`,
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
      // console.log("Verificar",this.total_componentes , this.ficha_tecnica.monto_con_iva)
      if (this.total_componentes < this.ficha_tecnica.monto_con_iva) {
        this.snack = true;
        this.snackColor = "red lighten-1";
        this.snackText =
          "Error: El monto total de los componentes es menor al monto del proyecto. Por favor verificar.";
        return false;
      } else {
        return true;
      }
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
