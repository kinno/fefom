<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-toolbar flat color="grey lighten-3">
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="municipioSeleccionado"
              :items="municipios"
              item-text="descripcion"
              item-value="id_ayuntamiento"
              label="Ayuntamiento"
              dense
              outlined
              class="mt-5"
              return-object
            ></v-select>
          </v-col>
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
          <v-col cols="12" sm="6" md="6" class="text-center">
            <v-row>
              <v-col cols="12" sm="3" md="3">
                Monto Total:<br>
                <span class="font-weight-black">{{montoTotal | currency}}</span>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                Obras en Total: <br>
                <span class="font-weight-black">{{obrasTotal}}</span>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                Aceptados: <br>
                <span class="font-weight-black">{{obrasAceptadas}}</span>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                Rechazados: <br>
                <span class="font-weight-black">{{obrasRechazadas}}</span>
              </v-col>
            </v-row>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="2">
            <v-btn color="green" class="ma-2 white--text" small @click="cerrarCartera()" >
              Cerrar Cartera
              <v-icon right dark>mdi-checkbox-multiple-marked</v-icon>
            </v-btn>
          </v-col>-->
        </v-toolbar>
      </v-col>
    </v-row>
    <v-expansion-panels accordion popout focusable class="pa-0">
      <v-expansion-panel>
        <v-expansion-panel-header color="grey lighten-3" class="font-weight-bold">
          Iluminación municipal
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_iluminacion_municipal | currency}}
            <br />
            <br />Obras y/o Acciones:
            <span
              class="green--text text--lighten-1"
            >{{proyectosIluminacion.length}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-data-table
              :headers="headersIluminacion"
              :items="proyectosIluminacion"
              hide-default-footer
              :disable-pagination="true"
              :fixed-header="true"
              class="tablaProyectos"
            >
              <template v-slot:item="{item}">
                <tr>
                 <td width="24%">{{item.nombre_proyecto}}</td>
                  <td width="24%">{{item.descripcion_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row v-if="item.estatus!==4 && item.estatus !==3 && item.estatus !==1">
                      <v-col cols="6">
                        <v-btn small height="30px" @click="aceptarProyecto(item, 5)">
                          <v-icon color="green darken-2">mdi-check-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn small height="30px" @click="rechazarProyecto(item, 5)">
                          <v-icon color="red darken-2">mdi-cancel</v-icon>
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
          Seguridad
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_seguridad | currency}}
            <br />
            <br />Obras y/o Acciones:
            <span
              class="green--text text--lighten-1"
            >{{proyectosSeguridad.length}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
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
                 <td width="24%">{{item.nombre_proyecto}}</td>
                  <td width="24%">{{item.descripcion_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row v-if="item.estatus!==4 && item.estatus !==3 && item.estatus !==1">
                      <v-col cols="6">
                        <v-btn small height="30px" @click="aceptarProyecto(item, 5)">
                          <v-icon color="green darken-2">mdi-check-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn small height="30px" @click="rechazarProyecto(item, 5)">
                          <v-icon color="red darken-2">mdi-cancel</v-icon>
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
          Proyectos de inversión pública
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_inversion_publica | currency}}
            <br />
            <br />Obras y/o Acciones:
            <span
              class="green--text text--lighten-1"
            >{{proyectosInversion.length}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
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
                 <td width="24%">{{item.nombre_proyecto}}</td>
                  <td width="24%">{{item.descripcion_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row v-if="item.estatus!==4 && item.estatus !==3 && item.estatus !==1">
                      <v-col cols="6">
                        <v-btn small height="30px" @click="aceptarProyecto(item, 5)">
                          <v-icon color="green darken-2">mdi-check-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn small height="30px" @click="rechazarProyecto(item, 5)">
                          <v-icon color="red darken-2">mdi-cancel</v-icon>
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
          Acciones para el desarrollo
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_desarrollo | currency}}
            <br />
            <br />Obras y/o Acciones:
            <span
              class="green--text text--lighten-1"
            >{{proyectosDesarrollo.length}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
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
                 <td width="24%">{{item.nombre_proyecto}}</td>
                  <td width="24%">{{item.descripcion_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row v-if="item.estatus!==4 && item.estatus !==3 && item.estatus !==1">
                      <v-col cols="6">
                        <v-btn small height="30px" @click="aceptarProyecto(item, 5)">
                          <v-icon color="green darken-2">mdi-check-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn small height="30px" @click="rechazarProyecto(item, 5)">
                          <v-icon color="red darken-2">mdi-cancel</v-icon>
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
      <v-expansion-panel>
        <v-expansion-panel-header color="grey lighten-3" class="font-weight-bold">
          <v-col cols="12" sm="6" md="8" class="text-left pa-0">
            Protección Civil
            <!-- <v-icon color="green darken-2">mdi-check-circle-outline</v-icon> -->
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_proteccion_civil | currency}}
           <br />
            <br />Obras y/o Acciones:
            <span
              class="green--text text--lighten-1"
            >{{proyectosProteccionCivil.length}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-data-table
              :headers="headersProteccionCivil"
              :items="proyectosProteccionCivil"
              hide-default-footer
              :disable-pagination="true"
              :fixed-header="true"
               class="tablaProyectos mt-0"
            >
              <template v-slot:item="{item}">
                <tr>
                 <td width="24%">{{item.nombre_proyecto}}</td>
                  <td width="24%">{{item.descripcion_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row v-if="item.estatus!==4 && item.estatus !==3 && item.estatus !==1">
                      <v-col cols="6">
                        <v-btn small height="30px" @click="aceptarProyecto(item, 5)">
                          <v-icon color="green darken-2">mdi-check-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn small height="30px" @click="rechazarProyecto(item, 5)">
                          <v-icon color="red darken-2">mdi-cancel</v-icon>
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
          Recursos no etiquetados
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="4" class="text-right pa-0">
            Techo asignado: {{techo_asignado_no_etiquetado | currency}}
            <br />
            <br />Obras y/o Acciones:
            <span
              class="green--text text--lighten-1"
            >{{proyectosNoEtiquetado.length}}</span>
          </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
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
                 <td width="24%">{{item.nombre_proyecto}}</td>
                  <td width="24%">{{item.descripcion_proyecto}}</td>
                  <td width="30%" class="text-right">{{item.monto | currency}}</td>
                  <td width="10%" class="text-center font-weight-black">{{item.desc_estatus}}</td>
                  <td width="12%">
                    <v-row v-if="item.estatus!==4 && item.estatus !==3 && item.estatus !==1">
                      <v-col cols="6">
                        <v-btn small height="30px" @click="aceptarProyecto(item, 5)">
                          <v-icon color="green darken-2">mdi-check-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn small height="30px" @click="rechazarProyecto(item, 5)">
                          <v-icon color="red darken-2">mdi-cancel</v-icon>
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
          <v-btn v-if="editedItem.estatus !== 4" color="success" text @click="guardarRechazo()">Aceptar</v-btn>
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
        text: "Descripción",
        align: "left",
        sortable: true,
        value: "descripcion_proyecto"
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
        text: "Descripción",
        align: "left",
        sortable: true,
        value: "descripcion_proyecto"
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
        text: "Descripción",
        align: "left",
        sortable: true,
        value: "descripcion_proyecto"
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
        text: "Descripción",
        align: "left",
        sortable: true,
        value: "descripcion_proyecto"
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
    headersProteccionCivil: [
      {
        text: "Obra y/o Acciones",
        align: "left",
        sortable: true,
        value: "nombre_proyecto"
      },
      {
        text: "Descripción",
        align: "left",
        sortable: true,
        value: "descripcion_proyecto"
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
        text: "Descripción",
        align: "left",
        sortable: true,
        value: "descripcion_proyecto"
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
      ejercicio: "",
      estatus: "",
      id_cartera_proyecto: "",
      id_municipio: "",
      id_rubro: "",
      monto: "",
      nombre_proyecto: "",
      observaciones: ""
    },
    defaultItem: {
      ejercicio: "",
      estatus: "",
      id_cartera_proyecto: "",
      id_municipio: "",
      id_rubro: "",
      monto: "",
      nombre_proyecto: "",
      observaciones: ""
    },
    rubros: [],
    ejercicios: [],
    ejercicioSeleccionado: null,
    municipios: [],
    municipioSeleccionado: "",
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
    proyectosProteccionCivil: [],
    proyectosNoEtiquetado: [],
    // proyectosRetencion: [],
    montoTotal: 0.0,
    techo_asignado_iluminacion_municipal: 0.0,
    disponible_iluminacion: 0.0,
    techo_asignado_seguridad: 0.0,
    disponible_seguridad: 0.0,
    techo_asignado_inversion_publica: 0.0,
    disponible_inversion: 0.0,
    techo_asignado_desarrollo: 0.0,
    disponible_desarrollo: 0.0,
    techo_asignado_proteccion_civil: 0.0,
    disponible_proteccion_civil: 0.0,
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
    montoNoEtiquetado: "",
    obrasTotal: 0,
    obrasAceptadas: 0,
    obrasRechazadas: 0,
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
      if (this.municipioSeleccionado !== "") {
        this.getTechos();
      }
    },
    municipioSeleccionado(val) {
      if (val.id !== 0 && this.ejercicioSeleccionado !== "") {
        this.getTechos();
      }
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
          this.ejercicioSeleccionado = this.ejercicios[this.ejercicios.length - 1].ejercicio
        })
        .catch(err => {});

      this.$http
        .get("/catalogos/get_municipios")
        .then(response => {
          response.data.rows.forEach(element => {
            this.municipios.push(element);
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
    },
    getTechos() {
      this.techosFinancieros = [];
      this.montoTotal = 0.0;
      this.techo_asignado_iluminacion_municipal = 0.0;
      this.techo_asignado_seguridad = 0.0;
      this.techo_asignado_inversion_publica = 0.0;
      this.techo_asignado_proteccion_civil = 0.0;
      this.techo_asignado_desarrollo = 0.0;
      this.techo_asignado_no_etiquetado = 0.0;
      this.$http
        .post(
          "/techos_financieros/get_techos_ayuntamiento",
          {
            ejercicio: this.ejercicioSeleccionado,
            id_municipio: this.municipioSeleccionado.id_municipio
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
            this.techo_asignado_proteccion_civil = parseFloat(
              element.monto_proteccion_civil
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
      this.proyectosProteccionCivil = [];
      this.proyectosNoEtiquetado = [];
      this.$http
        .post("/cartera_proyectos/get_cartera", {
          ejercicio: this.ejercicioSeleccionado,
          id_municipio: this.municipioSeleccionado.id_municipio
        })
        .then(response => {
          // console.log(response.data)
          this.obrasAceptadas = 0
          this.obrasRechazadas = 0
          this.obrasTotal = 
          response.data.proyectos.iluminacion.length 
          + response.data.proyectos.seguridad.length
          + response.data.proyectos.inversion.length
          + response.data.proyectos.desarrollo.length
          + response.data.proyectos.proteccion_civil.length
          +  response.data.proyectos.no_etiquetado.length;

          this.proyectosIluminacion = response.data.proyectos.iluminacion;
          this.proyectosSeguridad = response.data.proyectos.seguridad;
          this.proyectosInversion = response.data.proyectos.inversion;
          this.proyectosDesarrollo = response.data.proyectos.desarrollo;
          this.proyectosProteccionCivil = response.data.proyectos.proteccion_civil;
          this.proyectosNoEtiquetado = response.data.proyectos.no_etiquetado;

          this.proyectosIluminacion.forEach(element => {
            if(element.estatus == 3){
              this.obrasAceptadas++
            }else if (element.estatus == 4) {
              this.obrasRechazadas++
            }
          });
          this.proyectosSeguridad.forEach(element => {
            if(element.estatus == 3){
              this.obrasAceptadas++
            }else if (element.estatus == 4) {
              this.obrasRechazadas++
            }
          });
          this.proyectosInversion.forEach(element => {
            if(element.estatus == 3){
              this.obrasAceptadas++
            }else if (element.estatus == 4) {
              this.obrasRechazadas++
            }
          });
          this.proyectosDesarrollo.forEach(element => {
            if(element.estatus == 3){
              this.obrasAceptadas++
            }else if (element.estatus == 4) {
              this.obrasRechazadas++
            }
          });
          this.proyectosProteccionCivil.forEach(element => {
            if(element.estatus == 3){
              this.obrasAceptadas++
            }else if (element.estatus == 4) {
              this.obrasRechazadas++
            }
          });
          this.proyectosNoEtiquetado.forEach(element => {
            if(element.estatus == 3){
              this.obrasAceptadas++
            }else if (element.estatus == 4) {
              this.obrasRechazadas++
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
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
    aceptarProyecto(item){
      console.log(item)
      this.$http
        .post("/cartera_proyectos/aceptar_proyecto", {
          id: item.id_cartera_proyecto,
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.getCartera()
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
    rechazarProyecto(item, rubro) {
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
           this.editedIndex = this.proyectosProteccionCivil.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialog = true;
          break;
        case 6:
           this.editedIndex = this.proyectosNoEtiquetado.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialog = true;
          break;
        default:
          break;
      }
    },
    guardarRechazo() {
      this.$http
        .post("/cartera_proyectos/rechazar_proyecto", {
          id: this.editedItem.id_cartera_proyecto,
          observaciones: this.editedItem.observaciones
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.dialog = false
            this.editedItem = { ejercicio: "",
              estatus: "",
              id_cartera_proyecto: "",
              id_municipio: "",
              id_rubro: "",
              monto: "",
              nombre_proyecto: "",
              observaciones: ""}
              this.editedIndex = -1
            this.getCartera()
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
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  }
};
</script>
<style>
.tablaProyectos{
  margin-top: 15px;
}
.tablaProyectos table>thead>tr>th{
   background-color: #e8f5e9 !important;
}
</style>