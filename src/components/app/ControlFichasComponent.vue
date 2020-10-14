<template>
  <v-container fluid class="pa-0">
    
    <v-col cols="12" class="pa-0">
      <v-data-table
        :headers="headers"
        :items="asignaciones"
        class="elevation-1 pl-0 tablaTechos"
        locale="es-MX"
        :search="search"
        style="line-height:1.2em"
      >
      <template v-slot:top>
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }">
              <v-row no-gutters>
                <v-col cols="4">Búsqueda Avanzada</v-col>
                <v-col
                  cols="8"
                  class="text--secondary"
                >
                  <v-fade-transition leave-absolute>
                    <span
                      v-if="open"
                      key="0"
                    >
                      Ingresa los parámetros de búsqueda
                    </span>
                    <span
                      v-else
                      key="1"
                    >
                      
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card
                  flat
                  tile
                >
               <v-card-text>
                 <v-row>
                   <v-col cols="12" md="2">
                     <v-text-field
                     v-model="filtros.folio"
                      label="Folio"
                      placeholder="Folio"
                      outlined
                      dense
                    ></v-text-field>
                   </v-col>
                   <v-col cols="12" md="8">
                     <v-text-field
                     v-model="filtros.nombreProyecto"
                      label="Nombre del proyecto"
                      placeholder="Nombre del proyecto"
                      outlined
                      dense
                    ></v-text-field>
                   </v-col>
                   <v-col cols="12" md="2">
                     <v-text-field
                     v-model="filtros.monto"
                      label="Monto"
                      placeholder="Monto"
                      outlined
                      dense
                    ></v-text-field>
                   </v-col>
                 </v-row>
                 <v-row>
                   <v-col cols="12" md="5">
                    <v-autocomplete
                    v-model="filtros.municipio"
                      :items="municipios"
                      item-text="descripcion"
                      item-value="id_municipio"
                       label="Municipio"
                      placeholder="Municipio"
                      outlined
                      dense
                    ></v-autocomplete>
                   </v-col>
                   <v-col cols="12" md="5">
                     <v-text-field
                     v-model="filtros.unidadEjecutora"
                      label="Unidad Ejecutora"
                      placeholder="Unidad Ejecutora"
                      outlined
                      dense
                    ></v-text-field>
                   </v-col>
                   <v-col cols="12" md="2">
                     <v-menu
                      v-model="menuCalendario"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="filtros.fechaCaptura"
                           label="Fecha de Captura"
                            placeholder="Fecha de Captura"
                          readonly
                           outlined
                          dense
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker no-title locale="Es" v-model="filtros.fechaCaptura" @input="menuCalendario = false"></v-date-picker>
                    </v-menu>
                   </v-col>
                 </v-row>
               </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="green"
                        class="ma-2 tile white--text"
                        small
                        v-on="on"
                        @click="busquedaAvanzada()"
                      >
                        <v-icon center dark>mdi-magnify</v-icon>
                      </v-btn>
                    </template>
                    <span>Buscar</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            color="green"
                            class="ma-2 tile white--text"
                            small
                            v-on="on"
                            @click="buscarAsignaciones()"
                          >
                            <v-icon center dark>mdi-autorenew</v-icon>
                          </v-btn>
                        </template>
                        <span>Limpiar</span>
                      </v-tooltip>
              </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
        <template v-slot:item="{ item }">
          <tr :style="'background-color:'+item.color">
            <td class="text-center font-weight-black" style="width:5%">
              {{ item.id_ficha_tecnica }}
            </td>
            <td class="text-center">{{ item.nombre }}</td>
            <td class="text-center">
              <br><span style="font-size: 10px !important; ">Ayuntamiento: {{item.ayuntamiento}}</span>
              <br><span style="font-size: 10px !important; " class="font-weight-black">Proyecto: {{item.nombre_proyecto}}</span>
              <br><span style="font-size: 10px !important; ">Monto: {{item.monto | currency}}</span>
              <br><span style="font-size: 10px !important; ">V{{item.version}}</span>
            </td>
            <!-- <td class="text-center">{{ item.fecha_envio }}</td> -->
            <td class="text-left">
              <br><span style="font-size: 10px !important; ">Primer Ingreso: {{item.fecha_primer_ingreso}}</span>
              <br><span style="font-size: 10px !important; ">Fecha de Envío: {{item.fecha_envio}}</span>
              <br><span style="font-size: 10px !important; ">Fecha de Revisión: {{item.fecha_revision}}</span>
              <br><span style="font-size: 10px !important; ">Fecha de Validación: {{item.fecha_validacion}}</span>
              <br><span style="font-size: 10px !important; ">Fecha de Dictaminación: {{item.fecha_dictaminacion}}</span>
            </td>
            <td class="text-center font-weight-black">
              {{ item.estatus_texto }}
            </td>
            <td class="text-center font-weight-black" style="width:8%;">
              <v-icon small center :color="item.semaforo">mdi-circle-slice-8</v-icon>
              <br><span style="font-size: 10px !important; ">{{item.dias_restantes}} días restantes</span><br>
            </td>
            <td class="text-center">
              <v-row  no-gutters>
                <v-col cols="12">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                      v-if="botonVisible"
                      color="green"
                      class="white--text"
                       x-small
                      v-on="on"
                     @click="imprimirObservaciones(item.id_ficha_tecnica)"
                    >
                      <v-icon small center dark>mdi-printer-settings</v-icon>
                    </v-btn>
                    </template>
                    <span>Imprimir observaciones</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                      v-if="botonVisible"
                      color="green"
                      class="white--text"
                       x-small
                      v-on="on"
                     @click="verHistorial(item.id_ficha_tecnica)"
                    >
                      <v-icon small center dark>mdi-lan</v-icon>
                    </v-btn>
                    </template>
                    <span>Ver historial</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </td>
          </tr>
        </template>
        <template v-slot:no-data>No hay asignaciones registradas</template>
      </v-data-table>
    </v-col>
    <v-dialog v-model="dialogHistorial" max-width="700px" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Historial de asignaciones
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Usuario Asignado</th>
                      <th class="text-center">Usuario Remitente</th>
                      <th class="text-center">Fecha de asignacion</th>
                      <th class="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in historial" :key="item.name">
                      <td class="text-center">{{ item.nombre_destinatario }}</td>
                      <td class="text-center">{{ item.nombre_remitente }}</td>
                      <td class="text-center">{{ item.fecha_asignacion }}</td>
                      <td class="text-center">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                            v-if="item.observacion !== null"
                            color="green"
                            class="white--text"
                            x-small
                            v-on="on"
                            @click="observacion = item.observacion,dialogObservacionAnalista = true"
                          >
                            <v-icon small center dark>mdi-comment-alert-outline</v-icon>
                          </v-btn>
                          </template>
                          <span>Ver comentarios/observaciones</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="
              (dialogHistorial = false), historial = []
            "
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogObservacionAnalista" min-width="500px" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Comentario/Observación:
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <!-- <v-textarea
                outlined
                label="Observación"
                v-model="descripcionObservacionAnalista"
              ></v-textarea> -->
              <p style="white-space: pre-line !important;">{{(this.observacion)}}</p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="
              (dialogObservacionAnalista = false), observacion= null
            "
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { EventBus } from "../../utils/event-bus";
import moment from "moment";
import { calculaFecha } from "../../utils/calculaFecha";
export default {
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem("user"));
     this.initialize();
    this.buscarAsignaciones()
    EventBus.$on("actualizaPropAnexoDos", id_anexo_dos => {
    });
  },
  mounted() {
   
  },
  data() {
    return {
      user: null,
      tab: null,
      update: 0,
      botonVisible: true,
      filtros:{
        folio: null,
        nombreProyecto: null,
        monto: null,
        municipio: null,
        unidadEjecutora: null,
        fechaCaptura: null
      },
      municipios: [],
      isEditing: null,
      menuCalendario: false,
      search: null,
      dialogHistorial: false,
      dialogObservacionAnalista: false,
      headers: [
          { text: 'Folio', value: 'folio', sortable: false,align: 'center',},
          { text: 'Analista asignado', value: 'nombre', sortable: true,align: 'center',},
          { text: 'Resúmen', value: 'folio', sortable: false,align: 'center',},
          { text: 'Fechas', value: 'fecha_asignacion', sortable: false,align: 'left',},
          { text: 'Estatus Ficha', value: 'estatus', sortable: true,align: 'center',},
          { text: '', value: '', sortable: false,align: 'center',},
          { text: 'Acciones', value: 'acciones', sortable: false,align: 'center',},
        ],
        asignaciones:[],
        historial: [],
        observacion: null,
    };
  },
  computed: {
    
  },
  watch: {
  },
  methods: {
    initialize() {
      this.$http
        .get("/catalogos/get_municipios")
        .then(response => {
          response.data.rows.forEach(element => {
            // console.log(element)
            this.municipios.push(element);
          });
        })
        .catch(err => {});
    },
    buscarAsignaciones() {
        this.asignaciones = []
        this.historial = []
        this.filtros={
        folio: null,
        nombreProyecto: null,
        monto: null,
        municipio: null,
        unidadEjecutora: null,
        fechaCaptura: null
      },
        EventBus.$emit("abreLoading");
        this.$http
          .post("/ficha_tecnica/buscar_detalle_fichas", {
            id_ayuntamiento: this.user.id_municipio
          })
          .then(response => {
            EventBus.$emit("cierraLoading");
            if (response.status == 200) {
              //  console.log(response.data);
              response.data.forEach(element => {
                var estat = ""
                var iconoEstatus = ""
                var color = ""
                var semaforo = "blue lighteen-1"
                var diasRestantes = "-"
                // console.log(element.estatus)
                switch (element.estatus) {
                  case 1:
                    estat = "Edición / Presentación"
                    iconoEstatus = "mdi-file-document-edit"
                    break;
                  case 2:
                    estat = "En Revisión"
                    iconoEstatus = "mdi-timeline-clock"
                    diasRestantes = calculaFecha(element.fecha_limite_revision)
                    
                    if(diasRestantes > 3){
                      semaforo = "green lighten-1"
                    }else if(diasRestantes>0 && diasRestantes<3){
                      semaforo =" yellow lighteen-1"
                    }else{
                      semaforo = "red lighten-1"
                    }
                    break;
                  case 3:
                    estat = "En Validación"
                    iconoEstatus = "mdi-timeline-clock"
                    break;
                  case 4:
                    estat = "En Dictaminación"
                    iconoEstatus = "mdi-timeline-clock"
                    break;
                  case 5:
                    estat = "Regresada al Ayuntamiento con Observaciones"
                    iconoEstatus = "mdi-comment-alert"
                    color = "#EF9A9A"
                    break;
                  case 6:
                    estat = "Cancelada"
                    iconoEstatus = "mdi-cancel"
                    color = "#EF9A9A"
                    semaforo = "gray lighten-1"
                    break;
                
                  default:
                    break;
                }


                  this.asignaciones.push({
                    nombre: element.nombre,
                  id_ficha_tecnica: element.id_ficha_tecnica,
                  version: element.version,
                  ayuntamiento: element.ayuntamiento,
                  fecha_ficha: moment(
                                      element.fecha_ficha
                                      ).format("LL"),
                  nombre_proyecto: element.nombre_proyecto,
                  monto: element.monto_con_iva,
                  fecha_primer_ingreso: (element.fecha_primer_ingreso !== null) ? moment(
                                      element.fecha_primer_ingreso
                                      ).format("LL") : "--",
                  fecha_envio: (element.fecha_envio !== null) ? moment(
                                      element.fecha_envio
                                      ).format("LL") : "--",
                  fecha_revision: (element.fecha_revision !== null) ? moment(
                                      element.fecha_revision
                                      ).format("LL") : "--",
                  fecha_validacion:  (element.fecha_validacion !== null) ? moment(
                                      element.fecha_validacion
                                      ).format("LL") : "--",
                  fecha_dictaminacion: (element.fecha_dictaminacion !== null) ? moment(
                                      element.fecha_dictaminacion
                                      ).format("LL") : "--",
                  estatus: element.estatus,
                  estatus_texto: estat,
                  semaforo: semaforo,
                  dias_restantes: diasRestantes,
                  color: color
                  })
                
              });
            } else {
                EventBus.$emit("cierraLoading");
              console.log("Error", response.err);
            }
          })
          .catch(error => {
              EventBus.$emit("cierraLoading");
            console.error(error);
          });
    },
    busquedaAvanzada(){
      this.asignaciones = []
        this.historial = []
        EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_detalle_fichas", {
          filtros: this.filtros
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            //  console.log(response.data);
            response.data.forEach(element => {
              var estat = ""
              var iconoEstatus = ""
              var color = ""
              var semaforo = "blue lighteen-1"
              var diasRestantes = "-"
              // console.log(element.estatus)
              switch (element.estatus) {
                case 1:
                  estat = "Edición / Presentación"
                  iconoEstatus = "mdi-file-document-edit"
                  break;
                case 2:
                   estat = "En Revisión"
                   iconoEstatus = "mdi-timeline-clock"
                   diasRestantes = calculaFecha(element.fecha_limite_revision)
                   
                   if(diasRestantes > 3){
                    semaforo = "green lighten-1"
                   }else if(diasRestantes>0 && diasRestantes<3){
                     semaforo =" yellow lighteen-1"
                   }else{
                     semaforo = "red lighten-1"
                   }
                  break;
                case 3:
                  estat = "En Validación"
                   iconoEstatus = "mdi-timeline-clock"
                  break;
                case 4:
                  estat = "En Dictaminación"
                   iconoEstatus = "mdi-timeline-clock"
                  break;
                case 5:
                  estat = "Regresada al Ayuntamiento con Observaciones"
                   iconoEstatus = "mdi-comment-alert"
                   color = "#EF9A9A"
                  break;
                case 6:
                  estat = "Cancelada"
                   iconoEstatus = "mdi-cancel"
                   color = "#EF9A9A"
                   semaforo = "gray lighten-1"
                  break;
              
                default:
                  break;
              }


                this.asignaciones.push({
                  nombre: element.nombre,
                id_ficha_tecnica: element.id_ficha_tecnica,
                version: element.version,
                ayuntamiento: element.ayuntamiento,
                fecha_ficha: moment(
                                    element.fecha_ficha
                                    ).format("LL"),
                nombre_proyecto: element.nombre_proyecto,
                monto: element.monto_con_iva,
                fecha_primer_ingreso: (element.fecha_primer_ingreso !== null) ? moment(
                                    element.fecha_primer_ingreso
                                    ).format("LL") : "--",
                fecha_envio: (element.fecha_envio !== null) ? moment(
                                    element.fecha_envio
                                    ).format("LL") : "--",
                fecha_revision: (element.fecha_revision !== null) ? moment(
                                    element.fecha_revision
                                    ).format("LL") : "--",
                fecha_validacion:  (element.fecha_validacion !== null) ? moment(
                                    element.fecha_validacion
                                    ).format("LL") : "--",
                fecha_dictaminacion: (element.fecha_dictaminacion !== null) ? moment(
                                    element.fecha_dictaminacion
                                    ).format("LL") : "--",
                estatus: element.estatus,
                estatus_texto: estat,
                semaforo: semaforo,
                dias_restantes: diasRestantes,
                color: color
                })
               
            });
          } else {
               EventBus.$emit("cierraLoading");
            console.log("Error", response.err);
          }
        })
        .catch(error => {
             EventBus.$emit("cierraLoading");
          console.error(error);
        });
    },
    revisarFicha(id_ficha_tecnica) {
     this.$router.push({name: "Registro-Ficha", params: {id_ficha_tecnica: id_ficha_tecnica}})
    },
    imprimirObservaciones(id_ficha_tecnica){
      EventBus.$emit("abreLoading");
      this.$http
        .get("/ficha_tecnica/imprimir_observaciones_ficha", {responseType: 'arraybuffer',params:{
          id_ficha_tecnica: id_ficha_tecnica,
        }})
        .then(response => {
          // console.log(response);
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
             
           var blob = new Blob([response.data], {type: 'application/pdf'});

            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.target = "_blank"
            // link.download = "filename.pdf";
            link.click();
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
           EventBus.$emit("cierraLoading");
          this.$fire({
            type: "error",
            title: "Error",
            text: error,
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#d33"
          });
        });
    },
    verHistorial(id_ficha_tecnica){
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_historial", {
          id_ficha_tecnica: id_ficha_tecnica
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            // console.log(response.data);
            response.data.forEach(element => {
                this.historial.push({
                  id_usuario_destinatario: element.id_usuario_destinatario,
                  nombre_destinatario: element.nombre_destinatario,
                  id_usuario_remitente: element.id_usuario_remitente,
                  nombre_remitente: element.nombre_remitente,
                  fecha_asignacion: moment(
                                    element.fecha_asignacion
                                    ).format("LL"),
                  observacion: element.observacion
                })
            });
            this.dialogHistorial = true
          } else {
               EventBus.$emit("cierraLoading");
            console.log("Error", response.err);
          }
        })
        .catch(error => {
             EventBus.$emit("cierraLoading");
          console.error(error);
        });
    }
  },
  beforeDestroy() {
    EventBus.$off("buscarFicha");
  }
};
</script>