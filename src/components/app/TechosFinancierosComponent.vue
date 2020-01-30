<template>
  <v-container fluid class="pa-0">
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
          <v-col cols="12" sm="6" md="10" class="text-center">
            <v-row >
              <v-col cols="12" sm="3" md="6">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar municipio"
                  dense
                 outlined
                 class="mt-5"
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="3" md="2">
                <v-dialog
                  v-model="dialog"
                  max-width="400px"
                  scrollable
                  persistent
                >
                  <template v-slot:activator="{ on }">
                    <v-btn color="green" dark class="mt-5" v-on="on"
                      >Nuevo Techo</v-btn
                    >
                  </template>
                  <v-card ref="form">
                    <v-card-title primary-title>{{ formTitle }}</v-card-title>
                    <v-card-text>
                      <v-select
                        v-model="editedItem.municipio"
                        :items="municipios"
                        item-text="descripcion"
                        item-value="id_municipio"
                        label="Ayuntamiento"
                        return-object
                      ></v-select>
                      <v-text-field
                        v-model="editedItem.monto_total"
                        type="number"
                        label="Monto total:"
                        prepend-inner-icon="mdi-currency-usd"
                      ></v-text-field>
                      <div>
                        <v-row>
                          <v-col class="pb-0 pt-0 font-weight-black"
                            >Iluminación municipal</v-col
                          >
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="editedItem.porc_iluminacion_municipal"
                              label="Porcentaje"
                              append-icon="mdi-percent"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="editedItem.monto_iluminacion_municipal"
                              label="Monto"
                              readonly
                              type="number"
                              reverse
                              append-outer-icon="mdi-plus" @click:append-outer="increment(1)" prepend-icon="mdi-minus" @click:prepend="decrement(1)"
                              
                            ></v-text-field>
                            <!-- prepend-inner-icon="mdi-currency-usd" -->
                          </v-col>
                        </v-row>
                      </div>
                      <div>
                        <v-row>
                          <v-col class="pb-0 pt-0 font-weight-black"
                            >Seguridad</v-col
                          >
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="editedItem.porc_seguridad"
                              label="Porcentaje"
                              append-icon="mdi-percent"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="editedItem.monto_seguridad"
                              label="Monto"
                              readonly
                              type="number"
                              reverse
                              append-outer-icon="mdi-plus" @click:append-outer="increment(2)" prepend-icon="mdi-minus" @click:prepend="decrement(2)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                      <div>
                        <v-row>
                          <v-col class="pb-0 pt-0 font-weight-black"
                            >Proyectos de inversión pública</v-col
                          >
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="editedItem.porc_inversion_publica"
                              label="Porcentaje"
                              append-icon="mdi-percent"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="editedItem.monto_inversion_publica"
                              label="Monto"
                             readonly
                              type="number"
                              reverse
                              append-outer-icon="mdi-plus" @click:append-outer="increment(3)" prepend-icon="mdi-minus" @click:prepend="decrement(3)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                      <div>
                        <v-row>
                          <v-col class="pb-0 pt-0 font-weight-black"
                            >Acciones para el desarrollo</v-col
                          >
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="editedItem.porc_desarrollo"
                              label="Porcentaje"
                              append-icon="mdi-percent"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="editedItem.monto_desarrollo"
                              label="Monto"
                             readonly
                              type="number"
                              reverse
                              append-outer-icon="mdi-plus" @click:append-outer="increment(4)" prepend-icon="mdi-minus" @click:prepend="decrement(4)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                      <div>
                        <v-row>
                          <v-col class="pb-0 pt-0 font-weight-black"
                            >Protección Civil</v-col
                          >
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="editedItem.porc_proteccion_civil"
                              label="Porcentaje"
                              append-icon="mdi-percent"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="editedItem.monto_proteccion_civil"
                              label="Monto"
                             readonly
                              type="number"
                              reverse
                              append-outer-icon="mdi-plus" @click:append-outer="increment(4)" prepend-icon="mdi-minus" @click:prepend="decrement(4)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                      <div>
                        <v-row>
                          <v-col class="pb-0 pt-0 font-weight-black"
                            >Recursos no etiquetados</v-col
                          >
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="editedItem.porc_no_etiquetado"
                              label="Porcentaje"
                              append-icon="mdi-percent"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="editedItem.monto_no_etiquetado"
                              label="Monto"
                             readonly
                              type="number"
                              reverse
                              append-outer-icon="mdi-plus" @click:append-outer="increment(5)" prepend-icon="mdi-minus" @click:prepend="decrement(5)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                      <div>
                        <v-row>
                          <v-col class="pb-0 pt-0 font-weight-black"
                            >Retención 50% programa especial FEFOM</v-col
                          >
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="editedItem.porc_retencion"
                              label="Porcentaje"
                              append-icon="mdi-percent"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="editedItem.monto_retencion"
                              label="Monto"
                             readonly
                              type="number"
                              reverse
                              append-outer-icon="mdi-plus" @click:append-outer="increment(5)" prepend-icon="mdi-minus" @click:prepend="decrement(5)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="success" text @click="dialog = false"
                        >Cerrar</v-btn
                      >
                      <v-btn color="success" text @click="save()"
                        >Aceptar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="3" md="2">
                <v-dialog v-model="dialog2" persistent max-width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="green" dark v-on="on" class="mt-5"
                    >Carga Externa</v-btn
                  >
                </template>
                <v-card>
                  <v-container grid-list-xs>
                    <material-stats-card
                      value="Techos Financieros"
                      color="green"
                      icon="mdi-book-open-page-variant"
                      title="Carga externa de"
                      class="mt-5"
                    />
                    <v-card>
                      <v-container grid-list-md>
                        <v-layout row wrap>
                          Paso 1: Descarga el formato predefinido para que
                          registres los techos financieros.
                          <v-flex xs12>
                            <v-btn
                              color="green"
                              dark
                              href="./formato/plantilla_techos.xlsx"
                              download
                              >Descargar formato</v-btn
                            >
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          Paso 2: Carga el archivo que creaste anteriormente.
                          <v-flex xs12>
                            <v-btn color="green" dark>
                              <input
                                type="file"
                                ref="file"
                                @change="onSelect"
                              />
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="success" text @click="dialog2 = false"
                        >Cerrar</v-btn
                      >
                      <v-btn color="success" text @click="onSubmit()"
                        >Aceptar</v-btn
                      >
                    </v-card-actions>
                  </v-container>
                </v-card>
              </v-dialog>
              </v-col>
            </v-row>
          </v-col>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-col cols="12" class="pa-0">
      <v-data-table
        :headers="headers"
        :items="techosFinancieros"
        class="elevation-1 pl-0 tablaTechos"
        locale="es-MX"
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-left">{{ item.municipio.descripcion }}</td>
            <td>{{ item.monto_total | currency }}</td>
            <td>
              {{ item.monto_iluminacion_municipal | currency }}<br>
              <span class="font-weight-black">
                ({{
                item.porc_iluminacion_municipal
              }}%)
              </span>
            </td>
            <!-- <td >{{item.porc_iluminacion_municipal}}</td> -->
            <td>
              {{ item.monto_seguridad | currency }}<br>
              <span class="font-weight-black">
                 ({{ item.porc_seguridad }}%)
              </span>
            </td>
            <!-- <td >{{item.porc_seguridad}}</td> -->
            <td>
              {{ item.monto_inversion_publica | currency }}<br>
              <span class="font-weight-black">
                 ({{
                item.porc_inversion_publica
              }}%)
              </span>
            </td>
            <!-- <td >{{item.porc_inversion_publica}}</td> -->
            <td>
              {{ item.monto_desarrollo | currency }}<br>
              <span class="font-weight-black">
                 ({{
                item.porc_desarrollo
              }}%)
              </span>
            </td>
            <td>
              {{ item.monto_proteccion_civil | currency }}<br>
              <span class="font-weight-black">
                 ({{
                item.porc_proteccion_civil
              }}%)
              </span>
            </td>
            <!-- <td >{{item.porc_desarrollo}}</td> -->
            <td>
              {{ item.monto_no_etiquetado | currency }}<br>
              <span class="font-weight-black">
                 ({{
                item.porc_no_etiquetado
              }}%)
              </span>
            </td>
            <!-- <td >{{item.porc_no_etiquetado}}</td> -->
            <td>
              {{ item.monto_retencion | currency }}<br>
              <span class="font-weight-black">
                 ({{
                item.porc_retencion
              }}%)
              </span>
            </td>
            <td>
              <v-row  no-gutters>
                <v-col cols="6">
                  <v-btn class="btnK" x-small height="30px" @click="editItem(item)">
                    <v-icon color="green darken-2"
                      >mdi-square-edit-outline</v-icon
                    >
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn class="btnK" x-small height="30px" @click="deleteItem(item)">
                    <v-icon color="red darken-2">mdi-delete-forever</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </td>
          </tr>
        </template>
        <!-- <template v-slot:item.action="{ item }">
            <v-icon small class="mr-1" @click="editItem(item)">mdi-square-edit-outline</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete-forever</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-file-document</v-icon>
          </template> -->
        <template v-slot:no-data>No hay registros para mostrar</template>
      </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import { VMoney } from "v-money";

export default {
  directives: { money: VMoney },
  data: () => ({
    money: {
      decimal: ".",
      thousands: ",",
      prefix: "",
      precision: 2,
      masked: false /* doesn't work with directive */
    },
    dialog: false,
    dialog2: false,
    search:"",
    headers: [
      {
        text: "Municipio",
        align: "left",
        sortable: true,
        value: "municipio.descripcion"
      },
      {
        text: "Monto Total",
        value: "monto_total",
        align: "center",
        sortable: false
      },
      {
        text: "Iluminación municipal",
        value: "monto_iluminacion_municipal",
        align: "center",
        sortable: false
      },
      // { text: "%", value: "porc_iluminacion_municipal", align: "center" },
      {
        text: "Seguridad",
        value: "monto_seguridad",
        align: "center",
        sortable: false
      },
      // { text: "%", value: "porc_seguridad", align: "right" },
      {
        text: "Proyectos de inversión pública",
        value: "monto_inversion_publica",
        align: "center",
        sortable: false
      },
      // { text: "%", value: "porc_inversion_publica", align: "right" },
      {
        text: "Acciones para el desarrollo",
        value: "monto_desarrollo",
        align: "center",
        sortable: false
      },
      {
        text: "Protección Civil",
        value: "monto_proteccion_civil",
        align: "center",
        sortable: false
      },
      // { text: "%", value: "porc_desarrollo", align: "right" },
      {
        text: "Recursos no etiquetados",
        value: "monto_no_etiquetado",
        align: "center",
        sortable: false
      },
      {
        text: "Retención 50% Programa Especial FEFOM",
        value: "monto_retencion",
        align: "center",
        sortable: false
      },
      // { text: "%", value: "porc_no_etiquetado", align: "right" },
      { text: "Acciones", value: "action", align: "center", sortable: false }
    ],
    techosFinancieros: [],
    ejercicios: [],
    municipios: [],
    ejercicioSeleccionado: null,
    editedIndex: -1,
    editedItem: {
      municipio: [],
      monto_total: 0,
      monto_iluminacion_municipal: 0,
      porc_iluminacion_municipal: 0,
      monto_seguridad: 0,
      porc_seguridad: 0,
      monto_inversion_publica: 0,
      porc_inversion_publica: 0,
      monto_desarrollo: 0,
      porc_desarrollo: 0,
      monto_proteccion_civil: 0,
      porc_proteccion_civil: 0,
      monto_no_etiquetado: 0,
      porc_no_etiquetado: 0,
      monto_retencion: 0,
      porc_retencion: 0
    },
    defaultItem: {
      municipio: [],
      monto_total: 0,
      monto_iluminacion_municipal: 0,
      porc_iluminacion_municipal: 0,
      monto_seguridad: 0,
      porc_seguridad: 0,
      monto_inversion_publica: 0,
      porc_inversion_publica: 0,
      monto_desarrollo: 0,
      porc_desarrollo: 0,
      monto_proteccion_civil: 0,
      porc_proteccion_civil: 0,
      monto_no_etiquetado: 0,
      porc_no_etiquetado: 0,
      monto_retencion: 0,
      porc_retencion: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Techo" : "Editar Techo";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    ejercicioSeleccionado(val) {
      this.getTechos();
    },
    "editedItem.porc_iluminacion_municipal": function(val) {
      var monto_total = parseFloat(this.editedItem.monto_total).toFixed(2);
      var monto = (parseFloat(val).toFixed(2) * (monto_total )) / 100;
      console.log(monto_total, monto);
      this.editedItem.monto_iluminacion_municipal = parseFloat(monto).toFixed(
        2
      );
    },
    "editedItem.porc_seguridad": function(val) {
      var monto_total = parseFloat(this.editedItem.monto_total).toFixed(2);
      var monto = (parseFloat(val).toFixed(2) * (monto_total )) / 100;
      console.log(monto_total, monto);
      this.editedItem.monto_seguridad = monto.toFixed(2);
    },
    "editedItem.porc_inversion_publica": function(val) {
      var monto_total = parseFloat(this.editedItem.monto_total).toFixed(2);
      var monto = (parseFloat(val).toFixed(2) * (monto_total)) / 100;
      console.log(monto_total, monto);
      this.editedItem.monto_inversion_publica = monto.toFixed(2);
    },
    "editedItem.porc_desarrollo": function(val) {
      var monto_total = parseFloat(this.editedItem.monto_total).toFixed(2);
      var monto = (parseFloat(val).toFixed(2) * (monto_total )) / 100;
      console.log(monto_total, monto);
      this.editedItem.monto_desarrollo = monto.toFixed(2);
    },
    "editedItem.porc_proteccion_civil": function(val) {
      var monto_total = parseFloat(this.editedItem.monto_total).toFixed(2);
      var monto = (parseFloat(val).toFixed(2) * (monto_total )) / 100;
      console.log(monto_total, monto);
      this.editedItem.monto_proteccion_civil = monto.toFixed(2);
    },
    "editedItem.porc_no_etiquetado": function(val) {
      var monto_total = parseFloat(this.editedItem.monto_total).toFixed(2);
      var monto = (parseFloat(val).toFixed(2) * monto_total) / 100;
      console.log(monto_total, monto);
      this.editedItem.monto_no_etiquetado = monto.toFixed(2);
    },
    "editedItem.porc_retencion": function(val) {
      var monto_total = parseFloat(this.editedItem.monto_total).toFixed(2);
      var monto = (parseFloat(val).toFixed(2) * monto_total) / 100;
      console.log(monto_total, monto);
      this.editedItem.monto_retencion = monto.toFixed(2);
    },
  },
  created() {
    this.initialize();
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
      this.getTechos();
    },
    getTechos() {
      this.techosFinancieros = [];
      this.$http
        .post("/techos_financieros/get_techos", {
          ejercicio: this.ejercicioSeleccionado
        })
        .then(response => {
          response.data.rows.forEach(element => {
            this.techosFinancieros.push({
              id: element.id_techo,
              municipio: {
                id_municipio: element.id_municipio,
                descripcion: element.descripcion
              },
              monto_total: element.monto_total,
              monto_iluminacion_municipal: element.monto_iluminacion_municipal,
              porc_iluminacion_municipal: element.porc_iluminacion_municipal,
              monto_seguridad: element.monto_seguridad,
              porc_seguridad: element.porc_seguridad,
              monto_inversion_publica: element.monto_inversion_publica,
              porc_inversion_publica: element.porc_inversion_publica,
              monto_desarrollo: element.monto_desarrollo,
              porc_desarrollo: element.porc_desarrollo,
              monto_proteccion_civil: element.monto_proteccion_civil,
              porc_proteccion_civil: element.porc_proteccion_civil,
              monto_no_etiquetado: element.monto_no_etiquetado,
              porc_no_etiquetado: element.porc_no_etiquetado,
              monto_retencion: element.monto_retencion,
              porc_retencion: element.porc_retencion
            });
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    editItem(item) {
      this.editedIndex = this.techosFinancieros.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.techosFinancieros.indexOf(item);
      if (confirm("¿Deseas eliminar este registro?")) {
        this.$http
          .post("/techos_financieros/eliminar_techo", {
            id: this.techosFinancieros[index].id
          })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              this.techosFinancieros.splice(index, 1);
            } else {
              console.log("Error", response.err);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
     increment (rubro) {
        switch (rubro) {
        case 1:
          this.editedItem.monto_iluminacion_municipal = (parseFloat(this.editedItem.monto_iluminacion_municipal) + 0.01).toFixed(2)
          break;
        case 2:
           this.editedItem.monto_seguridad = (parseFloat(this.editedItem.monto_seguridad) + 0.01).toFixed(2)
          break;
        case 3:
          this.editedItem.monto_inversion_publica = (parseFloat(this.editedItem.monto_inversion_publica) + 0.01).toFixed(2)
          break;
        case 4:
          this.editedItem.monto_desarrollo = (parseFloat(this.editedItem.monto_desarrollo) + 0.01).toFixed(2)
          break;
        case 5:
          this.editedItem.monto_proteccion_civil = (parseFloat(this.editedItem.monto_proteccion_civil) + 0.01).toFixed(2)
          break;
        case 6:
          this.editedItem.monto_no_etiquetado = (parseFloat(this.editedItem.monto_no_etiquetado) + 0.01).toFixed(2)
          break;
        case 7:
          this.editedItem.monto_retencion = (parseFloat(this.editedItem.monto_retencion) + 0.01).toFixed(2)
          break;
        default:
          break;
      }
      
    },
    decrement (rubro) {
     switch (rubro) {
        case 1:
          this.editedItem.monto_iluminacion_municipal = (parseFloat(this.editedItem.monto_iluminacion_municipal) - 0.01).toFixed(2)
          break;
        case 2:
           this.editedItem.monto_seguridad = (parseFloat(this.editedItem.monto_seguridad) - 0.01).toFixed(2)
          break;
        case 3:
          this.editedItem.monto_inversion_publica = (parseFloat(this.editedItem.monto_inversion_publica) - 0.01).toFixed(2)
          break;
        case 4:
          this.editedItem.monto_desarrollo = (parseFloat(this.editedItem.monto_desarrollo) - 0.01).toFixed(2)
          break;
        case 5:
          this.editedItem.monto_proteccion_civil = (parseFloat(this.editedItem.monto_proteccion_civil) - 0.01).toFixed(2)
          break;
        case 6:
          this.editedItem.monto_no_etiquetado = (parseFloat(this.editedItem.monto_no_etiquetado) - 0.01).toFixed(2)
          break;
        case 7:
          this.editedItem.monto_retencion = (parseFloat(this.editedItem.monto_retencion) - 0.01).toFixed(2)
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

    save() {
      this.$http
        .post("/techos_financieros/registrar_techo", {
          id:
            typeof this.editedItem.id === "undefined"
              ? null
              : this.editedItem.id,
          id_municipio: this.editedItem.municipio.id,
          ejercicio: this.ejercicioSeleccionado,
          monto_total: this.editedItem.monto_total,
          monto_iluminacion_municipal: this.editedItem
            .monto_iluminacion_municipal,
          porc_iluminacion_municipal: this.editedItem
            .porc_iluminacion_municipal,
          monto_seguridad: this.editedItem.monto_seguridad,
          porc_seguridad: this.editedItem.porc_seguridad,
          monto_inversion_publica: this.editedItem.monto_inversion_publica,
          porc_inversion_publica: this.editedItem.porc_inversion_publica,
          monto_desarrollo: this.editedItem.monto_desarrollo,
          porc_desarrollo: this.editedItem.porc_desarrollo,
          monto_proteccion_civil: this.editedItem.monto_proteccion_civil,
          porc_proteccion_civil: this.editedItem.porc_proteccion_civil,
          monto_no_etiquetado: this.editedItem.monto_no_etiquetado,
          porc_no_etiquetado: this.editedItem.porc_no_etiquetado,
          monto_retencion: this.editedItem.monto_retencion,
          porc_retencion: this.editedItem.porc_retencion,
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (this.editedIndex > -1) {
              Object.assign(
                this.techosFinancieros[this.editedIndex],
                this.editedItem
              );
            } else {
              this.techosFinancieros.push(this.editedItem);
            }
          } else {
            console.log("Error", response.err);
          }
        })
        .catch(error => {
          console.error(error);
        });
      this.close();
    },
    onSelect() {
      const allowedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file)
      if (!allowedTypes.includes(file.type)) {
        this.message = "Archivo no válido";
      }
    },
    async onSubmit() {
      // EventBus.$emit("loading", true);
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("ejercicio", this.ejercicioSeleccionado);
      try {
        await this.$http
          .post("/techos_financieros/upload", formData)
          .then(async resp => {
            if (resp.status == 200) {
              // this.message = "Productos cargados correctamente";
              this.getTechos();
              // EventBus.$emit("loading", false);
            } else {
              this.message = "Ocurrió un error al cargar los productos";
            }
            // EventBus.$emit("loading", false);
            this.dialog2 = false;
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
      } catch (err) {
        // EventBus.$emit("loading", false);
        console.log(err);
        // this.message = err.response.data.error;
      }
    }
  }
};
</script>
<style lang="css">
.tablaTechos table>thead>tr>th{
 background-color: #e8f5e9 !important;
}
.tablaTechos table > tbody > tr > td {
  font-size: 12px !important;
  text-align: right;
  width: 12.5%;
}
.btnK{
  min-width: 0 !important;
}
</style>
