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
      <v-col cols="12" md="10" offset-md="1" class="column">
        <v-text-field
          v-if="user.tipo_usuario == 1"
          value=""
          label="Unidad Responsable:"
          dense
          v-model="unidad_responsable"
          :disabled="true"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="10" offset-md="1" class="column">
        <v-text-field
          v-if="user.tipo_usuario == 1"
          value=""
          label="Nombre del PPI:"
          dense
          v-model="id_cartera_proyecto"
          :disabled="true"
          outlined
        ></v-text-field>
        <v-select
          v-else
          v-model="id_cartera_proyecto"
          :items="proyectos"
          item-text="nombre_proyecto"
          item-value="id_cartera_proyecto"
          label="Nombre del PPI:"
          return-object
          outlined
          dense
          required
          :disabled="!visible"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="column">
        <v-text-field
          v-if="user.tipo_usuario == 1"
          value=""
          label="Tipo de PPI:"
          dense
          v-model="id_tipo_ppi"
          :disabled="true"
          outlined
        ></v-text-field>
        <v-select
          v-else
          v-model="id_tipo_ppi"
          :items="tipo_ppi"
          item-text="tipo"
          item-value="id_tipo_ppi"
          label="Tipo de PPI:"
          return-object
          outlined
          dense
          :disabled="!visible"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" class="column">
        <v-text-field
          value=""
          label="Subclasificación de PPI:"
          dense
          v-model="subclasificacion_ppi"
          :disabled="!visible"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" class="column">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Monto total de inversión</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('monto_total_inversion')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                Monto de inversión:<br />
                (con IVA, para registro)
              </v-col>
              <v-col cols="12" md="6">
                {{ monto_con_iva | currency }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                Monto de inversión:<br />
                (sin IVA, para evaluación)
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  value="0.00"
                  dense
                  prepend-inner-icon="mdi-currency-usd"
                  v-model="monto_sin_iva"
                  :disabled="!visible"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                Monto para estudios:<br />
                (en caso que aplique)
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  value="0.00"
                  dense
                  prepend-inner-icon="mdi-currency-usd"
                  v-model="monto_estudios"
                  :disabled="!visible"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" class="column">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Fuentes de financiamiento</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('fuentes_financiamiento')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="fuenteSeleccionada.fuente"
                  label="Fuente de Financiamiento:"
                  dense
                  :disabled="!visible"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="fuenteSeleccionada.porcentaje"
                  min="1"
                  dense
                  type="number"
                  outlined
                  label="%"
                  :disabled="!visible"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="fuenteSeleccionada.monto"
                  dense
                  outlined
                  label="Monto (incluye IVA)"
                  :disabled="!visible"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn class="" color="green" v-if="visible">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Origen</th>
                    <th class="text-left">%</th>
                    <th class="text-left">Monto (Incluye IVA)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in fuentes_financiamiento" :key="item.fuente">
                    <td>{{ item.fuente }}</td>
                    <td>{{ item.porcentaje }}</td>
                    <td>{{ item.monto | currency }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="5">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Horizonte de evaluación</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('horizonte_evaluacion')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4" offset-md="2" class="column">
                <v-text-field
                  v-model="meses_ejecucion"
                  min="1"
                  dense
                  type="number"
                  outlined
                  label="Meses de ejecución"
                  :disabled="!visible"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="column">
                <v-text-field
                  v-model="anios_ejecucion"
                  dense
                  type="number"
                  outlined
                  label="Años de ejecución"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" class="column">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="fecha_inicio_ejecucion"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  :disabled="!visible"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="fechaInicioFormato"
                      dense
                      label="Fecha inicio"
                      prepend-icon="mdi-calendar-month"
                      readonly
                      outlined
                      v-on="on"
                      :disabled="!visible"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fecha_inicio_ejecucion"
                    type="month"
                    locale="Es"
                    no-title
                    scrollable
                    :disabled="!visible"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(fecha_inicio_ejecucion)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6" class="column">
                <v-text-field
                  :value="fechaFinalFormato"
                  dense
                  outlined
                  label="Fecha de término"
                  disabled
                  prepend-icon="mdi-calendar-month"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row> </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Calendario de inversión</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('calendario_inversion')"
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
                    v-if="visible"
                    text
                    color="green brighten-5"
                    @click="agregarCalendario"
                    >+ Agregar</v-btn
                  >
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headersCalendario"
                  :items="calendario_inversion"
                  hide-default-footer
                  class="tablaAlternativas"
                >
                  <template v-slot:item.anio="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.anio"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.anio }}
                      <template v-slot:input>
                        <v-textarea
                          label="Año"
                          v-model="props.item.anio"
                          auto-grow
                          outlined
                          rows="3"
                          row-height="15"
                          maxlength="280"
                          counter="280"
                          class="mt-5"
                          :disabled="!visible"
                        ></v-textarea>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.monto="props" v-if="visible">
                    <v-edit-dialog
                      :return-value.sync="props.item.monto"
                      @save="saveCalendarioMonto(props.item.monto, props.item)"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      large
                      persistent
                    >
                      {{ props.item.monto | currency }}
                      <template v-slot:input>
                        <v-textarea
                          label="Monto"
                          v-model="props.item.monto"
                          auto-grow
                          outlined
                          rows="3"
                          row-height="15"
                          maxlength="280"
                          counter="280"
                          class="mt-5"
                          :disabled="!visible"
                        ></v-textarea>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.accion="{ item }">
                    <v-icon @click="deleteItem(item)" color="red darken-1">
                      mdi-delete-forever
                    </v-icon>
                  </template>
                  <template v-slot:body.append="{ footers }">
                    <tr class="totalFooter">
                      <td class="text-right font-weight-black">
                        Total
                      </td>
                      <td class="text-right font-weight-black">
                        {{ totalCalendario | currency }}
                      </td>
                    </tr>
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
    <v-row>
      <v-col cols="12" md="12" class="column">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Localización geográfica</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
            v-if="user.tipo_usuario == 1"
              icon
              color="red lighten-1"
              @click="agregarObservacion('localizacion_geografica')"
            >
              <v-icon dark>mdi-comment-remove-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="5">
                <v-textarea
                  label="Descripción:"
                  auto-grow
                  outlined
                  rows="10"
                  row-height="15"
                  maxlength="600"
                  counter="600"
                  v-model="localizacion_geografica"
                  :disabled="!visible"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="7">
                <v-row>
                  <v-col
                    cols="12"
                    class="column"
                    v-if="ruta_imagen_localizacion !== null"
                  >
                    <v-card class="mx-auto">
                      <v-img
                        class="white--text align-end"
                        :src="
                          `./uploads/imgfichas/${this.ruta_imagen_localizacion}`
                        "
                        aspect-ratio="5"
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
                          @click="eliminaImagen(ruta_imagen_localizacion)"
                        >
                          Eliminar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="10" class="column">
                    <v-file-input
                      v-if="visible"
                      dense
                      outlined
                      v-model="imagenNueva"
                      accept="image/*"
                      label="Cargar imagen de localización geográfica"
                      prepend-icon="mdi-camera"
                      @change="cargaImagen"
                    ></v-file-input>
                  </v-col>
                </v-row>
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
import moment from "moment";
export default {
  props: ["ficha_tecnica"],
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.ficha_tecnica.estatus == 2 || this.ficha_tecnica.estatus == 3) {
      this.visible = false;
    }
    if (this.ficha_tecnica.id_anexo_uno !== null) {
      this.id_anexo_uno = this.ficha_tecnica.id_anexo_uno;
      this.buscarAnexoUno();
    } else {
    }
    //  EventBus.$on("cargaAnexoUno", data => {
    //    alert();
    //   this.id_anexo_uno = data.id_anexo_uno
    //   this.buscarAnexoUno()
    //   // console.log("Guardar Anexo 1", data.id_ficha_tecnica)
    // });
  },
  mounted() {
    if (this.user.tipo_usuario !== 1) {
      this.initialize();
    }
    this.showTab = false;
    EventBus.$on("guardarFicha", data => {
      this.guardarAnexoUno(data);
    });

    //FEFOM
    EventBus.$on("validarSeccion", data => {
      this.validarAnexoUno(data);
    });
    EventBus.$on("emitirObservaciones", data => {
      this.registrarObservaciones(data);
    });
    EventBus.$on("guardarObservaciones", data => {
      this.guardarObservaciones(data);
    });
  },
  computed: {
    fechaInicioFormato() {
      if (this.fecha_inicio_ejecucion !== null) {
        return moment(this.fecha_inicio_ejecucion).format("MMMM YYYY");
      } else {
        return "";
      }
    },
    fechaFinalFormato() {
      if (this.fecha_final_ejecucion !== null) {
        return moment(this.fecha_final_ejecucion).format("MMMM YYYY");
      } else {
        return "";
      }
    }
  },
  data: () => ({
    user: null,
    iconos_estatus: { color: "light-blue lighten-2", icon: "mdi-clock" },
    unidad_responsable: null,
    id_cartera_proyecto: null,
    visible: true,
    ejercicioSeleccionado: "2020",
    tipo_ppi: [],
    proyectos: [],
    fuenteSeleccionada: {
      fuente: null,
      porcentaje: 0,
      monto: 0
    },
    AnioSeleccionado: null,
    montoAnioSeleccionado: 0.0,
    id_anexo_uno: null,
    estatus: "En Edición",
    observaciones: [],
    id_tipo_ppi: null,
    subclasificacion_ppi: null,
    monto_con_iva: 0.0,
    monto_sin_iva: 0.0,
    monto_estudios: 0.0,
    fuentes_financiamiento: [],
    fecha_inicio_ejecucion: null,
    fecha_final_ejecucion: null,
    meses_ejecucion: 0,
    anios_ejecucion: 0,
    calendario_inversion: [],
    totalCalendario: 0,
    localizacion_geografica: null,
    ruta_imagen_localizacion: null,
    imagenes: [],
    imagenNueva: null,
    menu: false,
    tab: null,
    showTab: false,
    headersCalendario: [
      {
        text: "Año",
        align: "center",
        sortable: false,
        value: "anio",
        width: "25%"
      },
      {
        text: "Monto (incluye IVA)",
        align: "right",
        sortable: false,
        value: "monto",
        width: "75%"
      }
    ],
    snack: false,
    snackColor: "",
    snackText: "",
    loading: true,
    transition: "scale-transition"
  }),
  watch: {
    meses_ejecucion: function(val) {
      if (this.fecha_inicio_ejecucion !== null) {
        this.fecha_final_ejecucion = moment(this.fecha_inicio_ejecucion)
          .add(val, "M")
          .format("YYYY-MM");
        this.anios_ejecucion = moment(this.fecha_final_ejecucion).diff(
          this.fecha_inicio_ejecucion,
          "years"
        );
      }
    },
    fecha_inicio_ejecucion: function(val) {
      this.fecha_final_ejecucion = moment(this.fecha_inicio_ejecucion)
        .add(this.meses_ejecucion, "M")
        .format("YYYY-MM");
    },
    id_cartera_proyecto: function(val) {
      if (this.user.tipo_usuario !== 1) {
        if (typeof val !== "number") {
          this.fuentes_financiamiento = [];
          this.monto_con_iva = val.monto;
          this.monto_sin_iva = parseFloat(val.monto / 1.16).toFixed(2);
          this.fuentes_financiamiento.push({
            fuente: `ESTATAL (FEFOM-${this.ejercicioSeleccionado})`,
            porcentaje: 100,
            monto: val.monto
          });
        }
      }
    }
  },
  methods: {
    initialize() {
      this.$http
        .post("/cartera_proyectos/get_cartera_simple", {
          ejercicio: this.ejercicioSeleccionado,
          id_municipio: this.user.id_municipio
        })
        .then(response => {
          response.data.rows.forEach(element => {
            // console.log(element);
            this.proyectos.push(element);
          });
        })
        .catch(error => {
          console.error(error);
        });

      this.$http
        .get("/catalogos/get_tipo_ppi")
        .then(response => {
          response.data.rows.forEach(element => {
            this.tipo_ppi.push(element);
          });
        })
        .catch(err => {});
    },
    buscarAnexoUno() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_anexo_uno", {
          id_anexo_uno: this.id_anexo_uno
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            console.log(response.data[0]);
            var data = response.data[0];
            this.fuentes_financiamiento = [];
            this.id_anexo_uno = data.id_anexo_uno;
            this.id_cartera_proyecto = data.id_cartera_proyecto;
            this.id_tipo_ppi = data.id_tipo_ppi;
            if (this.user.tipo_usuario == 1) {
              this.id_cartera_proyecto = data.nombre_proyecto;
              this.id_tipo_ppi = data.tipo;
              this.unidad_responsable = data.descripcion;
            }
            this.subclasificacion_ppi = data.subclasificacion_ppi;
            this.monto_con_iva = data.monto_con_iva;
            this.monto_sin_iva = parseFloat(data.monto_sin_iva).toFixed(2);
            this.monto_estudios = parseFloat(data.monto_estudios).toFixed(2);
            this.fuentes_financiamiento = JSON.parse(
              data.fuentes_financiamiento
            );
            this.fecha_inicio_ejecucion = moment(
              data.fecha_inicio_ejecucion
            ).format("YYYY-MM");
            this.meses_ejecucion = data.meses_ejecucion;
            this.calendario_inversion = JSON.parse(data.calendario_inversion);

            // totalCalendario: 0,
            this.localizacion_geografica = data.localizacion_geografica;
            this.ruta_imagen_localizacion = data.ruta_imagen_localizacion;
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
                break;
              case 3:
                this.iconos_estatus = {
                  color: "red lighten-1",
                  icon: "mdi-comment-alert"
                };
                this.estatus = "Errores y Observaciones";
                this.mostrarObservaciones()
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
                this.ruta_imagen_localizacion = resp.data;
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
      console.log(imagen);
      this.$http
        .post("/ficha_tecnica/delete", {
          imagen: imagen
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.ruta_imagen_localizacion = null;
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
    saveCalendarioMonto(val, item) {
      if (+this.totalCalendario + val <= this.monto_con_iva) {
        this.totalCalendario = +this.totalCalendario + val;
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "Dato guardado";
      } else {
        const index = this.calendario_inversion.indexOf(item);
        this.calendario_inversion.splice(index, 1);
        this.snack = true;
        this.snackColor = "red lighten-1";
        this.totalCalendario - val < 0
          ? (this.totalCalendario = 0.0)
          : this.totalCalendario - val;
        this.snackText =
          "Error: La suma de los montos ha superado el monto del proyecto.";
      }
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
    agregarCalendario() {
      this.calendario_inversion.push({
        anio: "Año",
        monto: "0.00"
      });
    },
    deleteItem(item) {
      const index = this.calendario_inversion.indexOf(item);
      this.calendario_inversion.splice(index, 1);
    },
    guardarAnexoUno(data) {
      if (this.verificarDatos()) {
        this.$http
          .post("/ficha_tecnica/guardar_anexo_uno", {
            id_ficha_tecnica: data.id_ficha_tecnica,
            id_ayuntamiento: this.user.id_municipio,
            ejercicio: this.ejercicioSeleccionado,
            id_cartera_proyecto:
              typeof this.id_cartera_proyecto == "number"
                ? this.id_cartera_proyecto
                : this.id_cartera_proyecto.id_cartera_proyecto,
            id_anexo_uno: this.id_anexo_uno,
            id_tipo_ppi:
              typeof this.id_tipo_ppi == "number"
                ? this.id_tipo_ppi
                : this.id_tipo_ppi.id_tipo_ppi,
            subclasificacion_ppi: this.subclasificacion_ppi,
            monto_con_iva: this.monto_con_iva,
            monto_sin_iva: this.monto_sin_iva,
            monto_estudios: this.monto_estudios,
            fuentes_financiamiento: JSON.stringify(this.fuentes_financiamiento),
            fecha_inicio_ejecucion: this.fecha_inicio_ejecucion,
            meses_ejecucion: this.meses_ejecucion,
            anios_ejecucion: this.anios_ejecucion,
            calendario_inversion: JSON.stringify(this.calendario_inversion),
            localizacion_geografica: this.localizacion_geografica,
            ruta_imagen_localizacion: this.ruta_imagen_localizacion
          })
          .then(response => {
            if (response.status == 200) {
              console.log(response);
              if (typeof response.data.id_ficha_tecnica !== "undefined") {
                this.$fire({
                  type: "success",
                  title: `Ficha Técnica guardada correctamente, Folio: ${response.data.id_ficha_tecnica}`,
                  confirmButtonText: "Cerrar",
                  confirmButtonColor: "#d33"
                });
                EventBus.$emit(
                  "buscarFicha",
                  response.data.id_ficha_tecnica,
                  this.monto_con_iva
                );
              } else {
                this.$fire({
                  type: "success",
                  title: `Sección guardada correctamente`,
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
      }
    },
    validarAnexoUno(data) {
      this.$http
        .post("/ficha_tecnica/validar_anexo_uno", {
          id_ficha_tecnica: data.id_ficha_tecnica,
          id_anexo_uno: this.id_anexo_uno
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
    verificarDatos() {
      return true;
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
        .post("/ficha_tecnica/guardar_observaciones_anexo_uno", {
          id_anexo_uno: this.id_anexo_uno,
          observaciones: JSON.stringify(this.observaciones)
        })
        .then(response => {
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: `Observaciones de la sección I guardadas correctamente.`,
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
    mostrarObservaciones(){
      this.observaciones.forEach(element => {
        
      });
    },
    emiteEvento(tipo) {}
  },
  beforeDestroy() {
    EventBus.$off("guardarFicha");
    EventBus.$off("cargaAnexoUno");
    EventBus.$off("validarSeccion");
    EventBus.$off("emitirObservaciones");
    EventBus.$off("guardarObservaciones");
  }
};
</script>
<style>
.column {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
