<template>
  <v-container fluid class="pa-0">
    
    <v-col cols="12" class="pa-0">
      <v-data-table
        :headers="headers"
        :items="asignaciones"
        class="elevation-1 pl-0 tablaTechos"
        locale="es-MX"
        :search="search"
      >
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
              <br><span style="font-size: 10px !important; ">Fecha de Envío: {{item.fecha_envio}}</span>
              <br><span style="font-size: 10px !important; ">Fecha de Revisión: {{item.fecha_revision}}</span>
              <br><span style="font-size: 10px !important; ">Fecha de Validación: {{item.fecha_validacion}}</span>
              <br><span style="font-size: 10px !important; ">Fecha de Dictaminación: {{item.fecha_dictaminacion}}</span>
            </td>
            <td class="text-center font-weight-black">{{ item.estatus_texto }}</td>
            <!-- <td class="text-center">
              <v-row  no-gutters>
                <v-col cols="12">
                  <v-tooltip bottom v-if="item.estatus == 1 || item.estatus == 5">
                    <template v-slot:activator="{ on }">
                      <v-btn
                      v-if="botonVisible"
                      color="green"
                      class="ma-2 white--text"
                      small
                      v-on="on"
                     @click="revisarFicha(item.id_ficha_tecnica)"
                    >
                      <v-icon center dark>mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                    </template>
                    <span>Editar ficha técnica</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </td> -->
          </tr>
        </template>
        <template v-slot:no-data>No hay asignaciones registradas</template>
      </v-data-table>
    </v-col>
  </v-container>
</template>
<script>
import { EventBus } from "../../utils/event-bus";
import moment from "moment";
export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.buscarAsignaciones()
    EventBus.$on("actualizaPropAnexoDos", id_anexo_dos => {
    });
    
  },
  data() {
    return {
      user: null,
      tab: null,
      update: 0,
      botonVisible: true,
      search: null,
      headers: [
          { text: 'Folio', value: 'folio', sortable: false,align: 'center',},
          { text: 'Analista asignado', value: 'nombre', sortable: true,align: 'center',},
          { text: 'Resúmen', value: 'folio', sortable: false,align: 'center',},
          { text: 'Fechas', value: 'fecha_asignacion', sortable: false,align: 'left',},
          { text: 'Estatus Ficha', value: 'estatus', sortable: true,align: 'center',},
        ],
        asignaciones:[],
    };
  },
  computed: {
    
  },
  watch: {
  },
  methods: {
      buscarAsignaciones() {
      EventBus.$emit("abreLoading");
      this.$http
        .post("/ficha_tecnica/buscar_detalle_fichas", {
          id_ayuntamiento: this.user.id_municipio
        })
        .then(response => {
          EventBus.$emit("cierraLoading");
          if (response.status == 200) {
            // console.log(response.data[0]);
            response.data.forEach(element => {
              var estat = ""
              var iconoEstatus = ""
              var color = ""
              console.log(element.estatus)
              switch (element.estatus) {
                case 1:
                  estat = "Edición / Presentación"
                  iconoEstatus = "mdi-file-document-edit"
                  break;
                case 2:
                  estat = "En Revisión"
                   iconoEstatus = "mdi-timeline-clock"
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
                  estat = "Regresada con Observaciones"
                   iconoEstatus = "mdi-comment-alert"
                   color = "#EF9A9A"
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
  },
  beforeDestroy() {
    EventBus.$off("buscarFicha");
  }
};
</script>