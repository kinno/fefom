<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-toolbar flat color="grey lighten-3">
          <v-col cols="12" sm="6" md="2">
            <v-select
              :items="ejercicios"
              v-model="ejercicioSeleccionado"
              dense
              label="Ejercicio"
              outlined
              class="mt-5"
              item-text="ejercicio"
              item-value="ejercicio"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="8" class="text-center">
            Monto Total:
            <span class="font-weight-black">{{montoTotal | currency}}</span>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-btn color="green" class="ma-2 white--text" small @click="cerrarCartera()">
              Cerrar Cartera
              <v-icon right dark>mdi-checkbox-multiple-marked</v-icon>
            </v-btn>
          </v-col>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-expansion-panels accordion popout focusable>
      <v-expansion-panel>
        <v-expansion-panel-header color="grey lighten-3" class="font-weight-bold">
          <v-col cols="12" sm="6" md="8" class="text-left pa-0">
            Iluminación municipal
            <!-- <v-icon color="green darken-2">mdi-check-circle-outline</v-icon> -->
            <v-icon color="red darken-2" v-if="alertIluminacion">mdi-alert-octagram</v-icon>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_iluminacion_municipal | currency}}
            <br />
            <br />Monto disponible:
            <span
              class="green--text text--lighten-1"
            >{{disponible_iluminacion | currency}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="9" class="pt-3">
              <v-text-field
                v-model="obraIluminacion"
                dense
                label="Nombre de la obra y/o acción"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pt-3">
              <v-text-field
                v-model="montoIluminacion"
                dense
                label="Monto"
                outlined
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="pt-4">
              <v-btn small color="green lighten-3" @click="agregarProyecto('iluminacion')">Agregar</v-btn>
            </v-col>
          </v-row>
          <v-card>
            <v-data-table
              :headers="headersIluminacion"
              :items="proyectosIluminacion"
              hide-default-footer
              :disable-pagination="true"
              :fixed-header="true"
              color="red darken-1"
              class="tablaProyectos"
            >
              <template v-slot:item="{item}">
                <tr>
                  <td width="48%">{{item.nombre_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row>
                      <v-col cols="6" v-if="item.estatus == 4">
                        <v-btn small height="30px" @click="verObservacion(item, 1)">
                          <v-icon color="red darken-2">mdi-comment-text</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6" v-if="item.estatus == 1 || item.estatus == 4">
                        <v-btn small height="30px" @click="deleteItem(item, 1)">
                          <v-icon color="red darken-2">mdi-delete-forever</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </template>
              <template v-slot:no-data>No hay proyectos registrados</template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!--  -->
      <v-expansion-panel>
        <v-expansion-panel-header color="grey lighten-3" class="font-weight-bold">
          <v-col cols="12" sm="6" md="8" class="text-left pa-0">
            Seguridad
            <!-- <v-icon color="green darken-2">mdi-check-circle-outline</v-icon> -->
            <v-icon color="red darken-2" v-if="alertSeguridad">mdi-alert-octagram</v-icon>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_seguridad | currency}}
            <br />
            <br />Monto disponible:
            <span
              class="green--text text--lighten-1"
            >{{disponible_seguridad | currency}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="9" class="pt-3">
              <v-text-field
                v-model="obraSeguridad"
                dense
                label="Nombre de la obra y/o acción"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pt-3">
              <v-text-field
                v-model="montoSeguridad"
                dense
                label="Monto"
                outlined
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="pt-4">
              <v-btn small color="green lighten-3" @click="agregarProyecto('seguridad')">Agregar</v-btn>
            </v-col>
          </v-row>
          <v-card>
            <v-data-table
              :headers="headersSeguridad"
              :items="proyectosSeguridad"
              hide-default-footer
              :disable-pagination="true"
              :fixed-header="true"
               class="tablaProyectos"
            >
              <template v-slot:item="{item}">
                <tr>
                  <td width="48%">{{item.nombre_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row>
                      <v-col cols="6" v-if="item.estatus == 4">
                        <v-btn small height="30px" @click="verObservacion(item, 2)">
                          <v-icon color="red darken-2">mdi-comment-text</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6" v-if="item.estatus == 1 || item.estatus == 4">
                        <v-btn small height="30px" @click="deleteItem(item, 2)">
                          <v-icon color="red darken-2">mdi-delete-forever</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </template>
              <template v-slot:no-data>No hay proyectos registrados</template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!--  -->
      <v-expansion-panel>
        <v-expansion-panel-header color="grey lighten-3" class="font-weight-bold">
          <v-col cols="12" sm="6" md="8" class="text-left pa-0">
            Proyectos de inversión pública
            <!-- <v-icon color="green darken-2">mdi-check-circle-outline</v-icon> -->
            <v-icon color="red darken-2" v-if="alertInversion">mdi-alert-octagram</v-icon>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_inversion_publica | currency}}
            <br />
            <br />Monto disponible:
            <span
              class="green--text text--lighten-1"
            >{{disponible_inversion | currency}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="9" class="pt-3">
              <v-text-field
                v-model="obraInversion"
                dense
                label="Nombre de la obra y/o acción"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pt-3">
              <v-text-field
                v-model="montoInversion"
                dense
                label="Monto"
                outlined
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="pt-4">
              <v-btn small color="green lighten-3" @click="agregarProyecto('inversion')">Agregar</v-btn>
            </v-col>
          </v-row>
          <v-card>
            <v-data-table
              :headers="headersInversion"
              :items="proyectosInversion"
              hide-default-footer
              :disable-pagination="true"
              :fixed-header="true"
               class="tablaProyectos"
            >
              <template v-slot:item="{item}">
                <tr>
                  <td width="48%">{{item.nombre_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row>
                      <v-col cols="6" v-if="item.estatus == 4">
                        <v-btn small height="30px" @click="verObservacion(item, 3)">
                          <v-icon color="red darken-2">mdi-comment-text</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6" v-if="item.estatus == 1 || item.estatus == 4">
                        <v-btn small height="30px" @click="deleteItem(item, 3)">
                          <v-icon color="red darken-2">mdi-delete-forever</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </template>
              <template v-slot:no-data>No hay proyectos registrados</template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!--  -->
      <v-expansion-panel>
        <v-expansion-panel-header color="grey lighten-3" class="font-weight-bold">
          <v-col cols="12" sm="6" md="8" class="text-left pa-0">
            Acciones para el desarrollo
            <!-- <v-icon color="green darken-2">mdi-check-circle-outline</v-icon> -->
            <v-icon color="red darken-2" v-if="alertDesarrollo">mdi-alert-octagram</v-icon>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_desarrollo | currency}}
            <br />
            <br />Monto disponible:
            <span
              class="green--text text--lighten-1"
            >{{disponible_desarrollo | currency}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="9" class="pt-3">
              <v-text-field
                v-model="obraDesarrollo"
                dense
                label="Nombre de la obra y/o acción"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pt-3">
              <v-text-field
                v-model="montoDesarrollo"
                dense
                label="Monto"
                outlined
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="pt-4">
              <v-btn small color="green lighten-3" @click="agregarProyecto('desarrollo')">Agregar</v-btn>
            </v-col>
          </v-row>
          <v-card>
            <v-data-table
              :headers="headersDesarrollo"
              :items="proyectosDesarrollo"
              hide-default-footer
              :disable-pagination="true"
              :fixed-header="true"
               class="tablaProyectos"
            >
              <template v-slot:item="{item}">
                <tr>
                  <td width="48%">{{item.nombre_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row>
                      <v-col cols="6" v-if="item.estatus == 4">
                        <v-btn small height="30px" @click="verObservacion(item, 4)">
                          <v-icon color="red darken-2">mdi-comment-text</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6" v-if="item.estatus == 1 || item.estatus == 4">
                        <v-btn small height="30px" @click="deleteItem(item, 4)">
                          <v-icon color="red darken-2">mdi-delete-forever</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </template>
              <template v-slot:no-data>No hay proyectos registrados</template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!--  -->
      <v-expansion-panel>
        <v-expansion-panel-header color="grey lighten-3" class="font-weight-bold">
          <v-col cols="12" sm="6" md="8" class="text-left pa-0">
            Recursos no etiquetados
            <!-- <v-icon color="green darken-2">mdi-check-circle-outline</v-icon> -->
            <v-icon color="red darken-2" v-if="alertNoEtiquetado">mdi-alert-octagram</v-icon>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_no_etiquetado | currency}}
            <br />
            <br />Monto disponible:
            <span
              class="green--text text--lighten-1"
            >{{disponible_no_etiquetado | currency}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="9" class="pt-3">
              <v-text-field
                v-model="obraNoEtiquetado"
                dense
                label="Nombre de la obra y/o acción"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pt-3">
              <v-text-field
                v-model="montoNoEtiquetado"
                dense
                label="Monto"
                outlined
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="pt-4">
              <v-btn small color="green lighten-3" @click="agregarProyecto('no_etiquetado')">Agregar</v-btn>
            </v-col>
          </v-row>
          <v-card>
            <v-data-table
              :headers="headersNoEtiquetado"
              :items="proyectosNoEtiquetado"
              hide-default-footer
              :disable-pagination="true"
              :fixed-header="true"
               class="tablaProyectos"
            >
              <template v-slot:item="{item}">
                <tr>
                  <td width="48%">{{item.nombre_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row>
                      <v-col cols="6" v-if="item.estatus == 4">
                        <v-btn small height="30px" @click="verObservacion(item, 5)">
                          <v-icon color="red darken-2">mdi-comment-text</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6" v-if="item.estatus == 1 || item.estatus == 4">
                        <v-btn small height="30px" @click="deleteItem(item, 5)">
                          <v-icon color="red darken-2">mdi-delete-forever</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </template>
              <template v-slot:no-data>No hay proyectos registrados</template>
            </v-data-table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="dialog" max-width="700px" scrollable persistent>
      <v-card ref="form">
        <v-card-title primary-title>Rechazar proyecto</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model="editedItem.nombre_proyecto"
                label="Obra y/o Acción:"
                filled
                :readonly="true"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="5" offset-md="7" class="text-right">
              Monto:
              <span class="font-weight-black title">{{editedItem.monto | currency}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-textarea
                v-model="editedItem.observaciones"
                outlined
                label="Motivo de rechazo:"
                value
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" text @click="dialog = false">Cerrar</v-btn>
          <v-btn
            v-if="editedItem.estatus !== 4"
            color="success"
            text
            @click="guardarRechazo()"
          >Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.initialize();
  },
  data: () => ({
    dialog: false,
    user: null,
    headersIluminacion: [
      {
        text: "Obra y/o Acciones",
        align: "left",
        sortable: true,
        value: "nombre_proyecto"
      },
      {
        text: "Monto",
        align: "right",
        sortable: true,
        value: "monto"
      },
      { text: "Estatus", value: "desc_estatus", sortable: true },
      { text: "Acciones", value: "action", sortable: false }
    ],
    headersSeguridad: [
      {
        text: "Obra y/o Acciones",
        align: "left",
        sortable: true,
        value: "nombre_proyecto"
      },
      {
        text: "Monto",
        align: "right",
        sortable: true,
        value: "monto"
      },
      { text: "Estatus", value: "desc_estatus", sortable: true },
      { text: "Acciones", value: "action", sortable: false }
    ],
    headersInversion: [
      {
        text: "Obra y/o Acciones",
        align: "left",
        sortable: true,
        value: "nombre_proyecto"
      },
      {
        text: "Monto",
        align: "right",
        sortable: true,
        value: "monto"
      },
      { text: "Estatus", value: "desc_estatus", sortable: true },
      { text: "Acciones", value: "action", sortable: false }
    ],
    headersDesarrollo: [
      {
        text: "Obra y/o Acciones",
        align: "left",
        sortable: true,
        value: "nombre_proyecto"
      },
      {
        text: "Monto",
        align: "right",
        sortable: true,
        value: "monto"
      },
      { text: "Estatus", value: "desc_estatus", sortable: true },
      { text: "Acciones", value: "action", sortable: false }
    ],
    headersNoEtiquetado: [
      {
        text: "Obra y/o Acciones",
        align: "left",
        sortable: true,
        value: "nombre_proyecto"
      },
      {
        text: "Monto",
        align: "right",
        sortable: true,
        value: "monto"
      },
      { text: "Estatus", value: "desc_estatus", sortable: true },
      { text: "Acciones", value: "action", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      nombreProyecto: "",
      seccion: "",
      monto: 0,
      estatus: "",
      motivoRechazo: null
    },
    defaultItem: {
      nombreProyecto: "",
      seccion: "",
      monto: 0,
      estatus: "",
      motivoRechazo: null
    },
    rubros: [],
    ejercicios: [],
    ejercicioSeleccionado: "2020",
    nuevaObra: [
      { nombreProyecto: "", monto: "" },
      { nombreProyecto: "", monto: "" },
      { nombreProyecto: "", monto: "" },
      { nombreProyecto: "", monto: "" },
      { nombreProyecto: "", monto: "" }
    ],
    proyectos: [],
    proyectosIluminacion: [],
    proyectosSeguridad: [],
    proyectosInversion: [],
    proyectosDesarrollo: [],
    proyectosNoEtiquetado: [],
    alertIluminacion: false,
    alertSeguridad: false,
    alertInversion: false,
    alertDesarrollo: false,
    alertNoEtiquetado: false,
    montoTotal: 0.0,
    techo_asignado_iluminacion_municipal: 0.0,
    disponible_iluminacion: 0.0,
    techo_asignado_seguridad: 0.0,
    disponible_seguridad: 0.0,
    techo_asignado_inversion_publica: 0.0,
    disponible_inversion: 0.0,
    techo_asignado_desarrollo: 0.0,
    disponible_desarrollo: 0.0,
    techo_asignado_no_etiquetado: 0.0,
    disponible_no_etiquetado: 0.0,
    obraIluminacion: "",
    montoIluminacion: "",
    obraSeguridad: "",
    montoSeguridad: "",
    obraInversion: "",
    montoInversion: "",
    obraDesarrollo: "",
    montoDesarrollo: "",
    obraNoEtiquetado: "",
    montoNoEtiquetado: ""
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Registrar un nuevo proyecto"
        : "Editar proyecto";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    ejercicioSeleccionado(val) {
      this.getTechos();
    },
    proyectosIluminacion(val) {
      var sumaProyectos = 0.0;
      val.forEach(element => {
        sumaProyectos = +sumaProyectos + +element.monto;
      });
      this.disponible_iluminacion =
        +this.techo_asignado_iluminacion_municipal - +sumaProyectos;
    },
    proyectosSeguridad(val) {
      var sumaProyectos = 0.0;
      val.forEach(element => {
        sumaProyectos = +sumaProyectos + +element.monto;
      });
      this.disponible_seguridad =
        +this.techo_asignado_seguridad - +sumaProyectos;
    },
    proyectosInversion(val) {
      var sumaProyectos = 0.0;
      val.forEach(element => {
        sumaProyectos = +sumaProyectos + +element.monto;
      });
      this.disponible_inversion =
        +this.techo_asignado_inversion_publica - +sumaProyectos;
    },
    proyectosDesarrollo(val) {
      var sumaProyectos = 0.0;
      val.forEach(element => {
        sumaProyectos = +sumaProyectos + +element.monto;
      });
      this.disponible_desarrollo =
        +this.techo_asignado_desarrollo - +sumaProyectos;
    },
    proyectosNoEtiquetado(val) {
      var sumaProyectos = 0.0;
      val.forEach(element => {
        sumaProyectos = +sumaProyectos + +element.monto;
      });
      this.disponible_no_etiquetado =
        +this.techo_asignado_no_etiquetado - +sumaProyectos;
    }
  },
  methods: {
    initialize() {
      this.$http
        .get("/catalogos/get_ejercicios")
        .then(response => {
          response.data.rows.forEach(element => {
            this.ejercicios.push(element);
          });
        })
        .catch(err => {});

      this.$http
        .get("/catalogos/get_rubros")
        .then(response => {
          response.data.rows.forEach(element => {
            this.rubros.push({
              id: element.id,
              descripcion_rubro: element.descripcion_rubro,
              techo_asignado: 0.0
            });
          });
        })
        .catch(err => {});

      this.getTechos();
    },
    getTechos() {
      this.techosFinancieros = [];
      this.montoTotal = 0.0;
      this.techo_asignado_iluminacion_municipal = 0.0;
      this.techo_asignado_seguridad = 0.0;
      this.techo_asignado_inversion_publica = 0.0;
      this.techo_asignado_desarrollo = 0.0;
      this.techo_asignado_no_etiquetado = 0.0;
      this.$http
        .post(
          "/techos_financieros/get_techos_ayuntamiento",
          {
            ejercicio: this.ejercicioSeleccionado,
            id_municipio: this.user.id_municipio
          }
        )
        .then(response => {
          response.data.rows.forEach(element => {
            this.montoTotal = parseFloat(element.monto_total).toFixed(2);
            this.techo_asignado_iluminacion_municipal = parseFloat(
              element.monto_iluminacion_municipal
            ).toFixed(2);
            this.techo_asignado_seguridad = parseFloat(
              element.monto_seguridad
            ).toFixed(2);
            this.techo_asignado_inversion_publica = parseFloat(
              element.monto_inversion_publica
            ).toFixed(2);
            this.techo_asignado_desarrollo = parseFloat(
              element.monto_desarrollo
            ).toFixed(2);
            this.techo_asignado_no_etiquetado = parseFloat(
              element.monto_no_etiquetado
            ).toFixed(2);
          });
          this.getCartera();
        })
        .catch(error => {
          console.error(error);
        });
    },
    getCartera() {
      this.proyectosIluminacion = [];
      this.proyectosSeguridad = [];
      this.proyectosInversion = [];
      this.proyectosDesarrollo = [];
      this.proyectosNoEtiquetado = [];
      this.$http
        .post("/cartera_proyectos/get_cartera", {
          ejercicio: this.ejercicioSeleccionado,
          id_municipio: this.user.id_municipio
        })
        .then(response => {
          // console.log(response.data)
          this.proyectosIluminacion = response.data.proyectos.iluminacion;
          typeof this.proyectosIluminacion.find(
            estatus => estatus.estatus === 4
          ) !== "undefined"
            ? (this.alertIluminacion = true)
            : (this.alertIluminacion = false);

          this.proyectosSeguridad = response.data.proyectos.seguridad;
          typeof this.proyectosSeguridad.find(
            estatus => estatus.estatus === 4
          ) !== "undefined"
            ? (this.alertSeguridad = true)
            : (this.alertSeguridad = false);

          this.proyectosInversion = response.data.proyectos.inversion;
          typeof this.proyectosInversion.find(
            estatus => estatus.estatus === 4
          ) !== "undefined"
            ? (this.alertInversion = true)
            : (this.alertInversion = false);

          this.proyectosDesarrollo = response.data.proyectos.desarrollo;
          typeof this.proyectosDesarrollo.find(
            estatus => estatus.estatus === 4
          ) !== "undefined"
            ? (this.alertDesarrollo = true)
            : (this.alertDesarrollo = false);
          this.proyectosNoEtiquetado = response.data.proyectos.no_etiquetado;
          typeof this.proyectosNoEtiquetado.find(
            estatus => estatus.estatus === 4
          ) !== "undefined"
            ? (this.alertNoEtiquetado = true)
            : (this.alertNoEtiquetado = false);
        })
        .catch(error => {
          console.error(error);
        });
    },
    agregarProyecto(rubro) {
      switch (rubro) {
        case "iluminacion":
          if (
            this.verificaMontos(
              this.techo_asignado_iluminacion_municipal,
              this.proyectosIluminacion,
              this.montoIluminacion
            )
          ) {
            this.$http
              .post(
                "/cartera_proyectos/agregar_proyecto",
                {
                  ejercicio: this.ejercicioSeleccionado,
                  id_municipio: this.user.id_municipio,
                  nombre_proyecto: this.obraIluminacion,
                  monto: this.montoIluminacion,
                  id_rubro: 1,
                  estatus: 1
                }
              )
              .then(response => {
                if (response.status == 200) {
                  console.log(response)
                  this.proyectosIluminacion.push({
                    id: response.data.rows.insertId,
                    nombre_proyecto: this.obraIluminacion,
                    monto: this.montoIluminacion,
                    estatus: 1,
                    desc_estatus: "Edición"
                  });
                  this.obraIluminacion = "";
                  this.montoIluminacion = "";
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(e => {
                console.log(error);
              });
          } else {
            this.$fire({
              type: "error",
              title: "Error",
              text: "El monto sobrepasa el techo asignado",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
            console.log("El monto sobrepasa el techo asignado");
          }
          break;
        case "seguridad":
          if (
            this.verificaMontos(
              this.techo_asignado_seguridad,
              this.proyectosSeguridad,
              this.montoSeguridad
            )
          ) {
            this.$http
              .post(
                "/cartera_proyectos/agregar_proyecto",
                {
                  ejercicio: this.ejercicioSeleccionado,
                  id_municipio: this.user.id_municipio,
                  nombre_proyecto: this.obraSeguridad,
                  monto: this.montoSeguridad,
                  id_rubro: 2,
                  estatus: 1
                }
              )
              .then(response => {
                if (response.status == 200) {
                  this.proyectosSeguridad.push({
                    nombre_proyecto: this.obraSeguridad,
                    monto: this.montoSeguridad
                  });
                  this.obraSeguridad = "";
                  this.montoSeguridad = "";
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(e => {
                console.log(error);
              });
          } else {
            console.log("El monto sobrepasa el techo asignado");
          }
          break;
        case "inversion":
          if (
            this.verificaMontos(
              this.techo_asignado_inversion_publica,
              this.proyectosInversion,
              this.montoInversion
            )
          ) {
            this.$http
              .post(
                "/cartera_proyectos/agregar_proyecto",
                {
                  ejercicio: this.ejercicioSeleccionado,
                  id_municipio: this.user.id_municipio,
                  nombre_proyecto: this.obraInversion,
                  monto: this.montoInversion,
                  id_rubro: 3,
                  estatus: 1
                }
              )
              .then(response => {
                if (response.status == 200) {
                  this.proyectosInversion.push({
                    nombre_proyecto: this.obraInversion,
                    monto: this.montoInversion
                  });
                  this.obraInversion = "";
                  this.montoInversion = "";
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(e => {
                console.log(error);
              });
          } else {
            console.log("El monto sobrepasa el techo asignado");
          }
          break;
        case "desarrollo":
          if (
            this.verificaMontos(
              this.techo_asignado_desarrollo,
              this.proyectosDesarrollo,
              this.montoDesarrollo
            )
          ) {
            this.$http
              .post(
                "/cartera_proyectos/agregar_proyecto",
                {
                  ejercicio: this.ejercicioSeleccionado,
                  id_municipio: this.user.id_municipio,
                  nombre_proyecto: this.obraDesarrollo,
                  monto: this.montoDesarrollo,
                  id_rubro: 4,
                  estatus: 1
                }
              )
              .then(response => {
                if (response.status == 200) {
                  this.proyectosDesarrollo.push({
                    nombre_proyecto: this.obraDesarrollo,
                    monto: this.montoDesarrollo
                  });
                  this.obraDesarrollo = "";
                  this.montoDesarrollo = "";
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(e => {
                console.log(error);
              });
          } else {
            console.log("El monto sobrepasa el techo asignado");
          }
          break;
        case "no_etiquetado":
          if (
            this.verificaMontos(
              this.techo_asignado_no_etiquetado,
              this.proyectosNoEtiquetado,
              this.montoNoEtiquetado
            )
          ) {
            this.$http
              .post(
                "/cartera_proyectos/agregar_proyecto",
                {
                  ejercicio: this.ejercicioSeleccionado,
                  id_municipio: this.user.id_municipio,
                  nombre_proyecto: this.obraNoEtiquetado,
                  monto: this.montoNoEtiquetado,
                  id_rubro: 5,
                  estatus: 1
                }
              )
              .then(response => {
                if (response.status == 200) {
                  this.proyectosNoEtiquetado.push({
                    nombre_proyecto: this.obraNoEtiquetado,
                    monto: this.montoNoEtiquetado
                  });
                  this.obraNoEtiquetado = "";
                  this.montoNoEtiquetado = "";
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(e => {
                console.log(error);
              });
          } else {
            console.log("El monto sobrepasa el techo asignado");
          }
          break;

        default:
          break;
      }
    },
    verificaMontos(techo, proyectos, monto) {
      var techoRubro = parseFloat(techo).toFixed(2);
      var sumaProyectos = 0.0;

      proyectos.forEach(element => {
        sumaProyectos = +sumaProyectos + +element.monto;
        // console.log(sumaProyectos)
      });
      // console.log(+monto + +sumaProyectos,sumaProyectos, techoRubro)
      if (+monto + +sumaProyectos <= +techoRubro) {
        return true;
      } else {
        return false;
      }
    },
    verificarCierre() {
      if (
        this.disponible_iluminacion == 0 &&
        this.disponible_seguridad == 0 &&
        this.disponible_inversion == 0 &&
        this.disponible_desarrollo == 0 &&
        this.disponible_no_etiquetado == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    editItem(item) {
      this.editedIndex = this.cartera.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item, rubro) {
      var index;
      switch (rubro) {
        case 1:
          index = this.proyectosIluminacion.indexOf(item);
          if (confirm("¿Deseas eliminar este proyecto?")) {
            this.$http
              .post(
                "/cartera_proyectos/eliminar_proyecto",
                {
                  id: this.proyectosIluminacion[index].id
                }
              )
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  this.proyectosIluminacion.splice(index, 1);
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(error => {
                console.error(error);
              });
          }
          break;
        case 2:
          index = this.proyectosSeguridad.indexOf(item);
          if (confirm("¿Deseas eliminar este proyecto?")) {
            this.$http
              .post(
                "/cartera_proyectos/eliminar_proyecto",
                {
                  id: this.proyectosSeguridad[index].id
                }
              )
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  this.proyectosSeguridad.splice(index, 1);
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(error => {
                console.error(error);
              });
          }
          break;
        case 3:
          index = this.proyectosInversion.indexOf(item);
          if (confirm("¿Deseas eliminar este proyecto?")) {
            this.$http
              .post(
                "/cartera_proyectos/eliminar_proyecto",
                {
                  id: this.proyectosInversion[index].id
                }
              )
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  this.proyectosInversion.splice(index, 1);
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(error => {
                console.error(error);
              });
          }
          break;
        case 4:
          index = this.proyectosDesarrollo.indexOf(item);
          if (confirm("¿Deseas eliminar este proyecto?")) {
            this.$http
              .post(
                "/cartera_proyectos/eliminar_proyecto",
                {
                  id: this.proyectosDesarrollo[index].id
                }
              )
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  this.proyectosDesarrollo.splice(index, 1);
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(error => {
                console.error(error);
              });
          }
          break;
        case 5:
          index = this.proyectosNoEtiquetado.indexOf(item);
          if (confirm("¿Deseas eliminar este proyecto?")) {
            this.$http
              .post(
                "/cartera_proyectos/eliminar_proyecto",
                {
                  id: this.proyectosNoEtiquetado[index].id
                }
              )
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  this.proyectosNoEtiquetado.splice(index, 1);
                } else {
                  console.log("Error", response.err);
                }
              })
              .catch(error => {
                console.error(error);
              });
          }
          break;

        default:
          break;
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    cerrarCartera() {
      this.$fire({
        title: "¿Deseas continuar?",
        text:
          "Se cerrará el registro en la cartera de proyectos y se enviará a revisión, ya no se podrán realizar cambios.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          if (this.verificarCierre()) {
            // var proyectos;
            // this.proyectosIluminacion.forEach(element => {

            // });
            this.$http
              .post("/cartera_proyectos/cerrar_cartera", {
                ejercicio: this.ejercicioSeleccionado,
                id_municipio: this.user.id_municipio
              })
              .then(response => {
                if (response.status == 200) {
                  this.$fire({
                    type: "success",
                    title: "Datos guardados correctamente",
                    confirmButtonText: "Cerrar",
                    confirmButtonColor: "#d33"
                  });
                  this.getCartera();
                } else {
                  this.$fire({
                    type: "error",
                    title: "Error",
                    text: "Error en el servidor",
                    footer: "error:" + response.err,
                    confirmButtonText: "Cerrar",
                    confirmButtonColor: "#d33"
                  });
                }
              })
              .catch(e => {
                this.$fire({
                  type: "error",
                  title: "Error",
                  text: "Error en el servidor",
                  footer: e,
                  confirmButtonText: "Cerrar",
                  confirmButtonColor: "#d33"
                });
                console.log(e);
              });
          } else {
            this.$fire({
              type: "error",
              title: "Error",
              text:
                "Aún queda monto disponible para registrar proyectos, por favor, verifica los registros.",
              footer:
                "Recordatorio: Se debe asignar al 100% el monto de cada rubro.",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
          }
        }
      });
    },
    verObservacion(item, rubro) {
      switch (rubro) {
        case 1:
          this.editedIndex = this.proyectosIluminacion.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialog = true;
          break;
        case 2:
          this.editedIndex = this.proyectosSeguridad.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialog = true;
          break;
        case 3:
          this.editedIndex = this.proyectosInversion.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialog = true;
          break;
        case 4:
          this.editedIndex = this.proyectosDesarrollo.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialog = true;
          break;
        case 5:
          this.editedIndex = this.proyectosNoEtiquetado.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialog = true;
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="css">
  .v-data-table-header{
  /* background-color: red !important; */
}
</style>